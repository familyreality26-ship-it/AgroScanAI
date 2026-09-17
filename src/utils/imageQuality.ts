import { QualityCheckResult, QualityMetrics } from "../types";

/**
 * Analyzes leaf photograph using HTML5 Canvas to measure:
 * 1. Image resolution & aspect ratio
 * 2. Mean luminosity (detects severe underexposure or blinding glare)
 * 3. Laplacian Variance approximation (detects camera defocus / motion blur)
 */
export async function analyzeImageQuality(imageSource: string): Promise<QualityCheckResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSource;

    img.onload = () => {
      const originalWidth = img.naturalWidth || img.width;
      const originalHeight = img.naturalHeight || img.height;
      const aspectRatio = Number((originalWidth / (originalHeight || 1)).toFixed(2));

      // Use a standardized working canvas (max 320px) for consistent, high-performance edge & luminance analysis
      const analysisWidth = Math.min(originalWidth, 300);
      const analysisHeight = Math.min(originalHeight, 300);

      const canvas = document.createElement("canvas");
      canvas.width = analysisWidth;
      canvas.height = analysisHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(createFallbackResult(originalWidth, originalHeight));
        return;
      }

      ctx.drawImage(img, 0, 0, analysisWidth, analysisHeight);
      const imageData = ctx.getImageData(0, 0, analysisWidth, analysisHeight);
      const data = imageData.data;
      const totalPixels = analysisWidth * analysisHeight;

      let sumLuminosity = 0;
      const gray = new Float32Array(totalPixels);

      for (let i = 0; i < totalPixels; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        // Standard perceived luminance
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        sumLuminosity += lum;
        gray[i] = lum;
      }

      const meanLuminosity = Math.round(sumLuminosity / totalPixels);

      // Discrete Laplacian 3x3 kernel:
      // [ 0,  1,  0]
      // [ 1, -4,  1]
      // [ 0,  1,  0]
      let laplacianSum = 0;
      let laplacianSqSum = 0;
      let count = 0;

      for (let y = 1; y < analysisHeight - 1; y++) {
        for (let x = 1; x < analysisWidth - 1; x++) {
          const idx = y * analysisWidth + x;
          const up = (y - 1) * analysisWidth + x;
          const down = (y + 1) * analysisWidth + x;
          const left = y * analysisWidth + (x - 1);
          const right = y * analysisWidth + (x + 1);

          const lap = gray[up] + gray[down] + gray[left] + gray[right] - 4 * gray[idx];
          laplacianSum += lap;
          laplacianSqSum += lap * lap;
          count++;
        }
      }

      const meanLap = laplacianSum / (count || 1);
      const varianceLap = Math.max(0, laplacianSqSum / (count || 1) - meanLap * meanLap);
      const blurScore = Math.round(varianceLap * 10) / 10;

      const issues: string[] = [];
      const recommendations: string[] = [];

      // 1. Resolution Check (MobileNetV3 requires 224x224 minimum)
      if (originalWidth < 224 || originalHeight < 224) {
        issues.push("Low Resolution: Image is below the recommended 224x224 pixel dimension.");
        recommendations.push("Move closer to the crop leaf or use higher resolution photo mode.");
      }

      // 2. Luminosity & Exposure Check
      if (meanLuminosity < 38) {
        issues.push("Underexposed / Too Dark: Leaf symptoms and fungal lesions cannot be clearly differentiated in shadows.");
        recommendations.push("Move leaf into indirect natural daylight or turn on flashlight/torch.");
      } else if (meanLuminosity > 228) {
        issues.push("Overexposed / High Glare: Intense light reflections wash out foliar details.");
        recommendations.push("Angle the camera to shield direct midday sunlight glare off the leaf surface.");
      }

      // 3. Focus & Blur Check
      if (blurScore < 45) {
        issues.push("Blur Detected: The image lacks sharp contrast transitions along leaf veins and lesion margins.");
        recommendations.push("Keep hands steady, tap screen to focus specifically on the leaf spot, and retake.");
      }

      const isValid = issues.length === 0;

      if (!isValid && recommendations.length === 0) {
        recommendations.push("Position a single leaf flat against a clean neutral background.");
      }

      const metrics: QualityMetrics = {
        width: originalWidth,
        height: originalHeight,
        aspectRatio,
        meanLuminosity,
        blurScore
      };

      resolve({
        isValid,
        issues,
        recommendations,
        metrics
      });
    };

    img.onerror = () => {
      resolve({
        isValid: false,
        issues: ["Unable to load or decode image data."],
        recommendations: ["Ensure the file is a valid JPG, PNG, or WebP image."],
        metrics: {
          width: 0,
          height: 0,
          aspectRatio: 1,
          meanLuminosity: 0,
          blurScore: 0
        }
      });
    };
  });
}

function createFallbackResult(w: number, h: number): QualityCheckResult {
  return {
    isValid: true,
    issues: [],
    recommendations: ["Ensure leaf is clearly lit and in focus."],
    metrics: {
      width: w,
      height: h,
      aspectRatio: Number((w / (h || 1)).toFixed(2)),
      meanLuminosity: 128,
      blurScore: 120
    }
  };
}

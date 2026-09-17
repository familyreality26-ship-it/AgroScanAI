"""
AgroScan AI — Image Quality Assurance Pipeline
Pre-flight check before running neural network screening:
- Valid format and readable image
- Minimum resolution (>= 224x224)
- Blur detection via Laplacian variance
- Underexposure (extreme darkness) and Overexposure (harsh glare) detection
- Actionable farmer guidance
"""

import os
from pathlib import Path
from typing import Dict, Any, List

try:
    from PIL import Image, ImageStat
    import numpy as np
except ImportError:
    Image = None
    ImageStat = None
    np = None


class QualityCheckResult:
    def __init__(self, is_valid: bool, issues: List[str], recommendations: List[str], metrics: Dict[str, Any]):
        self.is_valid = is_valid
        self.issues = issues
        self.recommendations = recommendations
        self.metrics = metrics

    def to_dict(self) -> Dict[str, Any]:
        return {
            "is_valid": self.is_valid,
            "issues": self.issues,
            "recommendations": self.recommendations,
            "metrics": self.metrics
        }


def check_image_quality(image_path: str, min_size: int = 224, blur_threshold: float = 80.0) -> QualityCheckResult:
    """
    Evaluates whether an uploaded or captured crop leaf image is suitable for AI analysis.
    """
    issues = []
    recommendations = []
    metrics = {
        "width": 0,
        "height": 0,
        "mean_luminosity": 0.0,
        "blur_score": 0.0,
        "aspect_ratio": 1.0
    }

    path = Path(image_path)
    if not path.exists():
        return QualityCheckResult(
            is_valid=False,
            issues=["Image file does not exist on disk."],
            recommendations=["Please select an existing leaf photograph."],
            metrics=metrics
        )

    if Image is None:
        # Fallback if PIL is not installed
        return QualityCheckResult(is_valid=True, issues=[], recommendations=[], metrics=metrics)

    try:
        with Image.open(path) as img:
            # Check format
            fmt = (img.format or "").upper()
            if fmt not in ["JPEG", "JPG", "PNG", "WEBP", "BMP"]:
                issues.append(f"Unsupported image format ({fmt}). Please use JPG or PNG.")

            w, h = img.size
            metrics["width"] = w
            metrics["height"] = h
            metrics["aspect_ratio"] = round(w / max(1, h), 2)

            # Minimum resolution check
            if w < min_size or h < min_size:
                issues.append(f"Image resolution too low ({w}x{h} px). Minimum required is {min_size}x{min_size} px.")
                recommendations.append("Move closer to the leaf or take a higher resolution photo.")

            # Convert to RGB for lighting analysis
            rgb_img = img.convert("RGB")
            stat = ImageStat.Stat(rgb_img)
            # Average perceived brightness (0 to 255)
            # Standard relative luminance: 0.299 R + 0.587 G + 0.114 B
            r, g, b = stat.mean[0], stat.mean[1], stat.mean[2]
            luminosity = 0.299 * r + 0.587 * g + 0.114 * b
            metrics["mean_luminosity"] = round(luminosity, 1)

            if luminosity < 38.0:
                issues.append("Image is too dark (underexposed). Leaf lesions cannot be distinguished from shadows.")
                recommendations.append("Place one leaf in good lighting and avoid dark shadows.")
            elif luminosity > 225.0:
                issues.append("Image is overexposed (excessive sun glare). White wash obscures leaf venation.")
                recommendations.append("Shield leaf from direct blinding glare or photograph under even natural daylight.")

            # Blur detection using Laplacian variance
            gray = img.convert("L")
            if np is not None:
                arr = np.array(gray, dtype=np.float32)
                # Compute discrete 2D Laplacian operator manually if OpenCV is not installed
                # [[0, 1, 0], [1, -4, 1], [0, 1, 0]]
                if arr.shape[0] >= 3 and arr.shape[1] >= 3:
                    lap = (
                        arr[0:-2, 1:-1] +
                        arr[2:, 1:-1] +
                        arr[1:-1, 0:-2] +
                        arr[1:-1, 2:] -
                        4 * arr[1:-1, 1:-1]
                    )
                    blur_score = float(np.var(lap))
                    metrics["blur_score"] = round(blur_score, 1)

                    if blur_score < blur_threshold:
                        issues.append("Image appears blurry or out of focus. Fine fungal spots cannot be screened accurately.")
                        recommendations.append("Keep the camera steady, tap to focus on the leaf surface, and avoid motion.")
            else:
                metrics["blur_score"] = 100.0

    except Exception as e:
        return QualityCheckResult(
            is_valid=False,
            issues=[f"Corrupted image file or unreadable data: {str(e)}"],
            recommendations=["Select another valid JPEG/PNG image file."],
            metrics=metrics
        )

    # General standard instructions
    if not recommendations:
        recommendations = [
            "Place one leaf in good lighting.",
            "Avoid shadows.",
            "Keep the leaf in focus."
        ]

    is_valid = len(issues) == 0
    return QualityCheckResult(is_valid=is_valid, issues=issues, recommendations=recommendations, metrics=metrics)

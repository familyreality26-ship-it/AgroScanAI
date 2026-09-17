export interface SampleLeaf {
  id: string;
  name: string;
  crop: string;
  expectedCondition: string;
  isBlurryOrPoorQuality?: boolean;
  description: string;
  dataUrl: string;
}

// Generate realistic synthetic SVG crop leaf representations
function createLeafSvg(type: "tomato_late_blight" | "tomato_early_blight" | "maize_blight" | "maize_rust" | "healthy" | "blurry_dark"): string {
  let innerSvg = "";
  
  if (type === "tomato_late_blight") {
    // Tomato compound leaflet with irregular dark brown/black water-soaked necrotic lesions & pale margins
    innerSvg = `
      <defs>
        <radialGradient id="lesionGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1c1917" />
          <stop offset="60%" stop-color="#451a03" />
          <stop offset="85%" stop-color="#78350f" />
          <stop offset="100%" stop-color="#ca8a04" stop-opacity="0.8" />
        </radialGradient>
        <filter id="fuzz">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#f1f5f9"/>
      <!-- Main Leaf Body -->
      <path d="M 200,40 C 290,110 330,230 250,330 C 200,370 180,380 180,380 C 180,380 160,340 120,290 C 70,220 100,100 200,40 Z" fill="#2d6a4f" stroke="#1b4332" stroke-width="3"/>
      <!-- Veins -->
      <path d="M 200,40 Q 195,200 180,380" stroke="#40916c" stroke-width="4" fill="none"/>
      <path d="M 195,120 Q 250,140 285,165" stroke="#40916c" stroke-width="2.5" fill="none"/>
      <path d="M 192,180 Q 250,210 270,240" stroke="#40916c" stroke-width="2.5" fill="none"/>
      <path d="M 190,140 Q 130,170 105,195" stroke="#40916c" stroke-width="2.5" fill="none"/>
      <path d="M 186,220 Q 130,250 115,275" stroke="#40916c" stroke-width="2.5" fill="none"/>
      <!-- Late Blight Water-Soaked Lesions -->
      <path d="M 230,110 C 280,115 310,170 275,195 C 240,210 210,160 230,110 Z" fill="url(#lesionGrad)" filter="url(#fuzz)"/>
      <path d="M 115,160 C 145,170 155,220 125,245 C 95,260 85,200 115,160 Z" fill="url(#lesionGrad)" filter="url(#fuzz)"/>
      <path d="M 180,270 C 230,280 250,330 215,350 C 180,360 160,310 180,270 Z" fill="url(#lesionGrad)"/>
      <!-- White mildew fuzz on lesion border -->
      <circle cx="280" cy="180" r="14" fill="#f8fafc" opacity="0.6" filter="url(#fuzz)"/>
      <circle cx="110" cy="235" r="12" fill="#f8fafc" opacity="0.6" filter="url(#fuzz)"/>
    `;
  } else if (type === "tomato_early_blight") {
    // Tomato leaf with target-board concentric rings and yellow chlorotic halo
    innerSvg = `
      <rect width="400" height="400" fill="#f1f5f9"/>
      <path d="M 200,45 C 285,115 320,225 250,320 C 200,365 185,375 185,375 C 185,375 165,335 125,285 C 75,215 105,105 200,45 Z" fill="#386641" stroke="#2a4a30" stroke-width="3"/>
      <path d="M 200,45 Q 195,200 185,375" stroke="#6a994e" stroke-width="4" fill="none"/>
      <!-- Chlorotic yellow halo -->
      <ellipse cx="235" cy="160" rx="42" ry="34" fill="#eab308" opacity="0.75"/>
      <ellipse cx="140" cy="240" rx="36" ry="28" fill="#eab308" opacity="0.75"/>
      <!-- Concentric target rings -->
      <circle cx="235" cy="160" r="26" fill="#451a03"/>
      <circle cx="235" cy="160" r="20" fill="#78350f"/>
      <circle cx="235" cy="160" r="14" fill="#291305"/>
      <circle cx="235" cy="160" r="8" fill="#58240c"/>
      <circle cx="235" cy="160" r="3" fill="#0f0502"/>
      
      <circle cx="140" cy="240" r="22" fill="#451a03"/>
      <circle cx="140" cy="240" r="16" fill="#78350f"/>
      <circle cx="140" cy="240" r="10" fill="#291305"/>
      <circle cx="140" cy="240" r="4" fill="#0f0502"/>
    `;
  } else if (type === "maize_blight") {
    // Long maize leaf blade with elongated cigar-shaped lesions
    innerSvg = `
      <rect width="400" height="400" fill="#f1f5f9"/>
      <!-- Elongated maize blade -->
      <path d="M 40,360 Q 180,240 370,50 Q 280,180 120,380 Z" fill="#40916c" stroke="#2d6a4f" stroke-width="3"/>
      <path d="M 40,360 Q 200,210 370,50" stroke="#74c69d" stroke-width="5" fill="none"/>
      <!-- Parallel veins -->
      <path d="M 60,360 Q 210,215 360,65" stroke="#52b788" stroke-width="1.5" fill="none"/>
      <path d="M 80,365 Q 220,225 350,85" stroke="#52b788" stroke-width="1.5" fill="none"/>
      <!-- Cigar-shaped Northern Leaf Blight lesion -->
      <path d="M 180,210 C 230,165 260,140 280,120 C 265,130 220,175 160,230 C 170,220 175,215 180,210 Z" fill="#d97706" stroke="#92400e" stroke-width="2"/>
      <path d="M 100,290 C 140,250 170,220 190,200 C 175,210 135,255 85,310 C 92,300 96,295 100,290 Z" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
    `;
  } else if (type === "maize_rust") {
    // Maize blade with scattered cinnamon-brown rust pustules
    innerSvg = `
      <rect width="400" height="400" fill="#f1f5f9"/>
      <path d="M 50,370 Q 180,230 360,40 Q 270,190 130,390 Z" fill="#52b788" stroke="#2d6a4f" stroke-width="3"/>
      <path d="M 50,370 Q 200,205 360,40" stroke="#95d5b2" stroke-width="5" fill="none"/>
      <!-- Cinnamon brown powdery pustules -->
      <ellipse cx="200" cy="180" rx="7" ry="4" fill="#b45309" stroke="#78350f"/>
      <ellipse cx="215" cy="170" rx="6" ry="3" fill="#d97706" stroke="#92400e"/>
      <ellipse cx="190" cy="195" rx="5" ry="3" fill="#b45309"/>
      <ellipse cx="230" cy="150" rx="8" ry="4" fill="#b45309" stroke="#78350f"/>
      <ellipse cx="160" cy="230" rx="7" ry="3" fill="#d97706"/>
      <ellipse cx="175" cy="215" rx="6" ry="4" fill="#92400e"/>
      <ellipse cx="250" cy="130" rx="5" ry="3" fill="#b45309"/>
      <ellipse cx="140" cy="260" rx="8" ry="4" fill="#78350f"/>
      <ellipse cx="270" cy="110" rx="6" ry="3" fill="#d97706"/>
    `;
  } else if (type === "healthy") {
    // Vibrant healthy green bean / vegetable leaf
    innerSvg = `
      <rect width="400" height="400" fill="#f1f5f9"/>
      <path d="M 200,40 C 300,100 330,220 260,320 C 200,370 180,380 180,380 C 180,380 160,340 120,290 C 60,210 90,100 200,40 Z" fill="#2d6a4f" stroke="#1b4332" stroke-width="3"/>
      <path d="M 200,40 Q 195,200 180,380" stroke="#74c69d" stroke-width="4" fill="none"/>
      <path d="M 197,110 Q 260,135 295,160" stroke="#52b788" stroke-width="2" fill="none"/>
      <path d="M 193,170 Q 255,200 280,230" stroke="#52b788" stroke-width="2" fill="none"/>
      <path d="M 188,240 Q 240,270 260,300" stroke="#52b788" stroke-width="2" fill="none"/>
      <path d="M 194,130 Q 130,155 95,180" stroke="#52b788" stroke-width="2" fill="none"/>
      <path d="M 190,200 Q 130,230 105,255" stroke="#52b788" stroke-width="2" fill="none"/>
    `;
  } else if (type === "blurry_dark") {
    // Intentionally dark and heavily blurred sample to test the pre-flight safety filter!
    innerSvg = `
      <defs>
        <filter id="heavyBlur">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <!-- Very dark background (underexposed) -->
      <rect width="400" height="400" fill="#0f172a"/>
      <g filter="url(#heavyBlur)">
        <path d="M 200,40 C 300,100 330,220 260,320 C 200,370 180,380 180,380 C 180,380 160,340 120,290 C 60,210 90,100 200,40 Z" fill="#14532d" opacity="0.6"/>
        <circle cx="210" cy="180" r="45" fill="#1e1b4b"/>
      </g>
    `;
  }

  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">${innerSvg}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fullSvg)}`;
}

export const sampleLeaves: SampleLeaf[] = [
  {
    id: "sample-tomato-late-blight",
    name: "Tomato — Late Blight",
    crop: "Tomato",
    expectedCondition: "Late Blight (Tomato)",
    description: "Classic water-soaked dark necrotic blotches with pale fungal margins on tomato foliage.",
    dataUrl: createLeafSvg("tomato_late_blight")
  },
  {
    id: "sample-tomato-early-blight",
    name: "Tomato — Early Blight",
    crop: "Tomato",
    expectedCondition: "Early Blight (Tomato)",
    description: "Distinctive concentric target-board rings surrounded by yellow chlorotic halo.",
    dataUrl: createLeafSvg("tomato_early_blight")
  },
  {
    id: "sample-maize-blight",
    name: "Maize — Northern Leaf Blight",
    crop: "Maize",
    expectedCondition: "Northern Leaf Blight (Maize)",
    description: "Elongated elliptical cigar-shaped lesions characteristic of Exserohilum turcicum.",
    dataUrl: createLeafSvg("maize_blight")
  },
  {
    id: "sample-maize-rust",
    name: "Maize — Common Rust",
    crop: "Maize",
    expectedCondition: "Maize Common Rust",
    description: "Cinnamon-brown powdery pustules rupturing leaf epidermis on both leaf surfaces.",
    dataUrl: createLeafSvg("maize_rust")
  },
  {
    id: "sample-healthy-leaf",
    name: "Healthy Crop Leaf",
    crop: "Tomato",
    expectedCondition: "Healthy Crop Leaf",
    description: "Vibrant uniform green coloration without necrotic lesions, chlorosis, or pests.",
    dataUrl: createLeafSvg("healthy")
  },
  {
    id: "sample-blurry-leaf",
    name: "Poor Quality / Blurry Leaf (Safety Test)",
    crop: "Tomato",
    expectedCondition: "Uncertain / Indeterminate",
    isBlurryOrPoorQuality: true,
    description: "Underexposed and defocused sample. Used to test and verify the automated Quality & Blur Rejector.",
    dataUrl: createLeafSvg("blurry_dark")
  }
];

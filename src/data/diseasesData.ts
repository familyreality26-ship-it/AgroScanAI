import { DiseaseDatabase } from "../types";

export const diseasesData: DiseaseDatabase = {
  "Late Blight (Tomato)": {
    crop: "Tomato",
    scientific_name: "Phytophthora infestans",
    severity: "Critical",
    symptoms: [
      "Water-soaked dark lesions on leaf tips and margins rapidly turning brown/black",
      "White fungal-like cottony mildew on the undersides of leaves in humid conditions",
      "Greasy dark brown spots expanding on green fruits, causing rotting",
      "Stems show dark brown to black necrotic lesions, leading to stem collapse"
    ],
    actions: [
      "Immediately isolate infected plants and remove severely blighted foliage during dry weather",
      "Bag and burn or bury infected plant material at least 0.5m deep; do not compost blighted leaves",
      "Stop overhead irrigation immediately; switch to base or drip watering to keep foliage dry",
      "Apply copper-based protective fungicide (e.g. Copper Oxychloride 85% WP) according to registered label rates if weather is cloudy and wet"
    ],
    prevention: [
      "Practice 3 to 4-year crop rotation; avoid following potato, pepper, or eggplant",
      "Plant certified disease-free seedlings from reputable registered nurseries",
      "Space plants at least 50-60cm apart with trellising to promote rapid air circulation",
      "Mulch soil around plants to prevent rainwater splash from soil onto lower leaves"
    ],
    management: [
      "Monitor daily during misty, cold, and humid weather (temperatures between 15-22°C)",
      "If fungicides are used, follow Zimbabwe Ministry of Agriculture product label guidelines strictly",
      "Alternate systemic fungicides with protectants to avoid pathogen resistance build-up",
      "Never spray during high winds or near open water sources"
    ],
    warning: "Late Blight spreads aggressively in humid or rainy weather and can destroy an entire tomato field in 7 to 10 days if uncontained.",
    expert: "Contact your local Agritex extension officer or nearest agricultural research station immediately if rapid defoliation occurs across more than 15% of your plot.",
    sources: [
      "Agritex Zimbabwe Crop Protection Handbook (2022)",
      "PlantwisePlus / CABI Technical Factsheet: Phytophthora infestans in Southern Africa",
      "FAO Integrated Pest and Disease Management in Horticultural Crops"
    ],
    last_reviewed: "2026-02-15"
  },
  "Early Blight (Tomato)": {
    crop: "Tomato",
    scientific_name: "Alternaria solani",
    severity: "Moderate to High",
    symptoms: [
      "Small brown-black spots on older, lower leaves showing distinctive concentric rings (target-board pattern)",
      "Yellow halo (chlorosis) surrounding older lesions",
      "Premature drop of lower foliage exposing developing fruit to sunscald",
      "Dark, sunken, leathery cankers near the soil line on stems"
    ],
    actions: [
      "Prune and safely destroy heavily spotted lower leaves (bottom 30cm of plant)",
      "Ensure irrigation water is applied directly to the root zone without splashing soil",
      "Apply protective preventive fungicide (e.g., Mancozeb 80% WP) following registered package instructions"
    ],
    prevention: [
      "Stake and prune plants to improve airflow and sunlight penetration through canopy",
      "Maintain adequate soil fertility with balanced potassium and organic compost",
      "Rotate with non-solanaceous crops (e.g. maize, sorghum, beans) for at least 2 seasons"
    ],
    management: [
      "Scout lower leaves twice weekly starting 3 weeks after transplanting",
      "Clean pruning shears with a 10% bleach solution between plant rows"
    ],
    warning: "Early blight builds up from the soil and lower leaves; delaying pruning allows spores to infect upper canopy and stems.",
    expert: "Consult your ward Agritex officer if lesions appear above the first fruit cluster.",
    sources: [
      "CABI Plantwise Knowledge Bank - Alternaria solani",
      "Department of Agricultural Technical and Extension Services (Agritex) Zimbabwe"
    ],
    last_reviewed: "2026-01-20"
  },
  "Northern Leaf Blight (Maize)": {
    crop: "Maize",
    scientific_name: "Exserohilum turcicum",
    severity: "High",
    symptoms: [
      "Long, elliptical, cigar-shaped grayish-green to tan lesions on leaves (2.5 to 15cm in length)",
      "Lesions initially appear on lower leaves and progress upward as grain filling begins",
      "During moist periods, dark olivaceous fungal sporulation develops within the lesions",
      "Severe infection causes premature leaf death, giving the field a burnt or frosted appearance"
    ],
    actions: [
      "Assess crop development stage: if grain filling has completed (dough stage), spraying is generally not economically justified",
      "If infection occurs prior to silking on susceptible hybrids, evaluate registered fungicide application with an agronomist",
      "Deep-plow crop residues after harvest to bury fungal spores into the soil profile"
    ],
    prevention: [
      "Plant certified resistant or tolerant maize hybrid varieties recommended by Seed Co / CIMMYT for Southern Africa",
      "Practice 2-year crop rotation with legumes (groundnuts, cowpeas, sugar beans)",
      "Avoid excessive plant densities that create stagnant, humid canopy microclimates"
    ],
    management: [
      "Ensure balanced soil nutrition; avoid excessive nitrogen without adequate potassium",
      "Monitor early planted maize which often serves as an inoculum source for later crops"
    ],
    warning: "Infection before tasseling can reduce maize yield by 30% to 50% due to loss of photosynthetic leaf area.",
    expert: "Report widespread cigar-shaped leaf lesions before silking to your district agricultural extension office.",
    sources: [
      "CIMMYT Southern Africa Maize Pathology Field Guide",
      "Zimbabwe Agricultural Research Council (ARC) - Cereals Division"
    ],
    last_reviewed: "2026-03-01"
  },
  "Maize Common Rust": {
    crop: "Maize",
    scientific_name: "Puccinia sorghi",
    severity: "Moderate",
    symptoms: [
      "Small, powdery, cinnamon-brown pustules scattered across both upper and lower leaf surfaces",
      "Pustules rupture the epidermis, releasing brownish-red powdery spores when touched",
      "In severe attacks, leaves turn yellow, dry up, and curl prematurely",
      "Pustules turn brownish-black late in the season as teliospores form"
    ],
    actions: [
      "Determine disease incidence: if pustules are isolated on lower leaves only, monitor without immediate chemical treatment",
      "Maintain good field sanitation and weed control"
    ],
    prevention: [
      "Plant rust-resistant certified hybrid seeds adapted to your agro-ecological region",
      "Avoid planting maize out of season in high-humidity valleys"
    ],
    management: [
      "Common rust prefers cooler temperatures (16-23°C) with high humidity; activity slows in hot, dry weather",
      "Chemical sprays are rarely cost-effective for smallholders unless seed production is involved"
    ],
    warning: "Do not confuse with Southern Rust (Puccinia polysora), which has smaller orange pustules primarily on upper leaf surfaces and requires urgent attention.",
    expert: "Consult Agritex if pustules appear aggressively on the upper ear leaf before pollination.",
    sources: [
      "FAO Zimbabwe Maize Disease Manual",
      "CIMMYT Field Guide to Maize Diseases"
    ],
    last_reviewed: "2026-02-10"
  },
  "Fall Armyworm Damage (Maize)": {
    crop: "Maize",
    scientific_name: "Spodoptera frugiperda",
    severity: "Critical",
    symptoms: [
      "Windowpane feeding on young leaves giving transparent parchment appearance",
      "Ragged, irregular holes in the whorl leaves resembling hail damage",
      "Abundant moist yellowish-brown sawdust-like frass (droppings) accumulated inside the leaf whorl",
      "Caterpillars inside whorl with characteristic inverted 'Y' mark on head and four dots in a square on tail segment"
    ],
    actions: [
      "Crush egg masses (covered in grey fluff) and handpick visible caterpillars in small plots",
      "Apply fine dry wood ash, sand, or bio-pesticide (e.g. Bacillus thuringiensis) directly into the whorl of infested plants",
      "If threshold exceeded (>20% plants infested at early whorl), apply registered insecticidal treatment targeting the central whorl early in morning or late afternoon"
    ],
    prevention: [
      "Plant early with the first effective rains to escape peak moth migration populations",
      "Adopt push-pull technology: intercrop maize with Desmodium and plant Napier grass around borders",
      "Maintain biodiversity: encourage natural predators like parasitic wasps, ants, and ground beetles"
    ],
    management: [
      "Scout 20 consecutive plants in 5 different field locations weekly",
      "Never apply broad-spectrum organophosphates indiscriminately as they kill natural predator insects"
    ],
    warning: "Fall Armyworm can bore into the growing tip (deadheart) or into developing cobs, leading to total yield loss.",
    expert: "Alert your ward Agritex officer immediately as Fall Armyworm is a nationally monitored migratory pest in Zimbabwe.",
    sources: [
      "Ministry of Lands, Agriculture, Fisheries, Water and Rural Development Zimbabwe - FAW Action Plan",
      "CABI Invasive Species Compendium: Spodoptera frugiperda"
    ],
    last_reviewed: "2026-03-05"
  },
  "Late Blight (Potato)": {
    crop: "Potato",
    scientific_name: "Phytophthora infestans",
    severity: "Critical",
    symptoms: [
      "Irregular dark brown water-soaked blotches on leaves that enlarge rapidly",
      "White moldy growth on leaf undersides especially in the morning or high humidity",
      "Stems show greasy dark brown lesions leading to wilting of upper foliage",
      "Tubers show shallow copper-brown discoloration under the skin with dry rot spreading inward"
    ],
    actions: [
      "Cut down and safely destroy haulms (potato foliage) 2 weeks before harvesting to prevent tuber infection during lifting",
      "Do not dig tubers from wet soil if blight is present in the field",
      "Apply protective contact fungicide ahead of continuous rainfall periods"
    ],
    prevention: [
      "Plant certified disease-free seed tubers (e.g. varieties from Potato Seed Association of Zimbabwe)",
      "Hill soil up firmly around plant bases to create a physical barrier preventing spores from washing down to tubers",
      "Avoid planting potatoes adjacent to or following tomato crops"
    ],
    management: [
      "Ensure proper air circulation between potato ridges",
      "Store harvested potatoes in cool, dry, well-ventilated sheds; inspect frequently and discard rotting tubers"
    ],
    warning: "Infected seed tubers are the primary source of initial field outbreaks in Southern Africa.",
    expert: "Consult your agricultural extension officer for regional spray warning alerts during rainy seasons.",
    sources: [
      "International Potato Center (CIP) Sub-Saharan Africa",
      "Agritex Potato Production Handbook"
    ],
    last_reviewed: "2026-02-18"
  },
  "Bean Common Mosaic / Rust (Beans)": {
    crop: "Beans",
    scientific_name: "Uromyces appendiculatus / BCMV",
    severity: "Moderate to High",
    symptoms: [
      "Reddish-brown rust pustules surrounded by yellow halos on both leaf surfaces",
      "Mosaic pattern of light and dark green mottling, puckering, and leaf curling (for viral mosaic)",
      "Stunted plant growth, reduced pod set, and deformed pods with discolored seeds"
    ],
    actions: [
      "Rogue out and bury severely stunted or mosaic-infected plants to prevent aphid transmission to healthy crops",
      "Avoid walking through bean fields when plants are wet to prevent spreading fungal rust spores"
    ],
    prevention: [
      "Always use certified virus-free seed from registered agro-dealers (e.g. NUA 45 biofortified beans)",
      "Control aphid vectors using neem extract or insecticidal soap sprays",
      "Destroy all bean volunteer plants and weeds along field edges before planting"
    ],
    management: [
      "Intercrop with non-host cereals (maize, sorghum) to reduce pathogen spread",
      "Ensure balanced phosphorus nutrition for strong root and nodule development"
    ],
    warning: "Bean Common Mosaic Virus is seed-borne; planting saved seed from infected fields guarantees crop failure.",
    expert: "Seek advice from Agritex on bean varieties resistant to local rust strains and anthracnose.",
    sources: [
      "CIAT (International Center for Tropical Agriculture) Africa Bean Network",
      "Zimbabwe Department of Research and Specialist Services (DR&SS)"
    ],
    last_reviewed: "2026-01-30"
  },
  "Tobacco Mosaic Virus (Tobacco)": {
    crop: "Tobacco",
    scientific_name: "Tobacco Mosaic Virus (TMV)",
    severity: "High",
    symptoms: [
      "Mottled light and dark green pattern on leaves with blistering and leaf puckering",
      "Young leaves show vein clearing followed by mosaic distortion",
      "Severe stunting and distortion of leaves ('shoestring' or 'fern-leaf' appearance)",
      "Sunken brown necrotic spots on leaves during hot weather ('mosaic burn')"
    ],
    actions: [
      "Strict sanitation: workers must wash hands with soap and water or trisodium phosphate before touching tobacco seedlings",
      "Prohibit all smoking or use of raw tobacco products in seedbeds and tobacco barns",
      "Carefully pull out and destroy infected seedlings before transplanting into main lands"
    ],
    prevention: [
      "Plant TRB (Tobacco Research Board of Zimbabwe) certified resistant varieties (e.g., Kutsaga varieties)",
      "Disinfect all farm tools, seedbed trays, and tractor implements regularly",
      "Steam or solarize seedbed soil prior to sowing"
    ],
    management: [
      "TMV is exceptionally stable and transmitted mechanically by hands, clothing, and machinery, not by aphids",
      "Do not rotate tobacco with solanaceous crops like tomatoes, potatoes, or peppers"
    ],
    warning: "TMV can remain infectious in dried cured leaves and contaminated tools for decades.",
    expert: "Contact Kutsaga Research Station (Tobacco Research Board Zimbabwe) or your local tobacco extension officer.",
    sources: [
      "Kutsaga Research Station / TRB Zimbabwe Extension Circulars",
      "Tobacco Research Board Crop Protection Division"
    ],
    last_reviewed: "2026-02-25"
  },
  "Healthy Crop Leaf": {
    crop: "Various Crops",
    scientific_name: "Normal Healthy Tissue",
    severity: "Healthy",
    symptoms: [
      "Uniform green color appropriate for the crop variety and growth stage",
      "No visible lesions, pustules, chlorotic halos, or water-soaked blotches",
      "Leaf margins and veins are intact with normal turgor and architecture",
      "No insect frass, webbing, chewing damage, or fungal sporulation"
    ],
    actions: [
      "Continue standard good agronomic practices (balanced fertilization, proper weeding, consistent watering)",
      "Maintain regular weekly field scouting to catch any early onset symptoms quickly",
      "Keep records of field health and planting dates"
    ],
    prevention: [
      "Maintain healthy soil biology with compost, manure, and green cover crops",
      "Ensure proper plant spacing and weed sanitation"
    ],
    management: [
      "Monitor weather forecasts for sudden cold/damp spells that trigger fungal pathogens"
    ],
    warning: "Even healthy fields must be inspected weekly; early detection saves 80% of crop management costs.",
    expert: "Engage your Agritex extension officer for seasonal fertilizer top-dressing recommendations.",
    sources: [
      "Agritex Good Agricultural Practices (GAP) Guide",
      "FAO Smallholder Farming Handbook"
    ],
    last_reviewed: "2026-03-01"
  }
};

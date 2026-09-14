export interface BotanicalFlora {
  id: string;
  scientificName: string;
  commonName: string;
  family: string;
  bloomWindow: string; // e.g. "May 15 - June 10"
  bloomSeason: 'Spring' | 'Early Summer' | 'High Summer' | 'Late Summer / Autumn';
  nectarBrix: number; // sugar concentration % in nectar
  pollenColor: string; // hex or color name
  pollenHex: string;
  sensoryContribution: string;
  imageUrl: string;
}

export interface ApiaryTelemetry {
  ambientTempF: number;
  hiveCoreTempF: number;
  relativeHumidityPct: number;
  barometricInHg: number;
  forageStatus: string;
  pollenIndexScore: number; // 0-10
  windMph: number;
  uvIndex: number;
  lastSyncTime: string;
}

export interface LabCertificate {
  lotNumber: string;
  testedDate: string;
  harvestDate: string;
  diastaseNumber: number; // Schade scale DN (EU min is 8, Avenoir standard > 28)
  hmfMgKg: number; // Hydroxymethylfurfural (Fresh hive standard < 10 mg/kg)
  moisturePercent: number; // Certified refractometer reading
  pollenDensityPerGram: number; // Microscopically verified native pollen
  invertaseActivityUkg: number;
  fructoseGlucoseRatio: number;
  certificationAuthority: string;
  analystSignature: string;
}

export interface SensoryMetrics {
  sweetness: number; // 1-100
  acidity: number;
  floralIntensity: number;
  woodyResinous: number;
  maltCaramel: number;
  viscosity: number;
  pfundScaleMm: number; // Pfund scale color (0-140mm)
  pfundColorName: string;
  crystallizationRate: 'Slow (Liquid > 18 mo)' | 'Medium (6 - 12 mo)' | 'Fast (Natural Fine Velvet)';
}

export interface TerroirZoneData {
  id: string;
  name: string;
  region: string;
  county: string;
  elevation: string;
  elevationFt: number;
  season: string;
  colorHex: string;
  accentBg: string;
  heroTagline: string;
  description: string;
  microclimateNotes: string;
  gpsCoordinates: {
    lat: number;
    lng: number;
    label: string;
  };
  soilGeology: {
    formation: string;
    dominantMinerals: string;
    soilPh: string;
    drainage: string;
  };
  telemetry: ApiaryTelemetry;
  sensory: SensoryMetrics;
  labCertificate: LabCertificate;
  pairings: {
    cheeses: string[];
    breads: string[];
    teas: string[];
    culinaryUses: string[];
    sommelierNote: string;
  };
  flora: BotanicalFlora[];
  associatedProductIds: string[];
}

export const TERROIR_PROFILES_DATA: TerroirZoneData[] = [
  {
    id: "deciduous",
    name: "Deciduous Mountain Ridge",
    region: "Kittatinny Ridge & High Point",
    county: "Sussex County, NJ",
    elevation: "1,200 - 1,450 ft",
    elevationFt: 1350,
    season: "Late Summer (August - September)",
    colorHex: "#78350F",
    accentBg: "bg-amber-950",
    heroTagline: "Ancient Appalachian hemlock ridges, late forest honeydew, and wild mountain asters.",
    description: "Harvested along the rocky crests of the Kittatinny Ridge where dense stands of eastern white pine, hemlock, and wild goldenrod thrive. Here, high thermal diurnal swings concentrate nectar sugars, producing a dark amber honey with bold mineral depth.",
    microclimateNotes: "High-elevation northern exposure with crisp nighttime ridge breezes (52°F avg). Honeybees forage heavily on natural honeydew droplets along evergreen needles and late-blooming composites.",
    gpsCoordinates: {
      lat: 41.3195,
      lng: -74.6653,
      label: "Kittatinny Crest Apiary Station #4"
    },
    soilGeology: {
      formation: "Martinsburg Shale & Shawangunk Conglomerate",
      dominantMinerals: "Quartzite, Siliceous Sandstone, Mica",
      soilPh: "5.4 - 5.8 (Moderately Acidic)",
      drainage: "Steep talus slope, rapid runoff"
    },
    telemetry: {
      ambientTempF: 73,
      hiveCoreTempF: 94.2,
      relativeHumidityPct: 48,
      barometricInHg: 30.12,
      forageStatus: "Active Nectar Flow & Resin Foraging",
      pollenIndexScore: 8.7,
      windMph: 4,
      uvIndex: 6,
      lastSyncTime: "Live"
    },
    sensory: {
      sweetness: 68,
      acidity: 42,
      floralIntensity: 62,
      woodyResinous: 94,
      maltCaramel: 86,
      viscosity: 88,
      pfundScaleMm: 85,
      pfundColorName: "Dark Amber",
      crystallizationRate: "Slow (Liquid > 18 mo)"
    },
    labCertificate: {
      lotNumber: "LOT-NJ-2026-DEC",
      testedDate: "August 28, 2026",
      harvestDate: "August 22, 2026",
      diastaseNumber: 29.4,
      hmfMgKg: 3.2,
      moisturePercent: 16.2,
      pollenDensityPerGram: 48500,
      invertaseActivityUkg: 146.5,
      fructoseGlucoseRatio: 1.34,
      certificationAuthority: "Sussex County Melissopalynology Laboratory & Certified Spectrophotometry",
      analystSignature: "Dr. E. Thorne, Ph.D., Senior Melissopalynologist"
    },
    pairings: {
      cheeses: ["Clothbound Cave-Aged Cheddar", "Aged Pecorino Romano", "Gorgonzola Mountain Blue"],
      breads: ["Wood-fired Rye Boule", "Seeded Country Sourdough", "Toasted Brioche"],
      teas: ["Lapsang Souchong Smoked Tea", "Single-Origin Darjeeling First Flush", "Roasted Hojicha"],
      culinaryUses: [
        "Glaze for roast duck breast or heritage pork belly",
        "Drizzled over warm bitter greens and toasted walnuts",
        "Finished with coarse flaked sea salt over dark chocolate tortes"
      ],
      sommelierNote: "A powerhouse terroir honey with deep resinous cedar aromatics, molasses weight, and a lingering mineral finish reminiscent of pine needles after summer rain."
    },
    flora: [
      {
        id: "flora-pine",
        scientificName: "Pinus strobus",
        commonName: "Eastern White Pine",
        family: "Pinaceae",
        bloomWindow: "July 20 - August 25",
        bloomSeason: "Late Summer / Autumn",
        nectarBrix: 64,
        pollenColor: "Pale Golden Cream",
        pollenHex: "#FDE68A",
        sensoryContribution: "Resinous, woodsmoke, balsamic depth, and dark honeydew malt.",
        imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-goldenrod",
        scientificName: "Solidago altissima",
        commonName: "Tall Goldenrod",
        family: "Asteraceae",
        bloomWindow: "August 10 - September 20",
        bloomSeason: "Late Summer / Autumn",
        nectarBrix: 58,
        pollenColor: "Vibrant Mustard Yellow",
        pollenHex: "#EAB308",
        sensoryContribution: "Piquant floral aroma, butterscotch undertones, and warm mineral amber body.",
        imageUrl: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-aster",
        scientificName: "Symphyotrichum ericoides",
        commonName: "Heath Mountain Aster",
        family: "Asteraceae",
        bloomWindow: "August 25 - October 15",
        bloomSeason: "Late Summer / Autumn",
        nectarBrix: 52,
        pollenColor: "Bright Citron",
        pollenHex: "#CA8A04",
        sensoryContribution: "Crisp wildflower clarity, herbal persistence, and velvety body.",
        imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-hemlock",
        scientificName: "Tsuga canadensis",
        commonName: "Eastern Hemlock",
        family: "Pinaceae",
        bloomWindow: "July - August (Microflora Flow)",
        bloomSeason: "Late Summer / Autumn",
        nectarBrix: 61,
        pollenColor: "Deep Amber Ochre",
        pollenHex: "#92400E",
        sensoryContribution: "Tannic structure, damp forest earth, and lingering resinous backbone.",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400"
      }
    ],
    associatedProductIds: ["AV-JAR-APOTH", "AV-BOX-WALNUT"]
  },
  {
    id: "meadow",
    name: "Skylands Pasture & Orchard",
    region: "Sussex Valley & High Point Foothills",
    county: "Sussex County, NJ",
    elevation: "850 - 1,100 ft",
    elevationFt: 980,
    season: "High Summer (June - July)",
    colorHex: "#D97706",
    accentBg: "bg-amber-600",
    heroTagline: "Rolling heirloom pastures, sweet clover blossoms, and organic fruit orchard nectars.",
    description: "Nestled in the lush agricultural valleys of northern New Jersey, where certified organic apple orchards and naturalized clover pastures stretch across protected conservation easements. The bees forage on pristine summer blooms, yielding a silky, golden honey with intoxicating floral brightness.",
    microclimateNotes: "Temperate valley microclimate protected from ridge winds. Abundant morning dew followed by 14 hours of golden sunshine allows clover blossoms to produce exceptionally high nectar brix.",
    gpsCoordinates: {
      lat: 41.2218,
      lng: -74.6205,
      label: "Skylands Valley Yard #1"
    },
    soilGeology: {
      formation: "Glacial Till & Allentown Dolomite",
      dominantMinerals: "Calcium Carbonate, Magnesium, Rich Loam",
      soilPh: "6.8 - 7.2 (Near Neutral to Mildly Alkaline)",
      drainage: "Deep well-drained silt loam"
    },
    telemetry: {
      ambientTempF: 78,
      hiveCoreTempF: 94.8,
      relativeHumidityPct: 52,
      barometricInHg: 29.98,
      forageStatus: "Heavy Clover Inflow & Wax Comb Production",
      pollenIndexScore: 9.4,
      windMph: 3,
      uvIndex: 7,
      lastSyncTime: "Live"
    },
    sensory: {
      sweetness: 84,
      acidity: 30,
      floralIntensity: 88,
      woodyResinous: 22,
      maltCaramel: 45,
      viscosity: 76,
      pfundScaleMm: 24,
      pfundColorName: "Light Amber",
      crystallizationRate: "Medium (6 - 12 mo)"
    },
    labCertificate: {
      lotNumber: "LOT-NJ-2026-SKY",
      testedDate: "July 24, 2026",
      harvestDate: "July 18, 2026",
      diastaseNumber: 31.8,
      hmfMgKg: 2.1,
      moisturePercent: 17.1,
      pollenDensityPerGram: 56200,
      invertaseActivityUkg: 162.0,
      fructoseGlucoseRatio: 1.18,
      certificationAuthority: "Sussex County Melissopalynology Laboratory & Certified Spectrophotometry",
      analystSignature: "Dr. E. Thorne, Ph.D., Senior Melissopalynologist"
    },
    pairings: {
      cheeses: ["Triple-Cream Brillat-Savarin", "Fresh Chèvre Goat Cheese", "Aged Gruyère AOP"],
      breads: ["Fresh Flaky Croissant", "Rustic Country Baguette", "Warm Brioche Toast"],
      teas: ["Silver Needle White Tea", "Organic Chamomile Blossom", "Jasmine Pearl Green Tea"],
      culinaryUses: [
        "Whipped into cultured sweet cream butter for warm scones",
        "Dressed over ripe summer figs, ricotta, and micro-basil",
        "Stirred into morning matcha or iced botanical infusions"
      ],
      sommelierNote: "Exceptionally radiant and floral with notes of sun-warmed clover, crisp orchard pear, fresh honeycomb chew, and sweet cream."
    },
    flora: [
      {
        id: "flora-clover",
        scientificName: "Melilotus albus",
        commonName: "Sweet White Clover",
        family: "Fabaceae",
        bloomWindow: "June 1 - July 20",
        bloomSeason: "High Summer",
        nectarBrix: 54,
        pollenColor: "Soft Canary Yellow",
        pollenHex: "#FEF08A",
        sensoryContribution: "Silky sweetness, delicate coumarin/vanilla note, and clean finish.",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-apple",
        scientificName: "Malus domestica",
        commonName: "Heirloom Orchard Apple",
        family: "Rosaceae",
        bloomWindow: "May 10 - June 2",
        bloomSeason: "Spring",
        nectarBrix: 48,
        pollenColor: "Pale Cream Ivory",
        pollenHex: "#FEF9C3",
        sensoryContribution: "Bright orchard fruit notes, pear blossom elegance, and fine acidity.",
        imageUrl: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-rose",
        scientificName: "Rosa multiflora",
        commonName: "Wild Meadow Briar Rose",
        family: "Rosaceae",
        bloomWindow: "June 10 - July 5",
        bloomSeason: "High Summer",
        nectarBrix: 46,
        pollenColor: "Golden Ochre",
        pollenHex: "#F59E0B",
        sensoryContribution: "Intoxicating rose petal bouquet with delicate citrus-tinged finish.",
        imageUrl: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-elder",
        scientificName: "Sambucus nigra",
        commonName: "Black Elderberry Blossom",
        family: "Adoxaceae",
        bloomWindow: "June 15 - July 10",
        bloomSeason: "High Summer",
        nectarBrix: 50,
        pollenColor: "Dusty Warm Gold",
        pollenHex: "#D97706",
        sensoryContribution: "Muscat grape aromatics, elderflower cordial nuances, and bright freshness.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=400"
      }
    ],
    associatedProductIds: ["AV-JAR-SKYLAND", "AV-JAR-HEXDUO", "AV-COMB-SLAB"]
  },
  {
    id: "pinebarrens",
    name: "Pine Barrens Wild Heath",
    region: "Wharton & Cohansey Sand Barrens",
    county: "Burlington & Sussex Outlier Apiaries",
    elevation: "300 - 550 ft",
    elevationFt: 420,
    season: "Early Spring (May - June)",
    colorHex: "#B45309",
    accentBg: "bg-amber-700",
    heroTagline: "Ancient acidic quartz sand plains, wild highbush blueberry bogs, and native cranberries.",
    description: "One of the most biologically distinctive ecosystems in the world. Bees forage along pristine aquifer-fed bogs blanketed in wild blueberry blooms and sweetfern. The resulting nectar has a distinctive amber jewel tone, mouth-watering tart berry acidity, and subtle herbal complexity.",
    microclimateNotes: "Rapid radiant soil heating of white quartz sands during the day, accompanied by cool peat bog moisture at twilight. Creates an early spring micro-spring bloom unmatched in New England.",
    gpsCoordinates: {
      lat: 39.8142,
      lng: -74.5583,
      label: "Cohansey Sand Bog Yard #2"
    },
    soilGeology: {
      formation: "Cohansey & Kirkwood Quartz Sand Formations",
      dominantMinerals: "Pure Silica Sand, Ironstone, Acidic Peat Moss",
      soilPh: "4.2 - 4.8 (High Acid, Nutrient Lean)",
      drainage: "Excessively drained permeable sands"
    },
    telemetry: {
      ambientTempF: 71,
      hiveCoreTempF: 93.9,
      relativeHumidityPct: 60,
      barometricInHg: 30.04,
      forageStatus: "Spring Brood Rearing & Berry Nectar Flow",
      pollenIndexScore: 9.1,
      windMph: 5,
      uvIndex: 5,
      lastSyncTime: "Live"
    },
    sensory: {
      sweetness: 72,
      acidity: 78,
      floralIntensity: 74,
      woodyResinous: 46,
      maltCaramel: 58,
      viscosity: 82,
      pfundScaleMm: 52,
      pfundColorName: "Amber",
      crystallizationRate: "Medium (6 - 12 mo)"
    },
    labCertificate: {
      lotNumber: "LOT-NJ-2026-PIN",
      testedDate: "June 12, 2026",
      harvestDate: "June 6, 2026",
      diastaseNumber: 30.2,
      hmfMgKg: 1.8,
      moisturePercent: 16.8,
      pollenDensityPerGram: 51800,
      invertaseActivityUkg: 154.2,
      fructoseGlucoseRatio: 1.29,
      certificationAuthority: "Sussex County Melissopalynology Laboratory & Certified Spectrophotometry",
      analystSignature: "Dr. E. Thorne, Ph.D., Senior Melissopalynologist"
    },
    pairings: {
      cheeses: ["Castelmagno Alpine Cheese", "Manchego Curado", "Smoked Gouda"],
      breads: ["Walnut Sourdough Loaf", "Dark Pumpernickel", "Oat Crispbreads"],
      teas: ["Earl Grey with Bergamot", "Nilgiri Frost Tea", "Lemon Verbena Infusion"],
      culinaryUses: [
        "Tossed with balsamic vinaigrette over wild arugula and goat cheese",
        "Glaze for wild salmon or blackened game meats",
        "Paired with Greek sheep's milk yogurt and toasted pistachios"
      ],
      sommelierNote: "A sensory gem with an unmistakable tangy blueberry top note, rich molasses body, and a clean, refreshing cranberry acidity that cuts through fatty cheeses."
    },
    flora: [
      {
        id: "flora-blueberry",
        scientificName: "Vaccinium corymbosum",
        commonName: "Highbush Blueberry",
        family: "Ericaceae",
        bloomWindow: "May 5 - May 28",
        bloomSeason: "Spring",
        nectarBrix: 56,
        pollenColor: "Milky White",
        pollenHex: "#F1F5F9",
        sensoryContribution: "Tart berry aroma, citrus undertones, and amber jewel clarity.",
        imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-cranberry",
        scientificName: "Vaccinium macrocarpon",
        commonName: "Native Bog Cranberry",
        family: "Ericaceae",
        bloomWindow: "June 10 - July 2",
        bloomSeason: "High Summer",
        nectarBrix: 49,
        pollenColor: "Soft Rose Ivory",
        pollenHex: "#FFE4E6",
        sensoryContribution: "Crisp natural acidity, astringent cranberry skin complexity, and clean finish.",
        imageUrl: "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-pitchpine",
        scientificName: "Pinus rigida",
        commonName: "Pitch Pine Resin Pollen",
        family: "Pinaceae",
        bloomWindow: "May 15 - June 10",
        bloomSeason: "Spring",
        nectarBrix: 60,
        pollenColor: "Golden Ochre Dust",
        pollenHex: "#D97706",
        sensoryContribution: "Warm cedarwood spice, natural propolis warmth, and resinous backbone.",
        imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-sweetfern",
        scientificName: "Comptonia peregrina",
        commonName: "Wild Sand Sweetfern",
        family: "Myricaceae",
        bloomWindow: "May 1 - May 25",
        bloomSeason: "Spring",
        nectarBrix: 44,
        pollenColor: "Olive Khaki Yellow",
        pollenHex: "#A1A1AA",
        sensoryContribution: "Balsamic herbal eucalyptus, bay leaf spice, and refreshing cooling sensation.",
        imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400"
      }
    ],
    associatedProductIds: ["AV-CHEST-MAPLE", "AV-JAR-APOTH"]
  },
  {
    id: "wetlands",
    name: "Delaware River Basin",
    region: "Riparian Alluvial Corridor & Delaware Water Gap",
    county: "Sussex & Warren County, NJ",
    elevation: "400 - 650 ft",
    elevationFt: 480,
    season: "Autumn Canopy (September - October)",
    colorHex: "#92400E",
    accentBg: "bg-stone-800",
    heroTagline: "Rich riparian floodplains, fragrant black locust, and late autumn river blooms.",
    description: "Along the fertile banks of the Delaware River, nutrient-rich alluvial soils nourish towering black locust trees and dense riverbank flora. The bees forage on intense late-season nectar flows before entering winter cluster, yielding an exceptionally viscous honey with smoky caramel and warm spice.",
    microclimateNotes: "Dense morning river mist holding humidity, followed by warm sunny afternoons. River temperature stabilizes night cooling, extending the autumn foraging window by three weeks.",
    gpsCoordinates: {
      lat: 41.0125,
      lng: -75.1246,
      label: "Delaware Riparian Apiary #3"
    },
    soilGeology: {
      formation: "Late Wisconsinan River Alluvium",
      dominantMinerals: "Humic Organic Matter, River Gravel, Illite Clay",
      soilPh: "6.2 - 6.6 (Slightly Acidic)",
      drainage: "Seasonally saturated, rich floodplain silt"
    },
    telemetry: {
      ambientTempF: 69,
      hiveCoreTempF: 94.0,
      relativeHumidityPct: 64,
      barometricInHg: 30.18,
      forageStatus: "Pre-Winter Hive Capping & Propolis Sealing",
      pollenIndexScore: 8.2,
      windMph: 2,
      uvIndex: 4,
      lastSyncTime: "Live"
    },
    sensory: {
      sweetness: 80,
      acidity: 36,
      floralIntensity: 70,
      woodyResinous: 65,
      maltCaramel: 92,
      viscosity: 96,
      pfundScaleMm: 110,
      pfundColorName: "Dark / Molasses Amber",
      crystallizationRate: "Fast (Natural Fine Velvet)"
    },
    labCertificate: {
      lotNumber: "LOT-NJ-2026-DEL",
      testedDate: "October 8, 2026",
      harvestDate: "September 30, 2026",
      diastaseNumber: 33.4,
      hmfMgKg: 2.8,
      moisturePercent: 16.5,
      pollenDensityPerGram: 62400,
      invertaseActivityUkg: 178.0,
      fructoseGlucoseRatio: 1.12,
      certificationAuthority: "Sussex County Melissopalynology Laboratory & Certified Spectrophotometry",
      analystSignature: "Dr. E. Thorne, Ph.D., Senior Melissopalynologist"
    },
    pairings: {
      cheeses: ["Stilton Blue Cheese", "Aged Smoked Cheddar", "Ossau-Iraty Sheep Cheese"],
      breads: ["Black Molasses Pumpernickel", "Toasted Sourdough Focaccia", "English Muffins"],
      teas: ["Keemun Black Tea", "Roasted Oolong Tieguanyin", "Fresh Mint Infusion"],
      culinaryUses: [
        "Finishing drizzle on grilled lamb chops or smoked short ribs",
        "Folded into warm autumn apple crisps and spiced gingerbread",
        "Old Fashioned cocktail sweetener with barrel-proof bourbon"
      ],
      sommelierNote: "A lavish, full-bodied honey with notes of dark buckwheat malt, black locust blossom, burnt caramel, and deep riverbank herbs."
    },
    flora: [
      {
        id: "flora-locust",
        scientificName: "Robinia pseudoacacia",
        commonName: "Black Locust Tree",
        family: "Fabaceae",
        bloomWindow: "May 20 - June 8",
        bloomSeason: "Spring",
        nectarBrix: 62,
        pollenColor: "Pale Ivory White",
        pollenHex: "#FEFCE8",
        sensoryContribution: "Intense floral sweetness, vanilla blossom perfume, and crystal transparency.",
        imageUrl: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-knotweed",
        scientificName: "Fallopia japonica",
        commonName: "Japanese Bamboo Knotweed",
        family: "Polygonaceae",
        bloomWindow: "August 20 - September 25",
        bloomSeason: "Late Summer / Autumn",
        nectarBrix: 66,
        pollenColor: "Dusty Warm Buff",
        pollenHex: "#E5E7EB",
        sensoryContribution: "Rich dark molasses, buckwheat undertone, and velvety thick body.",
        imageUrl: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-loosestrife",
        scientificName: "Lythrum salicaria",
        commonName: "Purple River Loosestrife",
        family: "Lythraceae",
        bloomWindow: "July 15 - September 5",
        bloomSeason: "High Summer",
        nectarBrix: 51,
        pollenColor: "Amethyst Tinted Ochre",
        pollenHex: "#C084FC",
        sensoryContribution: "Delicate astringency, green herbal aroma, and deep golden color.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: "flora-marshmallow",
        scientificName: "Althaea officinalis",
        commonName: "Marsh Mallow Bloom",
        family: "Malvaceae",
        bloomWindow: "August 1 - September 15",
        bloomSeason: "Late Summer / Autumn",
        nectarBrix: 47,
        pollenColor: "Soft Cream Blossom",
        pollenHex: "#F3F4F6",
        sensoryContribution: "Mild herbaceous sweetness, comforting floral finish, and smooth mouthfeel.",
        imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=400"
      }
    ],
    associatedProductIds: ["AV-INF-VANILLA", "AV-INF-LAVENDER"]
  }
];

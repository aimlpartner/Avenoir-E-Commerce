export type Department = 'honey' | 'beekeeping';

export type Subcategory = 
  // Honey sub-products
  | 'honey-raw' 
  | 'honey-comb' 
  | 'honey-vaults' 
  | 'honey-infused'
  // Beekeeping sub-products
  | 'bee-apparel' 
  | 'bee-tools' 
  | 'bee-hardware' 
  | 'bee-harvest';

export interface SubCategoryMeta {
  id: Subcategory;
  department: Department;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  department: Department;
  subcategory: Subcategory;
  price: number;
  badge?: string;
  description: string;
  longDescription?: string;
  details: string[];
  materials: string;
  finishes?: string[];
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  inStock?: boolean;
  sku?: string;
  weight?: string;
  dimensions?: string;
}

export const HONEY_SUBCATEGORIES: SubCategoryMeta[] = [
  {
    id: 'honey-raw',
    department: 'honey',
    name: 'Raw & Terroir Reserve Jars',
    shortName: 'Raw & Terroir Jars',
    description: 'Cold-extracted, unheated varietal honeys capturing microclimates.',
    iconName: 'Droplets'
  },
  {
    id: 'honey-comb',
    department: 'honey',
    name: 'Honeycomb & Tasting Flights',
    shortName: 'Honeycomb & Flights',
    description: '100% edible raw comb slabs and multi-varietal tasting flights.',
    iconName: 'Layers'
  },
  {
    id: 'honey-vaults',
    department: 'honey',
    name: 'Luxury Honey Gift Vaults',
    shortName: 'Gift Vaults & Chests',
    description: 'Handcrafted solid American walnut and maple presentation chests.',
    iconName: 'Gift'
  },
  {
    id: 'honey-infused',
    department: 'honey',
    name: 'Infused & Creamed Delicacies',
    shortName: 'Infused & Creamed',
    description: 'Micro-whipped honeys infused with vanilla bean and wild botanicals.',
    iconName: 'Sparkles'
  }
];

export const BEEKEEPING_SUBCATEGORIES: SubCategoryMeta[] = [
  {
    id: 'bee-apparel',
    department: 'beekeeping',
    name: 'Protective Gear & Apparel',
    shortName: 'Protective Apparel',
    description: 'Triple-layer ventilated suits, round veils, and goatskin gauntlets.',
    iconName: 'Shield'
  },
  {
    id: 'bee-tools',
    department: 'beekeeping',
    name: 'Hive Tools & Smokers',
    shortName: 'Tools & Smokers',
    description: 'Stainless steel smokers with heat shields and J-hook frame lifters.',
    iconName: 'Wrench'
  },
  {
    id: 'bee-hardware',
    department: 'beekeeping',
    name: 'Hive Hardware & Woodenware',
    shortName: 'Hive Hardware',
    description: 'Western Red Cedar Langstroth brood boxes, frames, and foundations.',
    iconName: 'Layers'
  },
  {
    id: 'bee-harvest',
    department: 'beekeeping',
    name: 'Harvesting & Honeycomb Care',
    shortName: 'Harvest & Wax Craft',
    description: 'Turned brass tasting wands, pure beeswax sheets, and uncapping rollers.',
    iconName: 'Compass'
  }
];

export const PRODUCTS: ProductItem[] = [
  // ==========================================
  // 1. HONEY PRODUCTS
  // ==========================================
  {
    id: "AV-BOX-WALNUT",
    name: "The Estate Walnut Tri-Vault",
    subtitle: "Triple Terroir Heirloom Presentation Trunk",
    department: "honey",
    subcategory: "honey-vaults",
    price: 185.00,
    badge: "Bestseller",
    description: "Solid American Black Walnut trunk hand-buffed with organic beeswax. Holds three artisan terroir honey vessels in deep velvet insets, accompanied by a solid turned brass dipper.",
    longDescription: "Handcrafted by master cabinetmakers in Sussex County, New Jersey, using sustainably harvested American Black Walnut. Each tri-vault features hand-cut box joints, solid brass quadrant hinges, and a recessed emerald velvet interior engineered to cradle three 250g apothecary honey jars. Finished exclusively with our apiary's own pure filtered beeswax and cold-pressed organic walnut oil.",
    details: [
      "Solid American Black Walnut joinery",
      "Includes 3x 250g Seasonal Reserve Jars (Wild Pine, Clover, Autumn Blossom)",
      "Hand-turned solid C360 brass tasting wand included",
      "Gold-foil debossed presentation casing and numbered harvest seal"
    ],
    materials: "Solid American Walnut, C360 Brass, Forest Velvet",
    finishes: ["Satin Walnut Lacquer", "Raw Beeswax Buffed", "Dark Espresso Oil"],
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 128,
    inStock: true,
    sku: "AV-WV-01",
    weight: "2.4 kg (packed)",
    dimensions: "32cm x 14cm x 12cm"
  },
  {
    id: "AV-CHEST-MAPLE",
    name: "The Heritage Birdseye Maple Chest",
    subtitle: "Rare Figured Timber Keepsake Vault",
    department: "honey",
    subcategory: "honey-vaults",
    price: 195.00,
    badge: "Limited Edition",
    description: "Crafted from rare New England birdseye maple exhibiting natural holographic figure and chatoyancy. Lined in oyster silk with bespoke brass mortise hardware.",
    longDescription: "Sourced from small-run timber lots exhibiting rare birdseye character where natural vortex swirl patterns create a shimmering chatoyant depth. Contains two 350g French apothecary vessels sealed with hand-poured gold beeswax, flanked by an engraved brass tasting paddle and individual harvest certificate.",
    details: [
      "Rare figured birdseye maple planks with hand-rubbed finish",
      "Dual 350g Apothecary honey flasks with natural bark corks",
      "Precision brass lock & key presentation mechanism",
      "Hand-numbered estate provenance certificate"
    ],
    materials: "Birdseye Maple, Brass Hardware, Oyster Silk",
    finishes: ["Clear Satin Coated", "Beeswax Buffed"],
    imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 94,
    inStock: true,
    sku: "AV-MC-02",
    weight: "2.1 kg",
    dimensions: "28cm x 16cm x 11cm"
  },
  {
    id: "AV-JAR-APOTH",
    name: "Deciduous Forest Glass Apothecary",
    subtitle: "500g Wild Unheated Pine Honey",
    department: "honey",
    subcategory: "honey-raw",
    price: 48.00,
    badge: "Rare Terroir",
    description: "Heavy-bottom French flint glass apothecary vessel containing raw, unheated wild pine honey. Crowned with natural hand-shaved bark cork and stamped beeswax seal.",
    longDescription: "Harvested from ancient white pine and hemlock stands along the Kittatinny Ridge. Rich in honeydew secretions collected by wild colonies during late summer dry spells. Characterized by deep amber color, intense resinous malt aromas, and a finish reminiscent of warm cedar needles and bittersweet caramel.",
    details: [
      "Heavyweight 400g flint glass reusable jar",
      "Subtle resinous, malty & botanical flavor profile",
      "Diastase enzymatic activity index > 28",
      "Hermetically corked with pure organic wax stamp"
    ],
    materials: "Flint Glass, Portuguese Bark Cork, Organic Beeswax",
    imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviewsCount: 215,
    inStock: true,
    sku: "AV-J-PINE500",
    weight: "500g net honey / 920g gross",
    dimensions: "14cm tall x 8cm dia"
  },
  {
    id: "AV-JAR-SKYLAND",
    name: "High Skylands Wildflower Jar",
    subtitle: "450g High-Elevation Mountain Nectar",
    department: "honey",
    subcategory: "honey-raw",
    price: 42.00,
    badge: "Single Apiary",
    description: "Collected by bees foraging on late-blooming elderberry, wild pear blossom, and mountain asters in Sussex County ridges. Gentle sweetness with radiant gold color.",
    longDescription: "A radiant, translucent golden nectar produced at 1,400 feet elevation. Unadulterated and cold-spun without heating above the natural 95°F hive environment. Retains abundant active pollen grains, propolis bioflavonoids, and natural enzymes.",
    details: [
      "Single-harvest June micro-batch",
      "Notes of elderflower, summer pear, ripe peach",
      "Never heated above 95°F hive warmth",
      "Heavy apothecary UV-protective jar"
    ],
    materials: "Amber Flint Glass, Natural Beechwood Cap",
    imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    sku: "AV-J-SKY450",
    weight: "450g net honey",
    dimensions: "13cm tall x 7.5cm dia"
  },
  {
    id: "AV-JAR-HEXDUO",
    name: "Honeycomb Hexagonal Tasting Duo",
    subtitle: "2x 250g Wildflower & Clover Nectars",
    department: "honey",
    subcategory: "honey-comb",
    price: 64.00,
    badge: "Tasting Set",
    description: "A dual set of geometric honeycomb glass jars, cradling seasonal high-summer clover and wildflower nectar from pristine New Jersey meadow reserves.",
    longDescription: "Presented in twin hexagonal glass flutes that mirror the natural geometry of beeswax cells. Includes one 250g Sweet White Sweetclover jar (soft vanilla and herbal finish) and one 250g Mountain Aster jar (robust, lingering floral warmth).",
    details: [
      "Two distinct floral harvest profiles",
      "Cold-extracted below hive temperature (95°F)",
      "Hexagonal faceted jars reflecting ambient light",
      "Packaged in straw-padded gift box"
    ],
    materials: "Pressed Faceted Glass, Gold Foil Embossed Labels",
    imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 87,
    inStock: true,
    sku: "AV-SET-HEX2",
    weight: "500g net honey",
    dimensions: "18cm x 10cm x 12cm"
  },
  {
    id: "AV-COMB-SLAB",
    name: "Artisan Cut Honeycomb Frame Slab",
    subtitle: "340g Pure 100% Edible Raw Comb",
    department: "honey",
    subcategory: "honey-comb",
    price: 54.00,
    badge: "Raw Comb",
    description: "Straight from the hive wooden frame: natural hexagon beeswax cells filled with capping nectar. Delicious on warm sourdough, aged cheeses, or savored straight.",
    longDescription: "Cut by hand directly from fresh wooden super frames. Every cell was built by worker bees from virgin wax and capped with pure white beeswax wax seals. Biting into raw comb releases an explosion of aromatic, viscous nectar coupled with delicate natural chew.",
    details: [
      "Untouched by mechanical extractors",
      "Pure organic virgin beeswax structure",
      "Bursting with fragrant wildflower nectar",
      "Packaged in an acrylic keepsake display box"
    ],
    materials: "Pure Virgin Beeswax, Acrylic Presentation Box",
    imageUrl: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 112,
    inStock: true,
    sku: "AV-COMB-340",
    weight: "340g slab",
    dimensions: "12cm x 10cm x 3cm"
  },
  {
    id: "AV-INF-VANILLA",
    name: "Bourbon Vanilla Whipped Creamed Honey",
    subtitle: "300g Velvet Crystallized Reserve",
    department: "honey",
    subcategory: "honey-infused",
    price: 36.00,
    badge: "Artisan Whip",
    description: "Slowly micro-spun at low temperatures into a velvet, spreadable silk texture, folded with whole Madagascar Bourbon vanilla bean caviar. Melts effortlessly on brioche.",
    longDescription: "Using controlled cold crystallization, we gently churn clover honey over 72 hours until microscopic crystals form a decadent silk spread. Infused with whole split Madagascar Bourbon vanilla bean caviar for warm, buttery aromatics.",
    details: [
      "Cold-whipped over 72 hours for micro-crystals",
      "Grade-A Bourbon vanilla bean pods",
      "Smooth spreadable butter-like consistency",
      "Airtight gold-rimmed preserving jar"
    ],
    materials: "Flint Glass, Gold Metal Screw Cap",
    imageUrl: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 176,
    inStock: true,
    sku: "AV-CRM-VAN300",
    weight: "300g",
    dimensions: "9cm tall x 8cm dia"
  },
  {
    id: "AV-INF-LAVENDER",
    name: "Wild French Lavender Infused Honey",
    subtitle: "320g Botanical Reserve Honey",
    department: "honey",
    subcategory: "honey-infused",
    price: 38.00,
    badge: "Botanical",
    description: "Sun-drenched clover honey gently steeped with organic culinary Provence lavender blossoms. Delivers subtle floral aromatics and calming herbal finish for teas.",
    longDescription: "Raw spring blossom honey steeped for thirty days with culinary-grade organic Lavandula angustifolia flowers. Light, ethereal floral notes with a soothing hint of mint and herbaceous camphor.",
    details: [
      "Infused with organic French lavender buds",
      "Light floral bouquet with subtle citrus finish",
      "Ideal companion for Earl Grey or chamomile",
      "Includes miniature wooden honey drizzle spoon"
    ],
    materials: "Heavy European Glass, Natural Wood Spoon",
    imageUrl: "https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviewsCount: 98,
    inStock: true,
    sku: "AV-INF-LAV320",
    weight: "320g",
    dimensions: "10cm tall x 8cm dia"
  },

  // ==========================================
  // 2. BEEKEEPING PRODUCTS
  // ==========================================
  {
    id: "AV-BEE-SUIT",
    name: "Master Beekeeper 3-Layer Ventilated Suit",
    subtitle: "Full-Body Air-Mesh Stiff Veil Protection",
    department: "beekeeping",
    subcategory: "bee-apparel",
    price: 165.00,
    badge: "Pro Grade",
    description: "Engineered with triple-layer breathable foam mesh that keeps you cool in 90°F summer sun while creating an impenetrable barrier against stings. Complete with detachable round veil.",
    longDescription: "Designed for apiarists who work through sweltering July harvests. The 5mm sandwich foam structure prevents bee stingers from contacting skin while allowing cross-breezes to circulate freely. Outfitted with reinforced YKK brass dual zippers, cushioned knee pads, and extra-deep hive tool pockets.",
    details: [
      "Triple-layer 5mm ventilated 3D air-mesh",
      "Reinforced brass heavy-duty YKK zippers",
      "Detachable fencing & round veil interchange",
      "Reinforced knee pads & deep hive tool pockets"
    ],
    materials: "3D Air-Mesh Cotton Blend, Brass Zippers",
    imageUrl: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    sku: "AV-SUIT-PRO",
    weight: "1.8 kg",
    dimensions: "Sizes: S, M, L, XL, XXL"
  },
  {
    id: "AV-BEE-GLOVES",
    name: "Supple Goatskin Ventilated Gauntlet Gloves",
    subtitle: "Puncture-Resistant Apiary Protection",
    department: "beekeeping",
    subcategory: "bee-apparel",
    price: 44.00,
    badge: "Top Rated",
    description: "Premium top-grain goatskin leather offers tactile sensitivity for handling queens and frames without crushing bees. Extended heavy canvas sleeve with breathable ventilation band.",
    longDescription: "Unlike stiff cowhide, genuine top-grain goatskin is naturally pliable, granting maximum tactile precision required when rolling frames or marking queens. Extended 10-ounce duck canvas forearm sleeves feature double elastic seals to lock bees out.",
    details: [
      "Soft, highly tactile white goatskin leather",
      "Elbow-length puncture-proof canvas sleeve",
      "Elastic wrist & forearm bands to seal bees out",
      "Treated with beeswax for weatherproofing"
    ],
    materials: "Grade-A Goatskin Leather, Duck Canvas Mesh",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 154,
    inStock: true,
    sku: "AV-GLV-GS",
    weight: "280g",
    dimensions: "Sizes: S, M, L, XL"
  },
  {
    id: "AV-BEE-SMOKER",
    name: "Stainless Steel Heat-Shield Bee Smoker",
    subtitle: "Heavy-Gauge 4x7 Inch Fire Chamber",
    department: "beekeeping",
    subcategory: "bee-tools",
    price: 78.00,
    badge: "Essential",
    description: "Professional apiary smoker featuring heat-guard protective cage, heavy leather bellows, and mounting hook. Delivers cool, calm smoke to gently soothe the colony during hive inspections.",
    longDescription: "Constructed of 304 surgical-grade stainless steel with an interior perforated airflow grate that ensures efficient burning of pine needles, burlap, or hardwood pellets. A wire cage shield prevents accidental surface burns to skin and equipment.",
    details: [
      "304 surgical stainless steel chamber",
      "Protective heat-shield wire cage with hook",
      "Reinforced hardwood & leather bellows",
      "Includes perforated removable base grate"
    ],
    materials: "304 Stainless Steel, Hardwood, Leather",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 162,
    inStock: true,
    sku: "AV-SMK-304",
    weight: "950g",
    dimensions: "28cm x 18cm x 11cm"
  },
  {
    id: "AV-BEE-JHOOK",
    name: "Precision Titanium-Coated J-Hook Hive Tool",
    subtitle: "10.5-Inch Hand-Forged Frame Lifter",
    department: "beekeeping",
    subcategory: "bee-tools",
    price: 34.00,
    badge: "Hand Forged",
    description: "The ultimate beekeeper's multipurpose instrument. Features a precision J-hook end for lifting heavy propolis-glued honey frames without damaging comb, and a chisel scraper.",
    longDescription: "Forged from tempered spring carbon steel and coated in gold titanium nitride for corrosion and wear resistance. The curved J-notch leverages against adjacent frames to pop propolis-locked frame lugs effortlessly without comb tearing.",
    details: [
      "High-carbon spring steel with titanium nitride coat",
      "Leverage-optimized J-curve for frame lifting",
      "Sharpened beveled edge for scraping wax/propolis",
      "Ergonomic handle grip with nail-puller slot"
    ],
    materials: "Titanium Coated Spring Carbon Steel",
    imageUrl: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviewsCount: 130,
    inStock: true,
    sku: "AV-TOOL-JH",
    weight: "220g",
    dimensions: "26.5cm length"
  },
  {
    id: "AV-BEE-BOX",
    name: "Western Red Cedar 10-Frame Langstroth Deep Box",
    subtitle: "Precision Dovetail Brood Chamber",
    department: "beekeeping",
    subcategory: "bee-hardware",
    price: 89.00,
    badge: "Cedar Wood",
    description: "Milled from naturally rot-resistant Western Red Cedar with precision dovetail joinery. Provides thermal insulation in winter and breathability in summer, requiring no chemical paint.",
    longDescription: "Western Red Cedar is celebrated worldwide for its high concentration of natural thujaplicins, making it virtually impervious to moisture decay and wood-boring insects. CNC cut with snug interlocking finger joints for decades of field durability.",
    details: [
      "Natural rot- & pest-resistant Western Red Cedar",
      "Precision CNC interlocking dovetail corners",
      "Pre-drilled screw holes with exterior hardware",
      "Standard 10-frame Langstroth dimensions"
    ],
    materials: "Western Red Cedar Timber, Stainless Screws",
    imageUrl: "https://images.unsplash.com/photo-1527334919515-b8dee906a34b?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 76,
    inStock: true,
    sku: "AV-BOX-CEDAR",
    weight: "4.2 kg",
    dimensions: "50.5cm x 41.3cm x 24.5cm"
  },
  {
    id: "AV-BEE-FRAMES",
    name: "Pine Frames & Organic Wax Foundations (10pk)",
    subtitle: "Deep 9-1/8 Inch Pre-Wired Assembly",
    department: "beekeeping",
    subcategory: "bee-hardware",
    price: 58.00,
    badge: "Natural Wax",
    description: "Pack of 10 select grade pine frames fitted with 100% pure organic beeswax textured foundation sheets. Gives bees a pristine geometric guide to quickly draw out honey combs.",
    longDescription: "Includes 10 unassembled or pre-assembled Langstroth deep frames crafted from knot-free pine. Sheets are embossed with 5.4mm worker cell patterns and dipped in pure apiary beeswax, ensuring fast acceptance by worker bees.",
    details: [
      "Knot-free New Zealand Pine wood frames",
      "100% natural organic beeswax foundation sheets",
      "Hexagonal cell imprint accepted immediately by bees",
      "Precision grooved top and bottom bars"
    ],
    materials: "Natural Pine Wood, 100% Organic Beeswax",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviewsCount: 95,
    inStock: true,
    sku: "AV-FRM-10PK",
    weight: "2.1 kg",
    dimensions: "48.2cm x 23.2cm"
  },
  {
    id: "AV-ACC-WAND",
    name: "Avenoir Turned Brass Tasting Wand",
    subtitle: "Solid Antimicrobial Dipper",
    department: "beekeeping",
    subcategory: "bee-harvest",
    price: 38.00,
    badge: "Solid Brass",
    description: "Solid C360 architectural brass, lathe-turned with concentric collection grooves designed to capture and slowly dispense raw honey without aeration.",
    longDescription: "Lathe-turned from solid lead-free C360 brass bars. The weight of the metal in the hand offers an elevated sensory experience. Naturally antimicrobial, food-safe, and stamped with the Avenoir atelier hallmark.",
    details: [
      "Heavyweight solid brass (220 grams)",
      "Engineered laminar flow dispensing grooves",
      "Antimicrobial & food-safe certified alloy",
      "Stamped with Avenoir atelier mark"
    ],
    materials: "Solid C360 Architectural Brass",
    finishes: ["Brushed Satin Brass", "Mirror Polished"],
    imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 160,
    inStock: true,
    sku: "AV-WAND-BRS",
    weight: "220g",
    dimensions: "16cm length"
  },
  {
    id: "AV-BEE-UNCAP",
    name: "Ergonomic Honeycomb Uncapping Roller & Fork Kit",
    subtitle: "Clean Harvest Extraction Instruments",
    department: "beekeeping",
    subcategory: "bee-harvest",
    price: 32.00,
    badge: "Harvest Gear",
    description: "Dual-piece honey harvest set including a stainless needle roller to puncture wax cappings without destroying comb structure, and an angled scratcher fork for low spots.",
    longDescription: "Carefully puncture honey cell cappings prior to centrifugal extraction. By rolling over frames rather than shaving with a hot knife, you leave the comb cell walls intact, allowing bees to refill the frames immediately during the next nectar flow.",
    details: [
      "Stainless steel prickle roller with comfort grip",
      "18-tine curved stainless uncapping scratcher fork",
      "Preserves comb foundation for bees to reuse",
      "Dishwasher safe, food-grade construction"
    ],
    materials: "Food-Grade Stainless Steel, Ergonomic Polymer",
    imageUrl: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 72,
    inStock: true,
    sku: "AV-UNCAP-KIT",
    weight: "340g",
    dimensions: "Roller: 25cm, Fork: 20cm"
  }
];

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByDepartment(department: Department): ProductItem[] {
  return PRODUCTS.filter(p => p.department === department);
}

export function getProductsBySubcategory(subcategory: Subcategory): ProductItem[] {
  return PRODUCTS.filter(p => p.subcategory === subcategory);
}

export function getRelatedProducts(product: ProductItem, limit: number = 3): ProductItem[] {
  return PRODUCTS
    .filter(p => p.id !== product.id && p.department === product.department)
    .slice(0, limit);
}

export interface TerroirZone {
  id: string;
  name: string;
  season: string;
  notes: string;
  moisture: string;
  elevation: string;
  description: string;
  colorHex: string;
  dominantFlora: string[];
}

export const TERROIR_ZONES: TerroirZone[] = [
  {
    id: "deciduous",
    name: "Deciduous Mountain Ridge",
    season: "Late Summer (August)",
    notes: "Wild pine resin, dark buckwheat malt, rich mineral earth",
    moisture: "16.2% (Extremely dense)",
    elevation: "1,200 - 1,450 ft",
    description: "Harvested along the Appalachian foothills in Sussex County where bees gather honeydew and late forest blooms.",
    colorHex: "#78350F",
    dominantFlora: ["White Pine Honeydew", "Kittatinny Hemlock", "Goldenrod", "Wild Aster"]
  },
  {
    id: "meadow",
    name: "Skylands Pasture & Orchard",
    season: "High Summer (July)",
    notes: "Sunlit clover, wild pear nectar, subtle vanilla butter",
    moisture: "17.1% (Silky fluidity)",
    elevation: "850 - 1,100 ft",
    description: "Sun-drenched conservation pastures brimming with heirloom red clover, organic orchard blossoms, and sweet briar.",
    colorHex: "#D97706",
    dominantFlora: ["Sweet White Clover", "Orchard Blossom", "Wild Rose", "Elderflower"]
  },
  {
    id: "pinebarrens",
    name: "Pine Barrens Wild Heath",
    season: "Early Spring (May)",
    notes: "Tart wild blueberry blossom, cranberry heath, gentle citrus",
    moisture: "16.8% (Crystalline amber)",
    elevation: "300 - 550 ft",
    description: "Unique acidic sandy soils nurturing lowbush blueberry barrens and native bog cranberries.",
    colorHex: "#B45309",
    dominantFlora: ["Highbush Blueberry", "Wild Cranberry", "Pitch Pine Pollen", "Sweet Fern"]
  },
  {
    id: "wetlands",
    name: "Delaware River Basin",
    season: "Autumn Canopy (September)",
    notes: "Caramelized black locust, dark knotweed, smoky molasses",
    moisture: "16.5% (Velvet body)",
    elevation: "400 - 650 ft",
    description: "Riparian floodplains flourishing with late fall nectar flows before winter hive winterization.",
    colorHex: "#92400E",
    dominantFlora: ["Japanese Knotweed", "Black Locust", "Purple Loosestrife", "Marsh Mallow"]
  }
];

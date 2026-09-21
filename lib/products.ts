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
    name: "The Honeyed Host Gift Trunk",
    subtitle: "Heirloom American Walnut Presentation Box",
    department: "honey",
    subcategory: "honey-vaults",
    price: 185.00,
    badge: "Executive Gift",
    description: "Solid American Black Walnut trunk hand-buffed with pure beeswax. Houses our New Jersey Wildflower Honey alongside seasonal reserve jars, lathe-turned brass tasting wand, and custom pairing notes.",
    longDescription: "Handcrafted by master cabinetmakers in New Jersey using sustainably harvested American Black Walnut. Each gift trunk features hand-cut box joints, solid brass quadrant hinges, and a recessed emerald velvet interior engineered to cradle three reserve honey jars. Finished exclusively with our apiary's own pure filtered beeswax and cold-pressed organic walnut oil.",
    details: [
      "Solid American Black Walnut joinery",
      "Includes 3x Seasonal Reserve Jars (Spring Blossom, Wildflower, Autumn Aster)",
      "Lathe-turned solid C360 brass tasting wand included",
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
    name: "The Seasonal Harvest Trio",
    subtitle: "Three Full-Size Seasonal Reserve Jars",
    department: "honey",
    subcategory: "honey-vaults",
    price: 72.00,
    badge: "Seasonal Trio",
    description: "Experience the full arc of the New Jersey season. Three full-size jars showcasing early spring orchard blooms, late summer wildflowers, and golden autumn aster.",
    longDescription: "Sourced from small-run seasonal harvests across our New Jersey apiaries. Contains three full-size jars capturing the distinct flora of each season: Spring Orchard Blossom, Late Summer Wildflower, and Golden Autumn Aster. Accompanied by a bespoke pairing guide and harvest certificate.",
    details: [
      "Three 12 oz (340g) full-size seasonal harvest jars",
      "Spring Blossom, Late Summer Wildflower & Autumn Aster",
      "Raw, unheated, and traceable by batch",
      "Gift-ready presentation carton with seasonal pairing notes"
    ],
    materials: "French Flint Glass, Gift Presentation Box",
    finishes: ["Gift Box Ready", "Signature Ribbon Tied"],
    imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 94,
    inStock: true,
    sku: "AV-MC-02",
    weight: "1.8 kg",
    dimensions: "28cm x 16cm x 11cm"
  },
  {
    id: "AV-JAR-MINI",
    name: "New Jersey Wildflower Honey (4 oz Mini)",
    subtitle: "Trial & Gift Add-On · Late Summer Harvest",
    department: "honey",
    subcategory: "honey-raw",
    price: 14.00,
    badge: "Trial / Add-On",
    description: "Our signature New Jersey Wildflower Honey in an accessible 4 oz pocket jar. Perfect for sampling, travel, or tucking into a gift box.",
    longDescription: "Raw, unheated, and bottled by hand in small batches from our New Jersey hives. The ideal introductory size to taste the late summer meadow forage of Sussex and Morris counties.",
    details: [
      "Compact 4 oz (113g) glass pocket jar",
      "Raw & minimally handled to protect living enzymes",
      "Traceable back to New Jersey apiaries via Hive Passport",
      "Ideal companion for cheese plates, travel, or gift sets"
    ],
    materials: "French Flint Glass, Gold Metal Cap, Hive Passport QR Label",
    imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    sku: "AV-J-MINI4",
    weight: "4 oz (113g) net honey",
    dimensions: "7cm tall x 5.5cm dia"
  },
  {
    id: "AV-JAR-APOTH",
    name: "New Jersey Wildflower Honey",
    subtitle: "Late Summer Harvest · Batch NJ-26-08 (12 oz)",
    department: "honey",
    subcategory: "honey-raw",
    price: 24.00,
    badge: "Flagship Harvest",
    description: "Small-batch honey harvested from our New Jersey hives, bottled with the story of the season still inside. Tasting notes: Wildflower, warm caramel, and meadow bloom.",
    longDescription: "Raw, unheated, and bottled by hand in small batches from our New Jersey hives. Every jar carries a Hive Passport QR code on the back label, allowing you to trace the floral forage, harvest date, and season. Never blended, ultra-filtered, or micro-cooked. Best paired with tea, cheese boards, morning toast, and roasted carrots.",
    details: [
      "Raw & minimally handled to protect living enzymes",
      "Traceable back to New Jersey apiaries via Hive Passport",
      "Tasting notes: Wildflower, warm caramel, meadow bloom",
      "Best with tea, cheese boards, morning toast, and roasted carrots"
    ],
    materials: "French Flint Glass, Metal Lid, Hive Passport QR Label",
    imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 215,
    inStock: true,
    sku: "AV-J-NJWILD",
    weight: "12 oz (340g) net honey",
    dimensions: "12cm tall x 7.5cm dia"
  },
  {
    id: "AV-JAR-PANTRY",
    name: "New Jersey Wildflower Honey (16 oz Pantry)",
    subtitle: "Everyday 1 lb Family Pantry Reserve",
    department: "honey",
    subcategory: "honey-raw",
    price: 34.00,
    badge: "Pantry Value",
    description: "Our flagship New Jersey Wildflower Honey in a generous 16 oz pantry jar for everyday culinary rituals, morning tea, and family tables.",
    longDescription: "Small-batch raw honey in a generous 1 lb jar. Best for households that use raw honey daily in morning oatmeal, matcha, marinades, and baking without compromising on seasonal provenance.",
    details: [
      "Generous 16 oz (454g / 1 lb) family pantry jar",
      "Raw, unheated, and traceable by batch",
      "Rich notes of wildflower, warm caramel, and meadow bloom",
      "Re-sealable heavy glass jar with pour-friendly mouth"
    ],
    materials: "Flint Glass Pantry Jar, Metal Screw Lid",
    imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 118,
    inStock: true,
    sku: "AV-J-PANTRY16",
    weight: "16 oz (454g) net honey",
    dimensions: "14cm tall x 8.5cm dia"
  },
  {
    id: "AV-BOX-GIFT",
    name: "The Honeyed Host Gift Box",
    subtitle: "Curated Honey, Brass Dipper & Pairing Notes",
    department: "honey",
    subcategory: "honey-vaults",
    price: 64.00,
    badge: "Gift Box",
    description: "Our signature 12 oz New Jersey Wildflower Honey, solid brass tasting wand, and seasonal pairing notes nestled in gift-ready linen presentation casing.",
    longDescription: "Designed for hostesses, housewarmings, client appreciation, and holiday tables. Includes a full 12 oz jar of Late Summer Wildflower Honey, our lathe-turned brass honey wand, and a printed New Jersey Honey Pairing Guide.",
    details: [
      "1x 12 oz New Jersey Wildflower Honey (Batch NJ-26-08)",
      "1x Lathe-turned solid C360 brass honey dipper",
      "Printed New Jersey Honey & Cheese Pairing Guide",
      "Rigid gift box tied with cotton twill ribbon and gift tag"
    ],
    materials: "Textured Gift Box, Flint Glass, C360 Brass",
    finishes: ["Linen Cream Box", "Forest Green Ribbon"],
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviewsCount: 82,
    inStock: true,
    sku: "AV-BOX-HOST64",
    weight: "1.2 kg (packed)",
    dimensions: "24cm x 16cm x 9cm"
  },
  {
    id: "AV-CANDLE-TAPER",
    name: "Hand-Rolled Pure Beeswax Taper Candles",
    subtitle: "Pair of 100% Raw Apiary Beeswax Tapers",
    department: "honey",
    subcategory: "honey-vaults",
    price: 22.00,
    badge: "Apiary Craft",
    description: "Hand-rolled from 100% pure filtered apiary beeswax sheets with unbleached cotton wicks. Naturally purifies the air with a gentle honeyed aroma.",
    longDescription: "Crafted by hand in our New Jersey honey house using pure virgin beeswax harvested from our honey supers. Releases a subtle, natural scent of warm honey and wildflowers as it burns cleanly without soot or paraffin toxins.",
    details: [
      "Pair of two 10-inch hand-rolled tapers",
      "100% pure natural New Jersey apiary beeswax",
      "Lead-free unbleached cotton braided wicks",
      "Clean burn time: approximately 8-10 hours per candle"
    ],
    materials: "100% Pure Organic Beeswax, Cotton Wick",
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 53,
    inStock: true,
    sku: "AV-CNDL-TAP2",
    weight: "180g (pair)",
    dimensions: "25cm length x 2.2cm base"
  },
  {
    id: "AV-JAR-SKYLAND",
    name: "High Skylands Wildflower Jar",
    subtitle: "450g High-Elevation Mountain Nectar",
    department: "honey",
    subcategory: "honey-raw",
    price: 38.00,
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
    name: "The First Taste Sampler",
    subtitle: "3-Jar Seasonal Tasting Flight (3x 4 oz)",
    department: "honey",
    subcategory: "honey-comb",
    price: 48.00,
    badge: "Tasting Flight",
    description: "A curated flight of three distinct seasonal New Jersey harvests: Spring Blossom, Summer Wildflower, and Autumn Aster. Includes wooden tasting spoon and pairing notes.",
    longDescription: "Presented in three elegant tasting jars nestled in a textured gift box. Allows you to experience the natural shifts in New Jersey floral forage from April apple orchards to August clover and September goldenrod asters.",
    details: [
      "3x 4 oz seasonal reserve jars (Spring, Summer, Autumn)",
      "Includes FSC wooden tasting spoon & pairing card",
      "Raw, unheated, and traceable by batch",
      "Arrives in gift-ready presentation box"
    ],
    materials: "Glass Jars, FSC Tasting Spoon, Embossed Gift Box",
    imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviewsCount: 87,
    inStock: true,
    sku: "AV-SET-HEX2",
    weight: "3x 4 oz (340g total)",
    dimensions: "20cm x 8cm x 10cm"
  },
  {
    id: "AV-COMB-SLAB",
    name: "Artisan Cut Honeycomb Frame Slab",
    subtitle: "340g Pure 100% Edible Raw Comb",
    department: "honey",
    subcategory: "honey-comb",
    price: 54.00,
    badge: "Raw Comb",
    description: "Straight from the hive wooden frame: raw hexagon beeswax cells filled with capped seasonal nectar. Pairs with warm sourdough, aged cheeses, or savored directly from the comb.",
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
    name: "Maison Avenoir Turned Brass Tasting Wand",
    subtitle: "Solid Lead-Free Brass Honey Dipper",
    department: "beekeeping",
    subcategory: "bee-harvest",
    price: 38.00,
    badge: "Solid Brass",
    description: "Solid C360 architectural brass, lathe-turned with concentric collection grooves designed to capture and slowly dispense raw honey without aeration.",
    longDescription: "Lathe-turned from solid lead-free C360 brass bars. The weight of the metal in the hand offers an elevated sensory experience. Naturally food-safe and stamped with the Maison Avenoir hallmark.",
    details: [
      "Heavyweight solid brass (220 grams)",
      "Engineered laminar flow dispensing grooves",
      "Food-safe certified alloy",
      "Stamped with Maison Avenoir hallmark"
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

// ==========================================
// 3. GIFTING & BOX BUILDER DATASETS
// ==========================================

export interface GiftBoxTier {
  id: '3-jar' | '6-jar' | '12-jar';
  name: string;
  capacity: number;
  regularPrice: number;
  bundlePrice: number;
  discountPercent: number;
  perJarPrice: number;
  badge?: string;
  isPopular?: boolean;
  freeShipping: boolean;
  description: string;
  includedPackaging: string;
}

export const GIFT_BOX_TIERS: GiftBoxTier[] = [
  {
    id: '3-jar',
    name: '3-Jar Tasting Stack',
    capacity: 3,
    regularPrice: 72.00,
    bundlePrice: 64.00,
    discountPercent: 11,
    perJarPrice: 21.33,
    badge: 'Tasting Trio',
    freeShipping: false,
    description: 'Perfect for intimate gifting, hostess appreciation, or tasting seasonal pairings.',
    includedPackaging: 'Signature Linen Textured Presentation Box with Forest Ribbon'
  },
  {
    id: '6-jar',
    name: '6-Jar Connoisseur Box',
    capacity: 6,
    regularPrice: 144.00,
    bundlePrice: 115.00,
    discountPercent: 20,
    perJarPrice: 19.16,
    badge: 'Most Popular',
    isPopular: true,
    freeShipping: true,
    description: 'Our signature gifting collection. Mix & match reserve raw honeys, whips, and botanical infusions.',
    includedPackaging: 'Luxury Rigid Drawer Box with Embossed Gold Seal + Dipper'
  },
  {
    id: '12-jar',
    name: '12-Jar Grand Reserve Cellar',
    capacity: 12,
    regularPrice: 288.00,
    bundlePrice: 216.00,
    discountPercent: 25,
    perJarPrice: 18.00,
    badge: 'Best Value',
    freeShipping: true,
    description: 'The ultimate cellar collection. Stock the culinary pantry or send an unforgettable statement gift.',
    includedPackaging: 'Master Apiary Dual Tier Presentation Casing + Tasting Wand'
  }
];

export interface BoxFlavorItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'raw' | 'creamed' | 'infused' | 'botanical';
  categoryLabel: string;
  tastingNotes: string[];
  description: string;
  imageUrl: string;
  badge?: string;
  netWeight: string;
  bestPairedWith: string;
}

export const BOX_FLAVORS: BoxFlavorItem[] = [
  {
    id: 'AV-JAR-APOTH',
    name: 'New Jersey Wildflower Honey',
    subtitle: 'Late Summer Harvest · Batch NJ-26-08',
    category: 'raw',
    categoryLabel: 'Raw & Terroir',
    tastingNotes: ['Wild meadow bloom', 'Warm caramel', 'Sunlit clover'],
    description: 'Our flagship raw wildflower honey harvested cold and unfiltered from New Jersey apiaries.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800',
    badge: 'Flagship Raw',
    netWeight: '12 oz (340g)',
    bestPairedWith: 'Morning sourdough, goat cheese, Earl Grey'
  },
  {
    id: 'AV-JAR-SKYLAND',
    name: 'High Skylands Mountain Nectar',
    subtitle: 'High-Elevation Ridge Micro-Batch',
    category: 'raw',
    categoryLabel: 'Raw & Terroir',
    tastingNotes: ['Elderflower', 'Summer pear', 'Soft mineral peach'],
    description: 'Collected at 1,400 feet elevation along Sussex County ridges with notes of mountain pear.',
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=800',
    badge: 'Single Apiary',
    netWeight: '12 oz (340g)',
    bestPairedWith: 'Triple crème brie, crisp green apples, matcha'
  },
  {
    id: 'AV-INF-VANILLA',
    name: 'Bourbon Vanilla Whipped Honey',
    subtitle: '72-Hour Micro-Spun Creamed Silk',
    category: 'creamed',
    categoryLabel: 'Whipped & Creamed',
    tastingNotes: ['Madagascar Bourbon vanilla', 'Buttery silk', 'Sweet cream'],
    description: 'Slowly micro-spun at cellar temperature and folded with whole Madagascar vanilla bean caviar.',
    imageUrl: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800',
    badge: 'Customer Favorite',
    netWeight: '10 oz (285g)',
    bestPairedWith: 'Warm croissants, waffles, espresso, Greek yogurt'
  },
  {
    id: 'AV-INF-LAVENDER',
    name: 'Wild French Lavender Honey',
    subtitle: 'Botanical Steeped Reserve',
    category: 'botanical',
    categoryLabel: 'Botanical & Floral',
    tastingNotes: ['Provence lavender', 'Ethereal floral', 'Subtle citrus mint'],
    description: 'Sun-drenched clover honey gently steeped with organic Provence lavender blossoms.',
    imageUrl: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&q=80&w=800',
    badge: 'Botanical Calm',
    netWeight: '11 oz (310g)',
    bestPairedWith: 'Chamomile tea, lemon ricotta pancakes, vanilla ice cream'
  },
  {
    id: 'AV-INF-CHIPOTLE',
    name: 'Smoked Chipotle & Hot Chili Honey',
    subtitle: 'Artisan Heat & Woodsmoke Infusion',
    category: 'infused',
    categoryLabel: 'Artisan Infusions',
    tastingNotes: ['Mesquite smoke', 'Vibrant habanero glow', 'Caramel sweetness'],
    description: 'Slow-steeped with woodsmoked chipotle peppers and red chilies for a luxurious hot-honey balance.',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
    badge: 'Sweet & Heat',
    netWeight: '12 oz (340g)',
    bestPairedWith: 'Wood-fired pepperoni pizza, fried chicken, aged cheddar'
  },
  {
    id: 'AV-INF-ESPRESSO',
    name: 'Dark Roast Salted Espresso Honey',
    subtitle: 'Single-Origin Cold Brew Steep',
    category: 'creamed',
    categoryLabel: 'Whipped & Creamed',
    tastingNotes: ['Artisan espresso', 'Dark cocoa nibs', 'Flaky Maldon salt'],
    description: 'Rich whipped raw honey infused with coarse-ground single-origin roast coffee and sea salt.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    badge: 'Morning Ritual',
    netWeight: '10 oz (285g)',
    bestPairedWith: 'Oatmeal, cappuccino foam, tiramisu drizzle, toasted brioche'
  },
  {
    id: 'AV-RAW-BLUEBERRY',
    name: 'Pine Barrens Blueberry Blossom',
    subtitle: 'Spring May Harvest · South Jersey Barrens',
    category: 'raw',
    categoryLabel: 'Raw & Terroir',
    tastingNotes: ['Tart wild berry', 'Warm molasses', 'Citrus blossom finish'],
    description: 'Dark amber nectar harvested when hives pollinate heirloom highbush blueberry fields.',
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80&w=800',
    badge: 'Rare Harvest',
    netWeight: '12 oz (340g)',
    bestPairedWith: 'Pork tenderloin glazes, sheep milk cheeses, yogurt bowls'
  },
  {
    id: 'AV-INF-LEMON-THYME',
    name: 'Meyer Lemon & Garden Thyme Honey',
    subtitle: 'Sun-Infused Mediterranean Botanical',
    category: 'botanical',
    categoryLabel: 'Botanical & Floral',
    tastingNotes: ['Meyer lemon zest', 'Herbal crushed thyme', 'Bright floral acidity'],
    description: 'Infused with organic sun-dried Meyer lemon peel and hand-harvested aromatic garden thyme.',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=800',
    badge: 'Bright & Crisp',
    netWeight: '11 oz (310g)',
    bestPairedWith: 'Green teas, roasted root vegetables, burrata & peaches'
  },
  {
    id: 'AV-RAW-BLOSSOM',
    name: 'Spring Orchard Apple Blossom',
    subtitle: 'April First-Flow · Hunterdon County',
    category: 'raw',
    categoryLabel: 'Raw & Terroir',
    tastingNotes: ['Crisp apple blossom', 'Delicate clover', 'Silky butterscotch'],
    description: 'The first golden honey of spring, gathered as hundreds of apple trees bloom across New Jersey hills.',
    imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800',
    badge: 'First Flow',
    netWeight: '12 oz (340g)',
    bestPairedWith: 'Granola parfaits, white teas, mascarpone pastries'
  },
  {
    id: 'AV-INF-CINNAMON',
    name: 'Ceylon Cinnamon Whipped Honey',
    subtitle: 'Cold-Whipped True Cinnamon Silk',
    category: 'creamed',
    categoryLabel: 'Whipped & Creamed',
    tastingNotes: ['Sri Lankan Ceylon cinnamon', 'Warm holiday spice', 'Honey butter'],
    description: 'Whipped raw honey paired with delicate sweet organic Ceylon cinnamon bark powder.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    badge: 'Warm & Cozy',
    netWeight: '10 oz (285g)',
    bestPairedWith: 'Warm toast, baked apples, chai lattes, oatmeal'
  },
  {
    id: 'AV-RAW-BASSWOOD',
    name: 'Basswood Mint Blossom Reserve',
    subtitle: 'Water-White Rare Forest Canopy',
    category: 'raw',
    categoryLabel: 'Raw & Terroir',
    tastingNotes: ['Menthol herbal cooling', 'Linden tree blossoms', 'Clean citrus'],
    description: 'Exceptionally light and rare nectar from towering American basswood trees with a refreshing herbal finish.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800',
    badge: 'Rare Forage',
    netWeight: '12 oz (340g)',
    bestPairedWith: 'Mint and jasmine teas, fruit tarts, mild goat cheese'
  },
  {
    id: 'AV-INF-GINGER',
    name: 'Wild Ginger & Raw Turmeric Honey',
    subtitle: 'Golden Wellness Botanical Elixir',
    category: 'botanical',
    categoryLabel: 'Botanical & Floral',
    tastingNotes: ['Spicy ginger root', 'Earthy golden turmeric', 'Citrus warmth'],
    description: 'Formulated with organic ginger juice and raw turmeric root for daily immune and digestive vitality.',
    imageUrl: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&q=80&w=800',
    badge: 'Vitality Tonic',
    netWeight: '11 oz (310g)',
    bestPairedWith: 'Hot lemon water, spiced golden milk, wellness tonics'
  }
];

export interface CuratedBundle {
  id: string;
  name: string;
  subtitle: string;
  tierId: '3-jar' | '6-jar' | '12-jar';
  tierLabel: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  badge: string;
  description: string;
  imageUrl: string;
  itemIds: string[];
  includedAddons?: string[];
  highlights: string[];
}

export const CURATED_BUNDLES: CuratedBundle[] = [
  {
    id: 'bundle-three-jars-story',
    name: '“Three Jars, One Harvest Story” Sampler',
    subtitle: 'Subscriber Launch Flight • Spring, Summer & Autumn',
    tierId: '3-jar',
    tierLabel: '3-Jar Launch Sampler',
    price: 64.00,
    originalPrice: 72.00,
    discountPercent: 11,
    badge: 'Subscriber Exclusive',
    description: 'Available exclusively for launch week: three single-harvest varietals tracing the seasonal bloom from May ridge blossoms to late-autumn mountain nectar. Includes hand-bound harvest story card and embossed tasting notes.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=800',
    itemIds: ['AV-RAW-BLOSSOM', 'AV-JAR-APOTH', 'AV-JAR-SKYLAND'],
    includedAddons: ['Terroir Harvest Story Folio', 'Wax-Sealed Botanical Tasting Card'],
    highlights: [
      'Available only to email subscribers for launch week',
      'Three single-harvest terroir jars (12 oz each)',
      'Complimentary wax-sealed tasting card & seasonal recipe included'
    ]
  },
  {
    id: 'bundle-harvest-trio',
    name: 'The Seasonal Harvest Trio',
    subtitle: 'Three Full-Size Signature Terroirs',
    tierId: '3-jar',
    tierLabel: '3-Jar Gift Set',
    price: 64.00,
    originalPrice: 72.00,
    discountPercent: 11,
    badge: 'Bestseller',
    description: 'Experience the full seasonal arc of New Jersey apiaries: Spring Orchard Blossom, Late Summer Wildflower, and High Skylands Nectar.',
    imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800',
    itemIds: ['AV-RAW-BLOSSOM', 'AV-JAR-APOTH', 'AV-JAR-SKYLAND'],
    highlights: ['Includes 3x 12 oz Raw Reserve Jars', 'Linen Presentation Gift Box Included', 'Numbered Hive Passport Harvest Cards']
  },
  {
    id: 'bundle-sweet-heat',
    name: 'The Chef’s Sweet & Heat Flight',
    subtitle: 'Culinary Pairings for Cheese, Pizza & Brunch',
    tierId: '3-jar',
    tierLabel: '3-Jar Gift Set',
    price: 64.00,
    originalPrice: 74.00,
    discountPercent: 13,
    badge: 'Artisan Pairing',
    description: 'Curated for discerning home chefs: Smoked Chipotle Hot Honey, Bourbon Vanilla Whipped, and New Jersey Wildflower Honey.',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
    itemIds: ['AV-INF-CHIPOTLE', 'AV-INF-VANILLA', 'AV-JAR-APOTH'],
    includedAddons: ['Lathe-Turned FSC Beechwood Dipper'],
    highlights: ['Pair with sourdough, pizza & charcuterie', 'Beechwood Tasting Dipper Included', 'Chef Pairing Guide Insert']
  },
  {
    id: 'bundle-tea-botanical',
    name: 'The Botanical Tea Sanctuary',
    subtitle: 'Herbal Infusions & Soothing Nectars',
    tierId: '3-jar',
    tierLabel: '3-Jar Gift Set',
    price: 64.00,
    originalPrice: 76.00,
    discountPercent: 15,
    badge: 'Wellness & Calm',
    description: 'Crafted for tea lovers and evening rituals: Wild French Lavender Honey, Meyer Lemon & Thyme, and Basswood Mint Blossom.',
    imageUrl: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&q=80&w=800',
    itemIds: ['AV-INF-LAVENDER', 'AV-INF-LEMON-THYME', 'AV-RAW-BASSWOOD'],
    highlights: ['Ideal companion for Earl Grey, green tea & chamomile', 'Organic botanicals steeped cold', 'Satin gift ribbon tied by hand']
  },
  {
    id: 'bundle-connoisseur-6',
    name: 'The Master Connoisseur 6-Pack',
    subtitle: 'The Definitive Maison Avenoir Tasting Flight',
    tierId: '6-jar',
    tierLabel: '6-Jar Luxury Box',
    price: 115.00,
    originalPrice: 144.00,
    discountPercent: 20,
    badge: 'Most Popular Gift',
    description: 'Our most sought-after gift set. Features 6 distinct profiles spanning raw mountain nectars, creamed silks, and botanical infusions.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    itemIds: [
      'AV-JAR-APOTH',
      'AV-JAR-SKYLAND',
      'AV-INF-VANILLA',
      'AV-INF-LAVENDER',
      'AV-INF-CHIPOTLE',
      'AV-RAW-BLUEBERRY'
    ],
    includedAddons: ['Lathe-Turned Brass Tasting Wand', 'Personalized Calligraphy Gift Card'],
    highlights: [
      'Free Express Courier Shipping included',
      'Solid Brass Tasting Wand included',
      'Luxury sliding gift chest with gold foil seal',
      'Full 6-jar seasonal variety'
    ]
  },
  {
    id: 'bundle-grand-cellar-12',
    name: 'The Grand Apiary Cellar (12-Jar Hamper)',
    subtitle: 'The Ultimate Heirloom Honey Vault',
    tierId: '12-jar',
    tierLabel: '12-Jar Master Collection',
    price: 216.00,
    originalPrice: 288.00,
    discountPercent: 25,
    badge: 'Grand Reserve',
    description: 'The complete harvest collection. All 12 artisan varietals delivered in dual presentation casing with pairing notes and tasting tools.',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    itemIds: [
      'AV-JAR-APOTH',
      'AV-JAR-SKYLAND',
      'AV-INF-VANILLA',
      'AV-INF-LAVENDER',
      'AV-INF-CHIPOTLE',
      'AV-INF-ESPRESSO',
      'AV-RAW-BLUEBERRY',
      'AV-INF-LEMON-THYME',
      'AV-RAW-BLOSSOM',
      'AV-INF-CINNAMON',
      'AV-RAW-BASSWOOD',
      'AV-INF-GINGER'
    ],
    includedAddons: ['Brass Tasting Wand', 'Pair of Hand-Rolled Beeswax Tapers', 'Heirloom Wax Seal Certificate'],
    highlights: [
      'Save 25% ($72 total savings)',
      'Free Courier Shipping',
      'Includes Pair of Apiary Beeswax Tapers',
      'Full master catalog of every Maison Avenoir honey'
    ]
  }
];

export interface PackagingOption {
  id: 'linen' | 'walnut';
  name: string;
  tagline: string;
  priceDelta: number;
  imageUrl: string;
  description: string;
}

export const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: 'linen',
    name: 'Signature Cream Linen Gift Box',
    tagline: 'Complimentary with all bundles',
    priceDelta: 0,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    description: 'Rigid board box crafted from recycled cotton-linen fiber, stamped with gold-foil emblem and tied with forest twill ribbon.'
  },
  {
    id: 'walnut',
    name: 'Heirloom Solid American Walnut Chest',
    tagline: 'Artisan hand-buffed keepsake',
    priceDelta: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
    description: 'Handcrafted solid Black Walnut joinery buffed with raw beeswax and finished with solid brass hinges and recessed emerald velvet.'
  }
];


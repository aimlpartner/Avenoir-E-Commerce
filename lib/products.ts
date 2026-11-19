export type ProductCategory = 'jars' | 'gifts' | 'kids' | 'corporate' | 'subscription';

export interface ProductVariant {
  id: string;
  label: string;
  shortLabel: string;
  price: number;
  weight: string;
  badge?: string;
  imageUrl?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  isMainProduct: boolean;
  isSubscription?: boolean;
  price: number;
  maxPrice?: number;
  description: string;
  details: string[];
  variants: ProductVariant[];
  imageUrl: string;
  imagePosition?: string;
  galleryImages?: string[];
  inStock: boolean;
  allowsCustomNote?: boolean;
  customNoteLabel?: string;
  customNotePlaceholder?: string;
}

export interface CategoryMeta {
  id: ProductCategory | 'all';
  label: string;
}

export const PRODUCT_CATEGORIES: CategoryMeta[] = [
  { id: 'all', label: 'All Products' },
  { id: 'jars', label: 'Jars & Combos' },
  { id: 'gifts', label: 'Holiday & Favors' },
  { id: 'kids', label: 'Kids Bottles' },
  { id: 'corporate', label: 'Corporate Glass' },
  { id: 'subscription', label: 'Monthly Club' },
];

export const PRODUCTS: ProductItem[] = [
  // =========================================================================
  // MAIN 4 PRODUCTS (1 Jar, 3-Jar Combo, Gift Box, Members Monthly Subscription)
  // =========================================================================
  {
    id: 'SB-JAR-SINGLE',
    name: 'Raw Wildflower Honey Jar',
    shortName: '1 Jar',
    subtitle: '1/2 lb (8 oz) & 1 lb (16 oz)',
    category: 'jars',
    categoryLabel: 'Single Jar',
    isMainProduct: true,
    price: 14.0,
    maxPrice: 24.0,
    description:
      'Pure, raw wildflower honey made from neighborhood flowers at Madisonville Apiary in Basking Ridge, NJ. Unheated, unfiltered, and bottled in small batches.',
    details: [
      'Available in 1/2 lb (8 oz) and 1 lb (16 oz) glass jar or corked glass bottle',
      'Raw, unheated, and minimally strained to preserve natural enzymes',
      'Single-apiary harvest from Madisonville Apiary, Basking Ridge, NJ',
      'Great for daily tea, toast, yogurt, baking, and cheese boards',
    ],
    variants: [
      {
        id: 'half-lb',
        label: '1/2 lb Jar (8 oz)',
        shortLabel: '1/2 lb',
        price: 14.0,
        weight: '8 oz (1/2 lb) net wt',
        imageUrl: '/media/products/beeproduct_0.5lbs.jpeg',
      },
      {
        id: 'one-lb',
        label: '1 lb Jar (16 oz)',
        shortLabel: '1 lb',
        price: 24.0,
        weight: '16 oz (1 lb) net wt',
        badge: 'Most Popular',
        imageUrl: '/media/products/beeproduct_1lbs.jpeg',
      },
    ],
    imageUrl: '/media/products/beeproduct_1lbs.jpeg',
    imagePosition: 'object-[50%_72%]',
    galleryImages: [
      '/media/products/beeproduct_1lbs.jpeg',
      '/media/products/beeproduct_0.5lbs.jpeg',
    ],
    inStock: true,
  },
  {
    id: 'SB-JAR-COMBO-3',
    name: '3-Jar Honey Combo',
    shortName: '3-Jar Combo',
    subtitle: '3 × 1/2 lb or 3 × 1 lb Bundle',
    category: 'jars',
    categoryLabel: '3-Jar Combo',
    isMainProduct: true,
    price: 38.0,
    maxPrice: 66.0,
    description:
      'Three jars of our raw New Jersey wildflower honey bundled together for family kitchens or sharing with friends and neighbors.',
    details: [
      'Choose 3 × 1/2 lb jars (1.5 lbs total) or 3 × 1 lb jars (3 lbs total)',
      'Save up to $6 compared to buying single jars',
      'Same fresh harvest from Madisonville Apiary, Basking Ridge, NJ',
      'Packed securely for safe shipping or local pickup',
    ],
    variants: [
      {
        id: 'combo-half-lb',
        label: '3 × 1/2 lb Jars (1.5 lbs total)',
        shortLabel: '3 × 1/2 lb',
        price: 38.0,
        weight: '3 × 8 oz (1.5 lbs total)',
        badge: 'Save $4',
        imageUrl: '/media/products/beeproduct_0.5lbs.jpeg',
      },
      {
        id: 'combo-one-lb',
        label: '3 × 1 lb Jars (3 lbs total)',
        shortLabel: '3 × 1 lb',
        price: 66.0,
        weight: '3 × 16 oz (3 lbs total)',
        badge: 'Save $6',
        imageUrl: '/media/products/beeproduct_1lbs.jpeg',
      },
    ],
    imageUrl: '/media/products/beeproduct_0.5lbs.jpeg',
    imagePosition: 'object-[50%_72%]',
    galleryImages: [
      '/media/products/beeproduct_0.5lbs.jpeg',
      '/media/products/beeproduct_1lbs.jpeg',
    ],
    inStock: true,
  },
  {
    id: 'SB-HOLIDAY-BOX',
    name: 'Holiday Special Gift Box',
    shortName: 'Gift Box',
    subtitle: 'Christmas · Thanksgiving · New Year',
    category: 'gifts',
    categoryLabel: 'Gift Box',
    isMainProduct: true,
    price: 48.0,
    maxPrice: 54.0,
    description:
      'Gift-ready seasonal raw wildflower honey dressed with festive ribbon and tags for Christmas, Thanksgiving, or New Year.',
    details: [
      'Seasonal ribbon, greenery or autumn wrap, and holiday tag for Christmas, Thanksgiving, or New Year',
      'Available in 2 × 1 lb Gift Box or 3 × 1/2 lb Holiday Trio Box',
      'Includes a complimentary printed holiday gift card',
      'Unpriced packing slip included when shipping directly to a recipient',
    ],
    variants: [
      {
        id: 'christmas-box',
        label: 'Christmas Edition (2 × 1 lb Gift Box)',
        shortLabel: 'Christmas',
        price: 54.0,
        weight: '2 × 16 oz + gift box & tag',
        imageUrl: '/media/products/beeproduct_holidayedition3.jpeg',
      },
      {
        id: 'thanksgiving-box',
        label: 'Thanksgiving Edition (2 × 1 lb Gift Box)',
        shortLabel: 'Thanksgiving',
        price: 54.0,
        weight: '2 × 16 oz + gift box & tag',
        imageUrl: '/media/products/beeproduct_holidayedition2.jpeg',
      },
      {
        id: 'newyear-box',
        label: 'New Year Edition (2 × 1 lb Gift Box)',
        shortLabel: 'New Year',
        price: 54.0,
        weight: '2 × 16 oz + gift box & tag',
        imageUrl: '/media/products/beeproduct_holidayedition4.jpeg',
      },
      {
        id: 'holiday-trio',
        label: 'Holiday 3-Jar Box (3 × 1/2 lb)',
        shortLabel: '3 × 1/2 lb Box',
        price: 48.0,
        weight: '3 × 8 oz + gift box & tags',
        imageUrl: '/media/products/beeproduct_holidayedition1.jpeg',
      },
    ],
    imageUrl: '/media/products/beeproduct_holidayedition4.jpeg',
    imagePosition: 'object-center',
    galleryImages: [
      '/media/products/beeproduct_holidayedition4.jpeg',
      '/media/products/beeproduct_holidayedition3.jpeg',
      '/media/products/beeproduct_holidayedition2.jpeg',
      '/media/products/beeproduct_holidayedition1.jpeg',
    ],
    inStock: true,
    allowsCustomNote: true,
    customNoteLabel: 'Holiday Gift Card Note (Optional)',
    customNotePlaceholder: 'e.g. Warm holiday wishes from our family to yours!',
  },
  {
    id: 'SB-MONTHLY-SUB',
    name: 'Members Monthly Subscription',
    shortName: 'Monthly Club',
    subtitle: 'Fresh Honey Delivered Every Month',
    category: 'subscription',
    categoryLabel: 'Monthly Club',
    isMainProduct: true,
    isSubscription: true,
    price: 12.0,
    maxPrice: 39.0,
    description:
      'Never run out of local raw honey. Receive a fresh jar from our latest Madisonville Apiary harvest every month at member pricing. Skip, pause, or cancel anytime.',
    details: [
      'Delivered monthly straight from our Basking Ridge bee yard',
      'Member savings on every jar plus priority notice on holiday releases',
      'Flexible membership — skip a month, switch sizes, or cancel anytime',
      'Choose 1/2 lb, 1 lb, or 2 × 1 lb family monthly deliveries',
    ],
    variants: [
      {
        id: 'sub-half-lb',
        label: '1/2 lb Jar · Monthly',
        shortLabel: '1/2 lb / mo',
        price: 12.0,
        weight: '8 oz delivered monthly',
        imageUrl: '/media/products/beeproduct_0.5lbs.jpeg',
      },
      {
        id: 'sub-one-lb',
        label: '1 lb Jar · Monthly',
        shortLabel: '1 lb / mo',
        price: 21.0,
        weight: '16 oz delivered monthly',
        badge: 'Most Popular',
        imageUrl: '/media/products/beeproduct_1lbs.jpeg',
      },
      {
        id: 'sub-family',
        label: '2 × 1 lb Family Plan · Monthly',
        shortLabel: '2 × 1 lb / mo',
        price: 39.0,
        weight: '2 × 16 oz delivered monthly',
        imageUrl: '/media/products/beeproduct_completeproducts.jpeg',
      },
    ],
    imageUrl: '/media/products/beeproduct_completeproducts.jpeg',
    imagePosition: 'object-[50%_52%]',
    galleryImages: [
      '/media/products/beeproduct_completeproducts.jpeg',
      '/media/products/beeproduct_1lbs.jpeg',
      '/media/products/beeproduct_0.5lbs.jpeg',
    ],
    inStock: true,
  },

  // =========================================================================
  // SPECIALTY, FAMILY & CORPORATE LINEUP
  // =========================================================================
  {
    id: 'SB-FAVOR-GIFTS',
    name: 'Favor Gifts (Wedding / Party / Events)',
    shortName: 'Favor Gifts',
    subtitle: 'Mini Honey Jars for Weddings, Parties & Events',
    category: 'gifts',
    categoryLabel: 'Event Favors',
    isMainProduct: false,
    price: 64.0,
    maxPrice: 230.0,
    description:
      'Mini hexagon glass honey favor jars filled with our raw wildflower honey and finished with wooden dippers, twine, and personalized tags for weddings, showers, and parties.',
    details: [
      'Filled with pure Basking Ridge raw wildflower honey',
      'Includes twine tie, mini wooden dipper, and personalized event tags',
      'Available in packs of 12, 24, or 50 mini glass favor jars',
      'Prepared fresh to order — please allow 5–7 business days before your event',
    ],
    variants: [
      {
        id: 'favor-12',
        label: 'Party Pack — 12 Favor Jars',
        shortLabel: '12 Jars',
        price: 64.0,
        weight: '12 mini hexagon glass jars',
      },
      {
        id: 'favor-24',
        label: 'Wedding Pack — 24 Favor Jars',
        shortLabel: '24 Jars',
        price: 120.0,
        weight: '24 mini hexagon glass jars',
        badge: 'Popular',
      },
      {
        id: 'favor-50',
        label: 'Event Pack — 50 Favor Jars',
        shortLabel: '50 Jars',
        price: 230.0,
        weight: '50 mini hexagon glass jars',
        badge: 'Best Value',
      },
    ],
    imageUrl: '/media/products/beeproduct_favorgifting.jpeg',
    imagePosition: 'object-center',
    galleryImages: [
      '/media/products/beeproduct_favorgifting.jpeg',
      '/media/products/beeproduct_completeproducts.jpeg',
    ],
    inStock: true,
    allowsCustomNote: true,
    customNoteLabel: 'Custom Favor Tag Text (Names & Date)',
    customNotePlaceholder: 'e.g. Sweetest Thank You · Maya & Daniel · June 14',
  },
  {
    id: 'SB-KIDS-BOTTLE',
    name: 'Kids Honey Bottles',
    shortName: 'Kids Bottles',
    subtitle: 'Easy-Squeeze Honey Bear Bottles for Kids',
    category: 'kids',
    categoryLabel: 'Kids',
    isMainProduct: false,
    price: 12.0,
    maxPrice: 22.0,
    description:
      'The exact same raw Singing Bee wildflower honey in a kid-friendly honey bear flip-cap squeeze bottle—easy to drizzle on pancakes, oatmeal, yogurt, and fruit.',
    details: [
      'Lightweight, shatter-resistant honey bear squeeze bottle with clean flip cap',
      '100% pure raw wildflower honey — zero added sugar or syrups',
      'Easy for kids and families at the breakfast table',
      'Note: Do not feed raw honey to infants under 1 year of age',
    ],
    variants: [
      {
        id: 'kids-single',
        label: 'Single Kids Bear Bottle (8 oz)',
        shortLabel: '1 Bottle',
        price: 12.0,
        weight: '8 oz squeeze bear bottle',
      },
      {
        id: 'kids-2pack',
        label: 'Kids 2-Pack (2 × 8 oz)',
        shortLabel: '2-Pack',
        price: 22.0,
        weight: '2 × 8 oz squeeze bear bottles',
        badge: 'Save $2',
      },
    ],
    imageUrl: '/media/products/beeproduct_kids.jpeg',
    imagePosition: 'object-top',
    galleryImages: [
      '/media/products/beeproduct_kids.jpeg',
      '/media/products/beeproduct_allkinds_banner.jpeg',
    ],
    inStock: true,
  },
  {
    id: 'SB-CORPORATE-GLASS',
    name: 'Personalized Corporate Gifting (Glass Bottles & Jars)',
    shortName: 'Corporate Glass',
    subtitle: 'Custom-Labeled Glass Bottles & Jars',
    category: 'corporate',
    categoryLabel: 'Corporate',
    isMainProduct: false,
    price: 180.0,
    maxPrice: 975.0,
    description:
      'Memorable local honey gifts for clients, partners, and teams. Clear glass bottles or jars filled with raw wildflower honey, finished with ribbon, honey dipper, and your company name and message.',
    details: [
      'Heavy-duty clear glass jars or glass bottles with tamper-evident seals',
      'Custom front label and hanging tag with your company name, logo, and message',
      'Volume packs of 12, 25, or 50 units (larger custom orders available)',
      'Presentation gift boxing and local NJ delivery available',
    ],
    variants: [
      {
        id: 'corp-12-half',
        label: '12 Personalized Glass Jars (1/2 lb)',
        shortLabel: '12 × 1/2 lb',
        price: 180.0,
        weight: '12 × 8 oz custom glass jars',
      },
      {
        id: 'corp-25-one',
        label: '25 Personalized Glass Jars (1 lb)',
        shortLabel: '25 × 1 lb',
        price: 525.0,
        weight: '25 × 16 oz custom glass jars',
        badge: 'Popular',
      },
      {
        id: 'corp-50-one',
        label: '50 Personalized Glass Bottles (1 lb)',
        shortLabel: '50 × 1 lb',
        price: 975.0,
        weight: '50 × 16 oz custom glass bottles',
        badge: 'Best Value',
      },
    ],
    imageUrl: '/media/products/beeproduct_corporategifting.jpeg',
    imagePosition: 'object-[50%_52%]',
    galleryImages: [
      '/media/products/beeproduct_corporategifting.jpeg',
      '/media/products/beeproduct_completeproducts.jpeg',
    ],
    inStock: true,
    allowsCustomNote: true,
    customNoteLabel: 'Company Name & Custom Label Message',
    customNotePlaceholder: 'e.g. Thank you for a great year — Acme Studio',
  },
];

export const MAIN_PRODUCTS: ProductItem[] = PRODUCTS.filter((p) => p.isMainProduct);
export const SPECIALTY_PRODUCTS: ProductItem[] = PRODUCTS.filter((p) => !p.isMainProduct);

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(product: ProductItem, limit: number = 3): ProductItem[] {
  return PRODUCTS.filter((p) => p.id !== product.id).slice(0, limit);
}

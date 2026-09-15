import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts, PRODUCTS } from '@/lib/products';
import ProductDetailClient from '@/components/ProductDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product reserve is unavailable in the atelier catalog.',
    };
  }

  const isHoney = product.department === 'honey';
  const categoryLabel = isHoney ? 'Raw Honey Reserve' : 'Professional Apiary Gear';

  return {
    title: `${product.name} | ${categoryLabel}`,
    description: product.description || product.subtitle,
    openGraph: {
      title: `${product.name} | Avenoir Apiary`,
      description: product.subtitle,
      images: [product.imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 3);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

import CollectionsPage from '@/components/CollectionsPage';
import { TARI_PRODUCTS, HAIR_PRODUCTS } from '@/lib/constants';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category;
  const title = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${title} Collection | SHAYONCE G`,
    description: `Explore the ${title} collection. Luxury bridal and bespoke silhouettes.`,
  };
}

export default async function Page({ params }: { params: { category: string } }) {
  const { category } = params;
  
  // Fetch products for this category from Supabase
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .order('order_index', { ascending: true });

  // Map database fields to component props
  const products = (data || []).map(p => ({
    ...p,
    isVideo: p.is_video,
    desc: p.description
  }));

  // Fallback data if DB is empty (UX precaution)
  const displayProducts = products.length > 0 ? products : (
    category === 'tari' ? TARI_PRODUCTS : 
    (category === 'curly-braids' || category === 'ai-braids' || category === 'hair') ? HAIR_PRODUCTS : []
  );

  const title = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <CollectionsPage 
      theme="dark"
      cartCount={0}
      onAddToCart={() => {}}
      products={displayProducts}
      title={title}
      subtitle={`The ${title} archive. Architectural silhouettes and luxury textures.`}
    />
  );
}

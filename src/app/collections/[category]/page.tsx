import CollectionsPage from '@/components/CollectionsPage';
import { TARI_PRODUCTS, HAIR_PRODUCTS } from '@/lib/constants';

// This is a temporary wrapper to adapt the client component to the dynamic route
// In a full implementation, we would fetch data from Supabase here.

export default async function Page({ params }: { params: { category: string } }) {
  const { category } = params;
  
  // Normalize category name for display
  const title = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // For now, we use existing constants as fallback data
  // We will integrate dynamic Supabase fetching in Task 3 & 4.
  const tariProducts = TARI_PRODUCTS;
  const hairProducts = HAIR_PRODUCTS;

  return (
    <CollectionsPage 
      theme="dark"
      cartCount={0}
      onBack={() => {}} // Note: Back button will need to use router.back() inside the component
      onAddToCart={() => {}}
      tariProducts={tariProducts}
      hairProducts={hairProducts}
    />
  );
}

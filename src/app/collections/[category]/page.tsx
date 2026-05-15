'use client';

import { TARI_PRODUCTS, HAIR_PRODUCTS } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const CollectionsPage = dynamic(() => import('@/components/CollectionsPage'), { ssr: false });

export default function Page({ params }: { params: { category: string } }) {
  const { category } = params;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const dbCategory = category === 'tari-set' ? 'tari' : (category === 'hair-collection' ? 'hair' : category);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', dbCategory)
        .eq('status', 'published')
        .order('order_index', { ascending: true });

      if (!error && data) {
        setProducts(data.map(p => ({
          ...p,
          isVideo: p.is_video,
          desc: p.description
        })));
      }
      setLoading(false);
    };
    fetchData();
  }, [dbCategory]);

  const displayProducts = products.length > 0 ? products : (
    dbCategory === 'tari' ? TARI_PRODUCTS : 
    (dbCategory === 'hair' || dbCategory === 'curly-braids' || dbCategory === 'ai-braids') ? HAIR_PRODUCTS : []
  );

  const title = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const subtitle = dbCategory === 'tari' 
    ? "Architectural bridal sets designed for absolute presence. Each piece is a study of form and structured grace."
    : "Luxury textures and bespoke hair units. The final layer of the feminine silhouette.";

  if (loading) return (
    <div className="min-h-screen bg-onyx flex items-center justify-center">
       <div className="w-12 h-12 border-t-2 border-white/20 rounded-full animate-spin" />
    </div>
  );

  return (
    <CollectionsPage 
      theme="dark"
      cartCount={0}
      onAddToCart={() => {}}
      products={displayProducts}
      title={title}
      subtitle={subtitle}
    />
  );
}

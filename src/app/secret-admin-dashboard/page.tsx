'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LogOut, GripVertical, Trash2, Edit3, Image as ImageIcon, Video, Check, Loader2, X, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { LUXURY_EASE } from '@/lib/constants';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- TYPES ---
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  src: string;
  is_video: boolean;
  category: 'tari' | 'hair' | 'curly-braids' | 'ai-braids';
  order_index: number;
  status: 'draft' | 'published';
}

// --- SORTABLE ITEM COMPONENT ---
const SortableProductItem = ({ product, onDelete, onEdit }: { product: Product, onDelete: (id: string) => void, onEdit: (p: Product) => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-8 p-6 md:p-8 border border-white/5 bg-white/[0.01] rounded-[2rem] hover:bg-white/[0.03] transition-all ${isDragging ? 'shadow-2xl border-white/20 scale-[1.02]' : ''}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing opacity-20 group-hover:opacity-100 transition-opacity">
        <GripVertical size={16} />
      </div>
      
      <div className="w-20 h-24 rounded-2xl overflow-hidden border border-white/5 bg-black">
        {product.is_video ? (
            <video src={product.src} muted loop className="w-full h-full object-cover opacity-60" />
        ) : (
            <img src={product.src} className="w-full h-full object-cover opacity-60" alt={product.title} />
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-4">
              <h3 className="text-lg font-serif italic truncate">{product.title}</h3>
              <span className={`px-3 py-1 rounded-full text-[8px] uppercase tracking-[0.3em] border ${product.category === 'tari' ? 'border-amber-500/20 text-amber-500/60' : 'border-blue-500/20 text-blue-500/60'}`}>
                  {product.category === 'tari' ? 'Tari Set' : 'Hair Collection'}
              </span>
          </div>
          <p className="text-[10px] tracking-widest text-white/30 truncate max-w-md">{product.description}</p>
      </div>

      <div className="text-right space-y-2">
          <p className="text-xs tracking-widest text-[#D4AF37]">₦{product.price.toLocaleString()}</p>
          <span className={`text-[8px] uppercase tracking-[0.2em] ${product.status === 'published' ? 'text-green-500/40' : 'text-white/20'}`}>
              {product.status}
          </span>
      </div>

      <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
              onClick={() => onEdit(product)}
              className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
              <Edit3 size={14} className="opacity-60" />
          </button>
          <button 
              onClick={() => onDelete(product.id)}
              className="w-10 h-10 rounded-full border border-red-500/10 flex items-center justify-center hover:bg-red-500/10 transition-colors"
          >
              <Trash2 size={14} className="text-red-500 opacity-40" />
          </button>
      </div>
    </motion.div>
  );
};

// --- MAIN DASHBOARD PAGE ---
export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'tari' | 'hair' | 'curly-braids' | 'ai-braids'>('tari');
  const [src, setSrc] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) console.error('Error fetching products:', error);
    else setProducts(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this piece?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  };

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setPrice(p.price.toString());
    setDescription(p.description);
    setCategory(p.category);
    setSrc(p.src);
    setIsVideo(p.is_video);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setTitle('');
    setPrice('');
    setDescription('');
    setCategory('tari');
    setSrc('');
    setIsVideo(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      alert('Upload failed. Check if bucket "media" exists and has public access.');
    } else {
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
      setSrc(publicUrl);
      setIsVideo(file.type.startsWith('video/'));
    }
    setUploading(false);
  };

  const handleSave = async (status: 'draft' | 'published' = 'published') => {
    if (!title || !price || !src) {
        alert('Missing critical details.');
        return;
    }

    setLoading(true);
    const productData = {
      title,
      price: parseFloat(price),
      description,
      src,
      is_video: isVideo,
      category,
      status,
      order_index: editingProduct ? editingProduct.order_index : products.length,
    };

    let error;
    if (editingProduct) {
      const { error: err } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);
      error = err;
    } else {
      const { error: err } = await supabase
        .from('products')
        .insert([productData]);
      error = err;
    }

    if (error) {
      console.error('Error saving product:', error);
      alert('Save failed.');
    } else {
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    }
    setLoading(false);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p.id === active.id);
      const newIndex = products.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(products, oldIndex, newIndex);
      setProducts(newOrder);

      // Update order in database
      const updates = newOrder.map((p, index) => ({
        id: p.id,
        order_index: index,
      }));

      for (const update of updates) {
        await supabase.from('products').update({ order_index: update.order_index }).eq('id', update.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white/80 font-sans selection:bg-white/10">
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.8em] text-white/20">Creative Studio</span>
            <h1 className="text-xl md:text-2xl font-serif tracking-widest lowercase">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-8">
            <button 
                onClick={() => {
                    resetForm();
                    setIsModalOpen(true);
                }}
                className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full transition-all hover:scale-105 active:scale-95"
            >
                <Plus size={14} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-semibold">New Entry</span>
            </button>
            
            <button onClick={handleLogout} className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors">
                <LogOut size={16} className="opacity-40" />
            </button>
        </div>
      </header>

      <main className="pt-48 pb-32 px-8 md:px-12 max-w-7xl mx-auto space-y-24">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { label: 'Total Pieces', value: products.length },
                { label: 'Tari Sets', value: products.filter(p => p.category === 'tari').length },
                { label: 'Yonce Hair', value: products.filter(p => p.category === 'hair').length },
            ].map((stat, i) => (
                <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 border border-white/5 bg-white/[0.02] rounded-[2.5rem] space-y-4"
                >
                    <span className="text-[9px] uppercase tracking-[0.6em] text-white/20">{stat.label}</span>
                    <p className="text-4xl font-serif">{stat.value}</p>
                </motion.div>
            ))}
        </section>

        <section className="space-y-12">
            <div className="flex justify-between items-end border-b border-white/5 pb-8">
                <h2 className="text-2xl font-serif italic lowercase tracking-widest opacity-60">The Archive</h2>
                <div className="flex gap-6 text-[9px] uppercase tracking-[0.4em] opacity-30">
                    <span>Drag to Reorder</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading && products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-20">
                        <Loader2 className="animate-spin" size={24} />
                        <span className="text-[9px] uppercase tracking-[0.4em]">Synchronizing Archive...</span>
                    </div>
                ) : (
                    <DndContext 
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext 
                        items={products.map(p => p.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {products.map((product) => (
                          <SortableProductItem 
                            key={product.id} 
                            product={product} 
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                )}
            </div>
        </section>
      </main>

      <AnimatePresence>
        {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsModalOpen(false)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 md:p-20 shadow-2xl"
                >
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 opacity-30 hover:opacity-100 transition-opacity">
                        <X size={24} />
                    </button>

                    <div className="space-y-16">
                        <div className="space-y-4">
                            <span className="text-[9px] uppercase tracking-[0.8em] text-white/20">Studio Upload</span>
                            <h2 className="text-4xl font-serif lowercase italic tracking-tighter">
                                {editingProduct ? 'Update Masterpiece' : 'Publish New Piece'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                            <div className="space-y-8">
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-[3/4] border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group hover:border-white/20 transition-all cursor-pointer relative overflow-hidden bg-black/20"
                                >
                                    {uploading ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader2 className="animate-spin" size={24} />
                                            <span className="text-[10px] uppercase tracking-[0.4em]">Processing...</span>
                                        </div>
                                    ) : src ? (
                                        isVideo ? (
                                            <video src={src} muted loop autoPlay className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={src} className="w-full h-full object-cover" alt="Preview" />
                                        )
                                    ) : (
                                        <>
                                            <div className="flex flex-col items-center gap-4 opacity-30 group-hover:opacity-60 transition-opacity text-center px-8">
                                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                                    <Upload size={24} />
                                                </div>
                                                <span className="text-[10px] uppercase tracking-[0.4em]">Drop Editorial Media Here</span>
                                                <p className="text-[8px] uppercase tracking-[0.2em] opacity-20">Preferred 3:4 Vertical Aspect Ratio</p>
                                            </div>
                                        </>
                                    )}
                                    <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*" />
                                </div>
                                
                                <div className="flex gap-4">
                                    <div className={`flex-1 p-6 border border-white/5 rounded-3xl flex items-center gap-4 transition-all ${!isVideo && src ? 'bg-white/10 border-white/20' : 'bg-white/[0.02]'}`}>
                                        <ImageIcon size={14} className="opacity-20" />
                                        <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Still Image</span>
                                    </div>
                                    <div className={`flex-1 p-6 border border-white/5 rounded-3xl flex items-center gap-4 transition-all ${isVideo && src ? 'bg-white/10 border-white/20' : 'bg-white/[0.02]'}`}>
                                        <Video size={14} className="opacity-20" />
                                        <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">Motion Clip</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/20">Piece Name</label>
                                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-sm tracking-widest outline-none focus:border-white/40 transition-colors" placeholder="e.g. Tari Signature Ivory" />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[9px] uppercase tracking-[0.4em] text-white/20">Investment (₦)</label>
                                        <input value={price} onChange={e => setPrice(e.target.value)} type="number" className="w-full bg-transparent border-b border-white/10 py-4 text-sm tracking-widest outline-none focus:border-white/40 transition-colors" placeholder="0" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[9px] uppercase tracking-[0.4em] text-white/20">Archive Category</label>
                                        <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full bg-transparent border-b border-white/10 py-4 text-sm tracking-widest outline-none focus:border-white/40 transition-colors cursor-pointer">
                                            <option value="tari">Tari Set Collection</option>
                                            <option value="hair">Yonce Hair Collection</option>
                                            <option value="curly-braids">Curly Braids Archive</option>
                                            <option value="ai-braids">AI Braids Experiment</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/20">Narrative</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-transparent border border-white/10 p-6 rounded-3xl text-sm tracking-widest outline-none focus:border-white/40 transition-colors h-32 resize-none" placeholder="The story behind the silhouette..." />
                                </div>
                                
                                <div className="flex gap-4 pt-8">
                                    <button 
                                        onClick={() => handleSave('published')}
                                        disabled={loading}
                                        className="flex-1 py-6 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-20"
                                    >
                                        {editingProduct ? 'Update Archive' : 'Publish to Archive'}
                                    </button>
                                    <button onClick={() => handleSave('draft')} className="px-10 py-6 border border-white/10 text-[10px] uppercase tracking-[0.4em] rounded-full hover:bg-white/5">
                                        Save Draft
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('/image/noise.svg')] mix-blend-overlay" />
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { formatCurrency } from '../lib/utils';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Category } from '../types';

export function HomePage() {
  const { products, banners } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  const categories: (Category | 'ALL')[] = ['ALL', 'TOP UP', 'VOUCHER GAME', 'PULSA'];

  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategory === 'ALL' || p.kategori === activeCategory;
    const matchSearch = p.nama_game.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const popularProducts = products
    .filter(p => p.is_popular)
    .sort((a, b) => (a.popular_rank || 0) - (b.popular_rank || 0));

  return (
    <div className="flex flex-col gap-[10px] pb-24">
      {/* Banner Slider */}
      <div className="px-3 pt-3">
        <div className="relative w-full h-[150px] rounded-[10px] overflow-hidden border border-card-main shadow-2xl shadow-accent-green/5">
          {banners.length > 0 ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-card-main/80 to-transparent z-10"></div>
              <div className="absolute bottom-4 left-4 z-20">
                <span className="px-2 py-0.5 bg-accent-green text-[8px] font-black text-black rounded mb-1 inline-block uppercase">Promo Terbatas</span>
                <h2 className="text-[18px] font-black leading-tight uppercase">Top Up Game <br/>Diskon 20%</h2>
              </div>
              <img src={banners[0].url_gambar} className="w-full h-full object-cover opacity-60" alt="Banner" />
              <div className="absolute bottom-3 right-4 flex gap-1 z-20">
                <div className="w-4 h-1 bg-accent-green rounded"></div>
                <div className="w-2 h-1 bg-slate-text rounded opacity-50"></div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-text italic bg-card-main text-[10px] uppercase font-black">
              Banner promo
            </div>
          )}
        </div>
      </div>

      {/* Popular Section */}
      <div className="px-3 py-2">
        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col">
            <h3 className="text-[18px] font-bold uppercase text-white tracking-tight">Produk Populer</h3>
            <div className="w-8 h-1 bg-accent-green rounded-full mt-0.5"></div>
          </div>
          <span className="text-[10px] text-accent-green font-black uppercase tracking-widest cursor-pointer">Lihat Semua</span>
        </div>
        <div className="flex gap-[10px] overflow-x-auto pb-2 scrollbar-hide">
          {popularProducts.map((p, idx) => (
            <Link key={p.id} to={`/product/${p.id}`} className="relative flex-shrink-0 group">
              <div className={cn(
                "relative w-[200px] h-[100px] bg-[#1E1E1E] rounded-[10px] p-3 flex items-center gap-3 transition-all duration-300",
                idx === 0 
                  ? "border-2 border-accent-green shadow-[0_0_20px_rgba(0,255,136,0.1)]" 
                  : "border border-white/5 hover:border-white/20"
              )}>
                <div className={cn(
                  "absolute -top-2 -left-2 w-8 h-8 font-black rounded-[8px] flex items-center justify-center shadow-xl text-[14px] transition-transform group-hover:scale-110",
                  idx === 0 ? "bg-accent-green text-black" : "bg-white text-black"
                )}>
                  {idx + 1}
                </div>
                <div className="w-[60px] h-[60px] bg-black rounded-[10px] flex-shrink-0 flex items-center justify-center border border-white/5 overflow-hidden">
                  <img src={p.url_gambar} className="w-full h-full object-cover" alt={p.nama_game} />
                </div>
                <div className="flex flex-col flex-1 truncate">
                  <span className="font-bold text-[12px] uppercase text-white truncate group-hover:text-accent-green transition-colors">{p.nama_game}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] text-accent-green font-bold">
                      {p.nominal_list.length > 0 ? formatCurrency(p.nominal_list[0].harga) : 'Cek'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories & Search */}
      <div className="px-3 flex flex-col gap-[10px]">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "h-[36px] px-4 rounded-[10px] text-[12px] font-black transition-all whitespace-nowrap uppercase tracking-widest border",
                activeCategory === cat 
                  ? "bg-accent-green text-black border-accent-green shadow-lg shadow-accent-green/20" 
                  : "bg-card-main text-slate-text border-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="CARI GAME ATAU PRODUK..."
            className="w-full h-[45px] bg-card-main border border-slate-text/20 rounded-[10px] py-3 px-10 text-[12px] text-white font-bold tracking-widest focus:border-accent-green outline-none transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="absolute left-3 top-3.5 w-4 h-4 text-slate-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-accent-green rounded-full"></div>
          <h2 className="text-[14px] font-bold text-slate-text uppercase tracking-widest">{activeCategory}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-[10px]">
          {filteredProducts.map((p) => (
            <Link 
              key={p.id} 
              to={`/product/${p.id}`} 
              className="bg-card-main rounded-[10px] p-3 border border-white/5 hover:border-accent-green/30 transition-all group h-[120px] flex flex-col justify-center items-center text-center gap-2"
            >
              <div className="w-[60px] h-[60px] bg-bg-main rounded-[10px] overflow-hidden border border-white/5 group-hover:scale-110 transition-transform">
                <img src={p.url_gambar} className="w-full h-full object-cover" alt={p.nama_game} />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[12px] font-bold text-white uppercase truncate">{p.nama_game}</span>
                <span className="text-[10px] text-accent-green font-medium uppercase mt-0.5">
                  {p.kategori}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { formatCurrency } from '../lib/utils';
import { ChevronLeft, Info, Wallet, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/db';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, refreshData } = useApp();
  const product = products.find(p => p.id === id);

  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [gameId, setGameId] = useState('');
  const [wa, setWa] = useState('');

  if (!product) return <div className="p-6">Produk tidak ditemukan.</div>;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async () => {
    if (selectedNominal === null || !gameId || !wa) {
      alert('Lengkapi data terlebih dahulu');
      return;
    }

    const nominal = product.nominal_list[selectedNominal];
    const order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      nama_game: product.nama_game,
      nominal: nominal.nama,
      id_game: gameId,
      wa: wa,
      total: nominal.harga,
      status: 'Menunggu' as const,
      tanggal: new Date().toISOString()
    };

    setIsSubmitting(true);
    try {
      await db.orders.add(order);
      await refreshData();
      navigate(`/checkout/${order.id}`);
    } catch (error) {
      console.error('Gagal membuat order:', error);
      alert('Gagal membuat order. Cek koneksi internet dan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24">
      <div className="relative h-64 overflow-hidden">
        <img src={product.url_gambar} className="w-full h-full object-cover opacity-50 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-bg-main/50 rounded-full backdrop-blur-md"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="absolute bottom-6 left-6 flex items-end gap-4">
          <div className="w-24 h-32 rounded-xl bg-card-main border border-accent-green overflow-hidden shadow-2xl">
            <img src={product.url_gambar} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{product.nama_game}</h1>
            <p className="text-accent-green font-black text-sm uppercase tracking-widest">{product.kategori}</p>
          </div>
        </div>
      </div>

      <div className="px-3 mt-3 space-y-[10px]">
        {/* Step 1: Input ID */}
        <section className="bg-card-main rounded-[10px] p-3 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 bg-accent-green text-bg-main rounded-[5px] flex items-center justify-center font-black text-[12px] shadow-lg shadow-accent-green/20">1</span>
            <h3 className="font-bold text-white uppercase text-[14px] tracking-tight">Data Akun</h3>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Masukkan User ID / Server"
              className="w-full h-[45px] bg-bg-main border border-slate-text/20 rounded-[10px] px-4 text-[14px] font-bold focus:outline-none focus:border-accent-green transition-all"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
            <div className="flex items-start gap-2 p-3 bg-white/5 rounded-[10px] border border-white/5">
              <Info size={16} className="text-accent-green flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-text font-medium leading-relaxed italic">Pastikan ID Game benar.</p>
            </div>
          </div>
        </section>

        {/* Step 2: Select Nominal */}
        <section className="bg-card-main rounded-[10px] p-3 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 bg-accent-green text-bg-main rounded-[5px] flex items-center justify-center font-black text-[12px] shadow-lg shadow-accent-green/20">2</span>
            <h3 className="font-bold text-white uppercase text-[14px] tracking-tight">Pilih Nominal</h3>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            {product.nominal_list.map((nom, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedNominal(idx)}
                className={cn(
                  "p-3 h-[80px] rounded-[10px] border text-left transition-all relative overflow-hidden flex flex-col justify-center",
                  selectedNominal === idx 
                    ? "bg-accent-green/10 border-accent-green shadow-[0_0_15px_rgba(0,255,136,0.1)]" 
                    : "bg-bg-main border-white/5 hover:border-slate-text/20"
                )}
              >
                <p className={cn(
                  "text-[11px] font-bold uppercase tracking-tight truncate",
                  selectedNominal === idx ? "text-accent-green" : "text-slate-text"
                )}>{nom.nama}</p>
                <p className="text-[16px] font-black text-white mt-0.5">{formatCurrency(nom.harga)}</p>
                {selectedNominal === idx && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-accent-green p-1 rounded-bl-[10px] shadow-lg">
                      <CheckCircle2 size={10} className="text-bg-main" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Step 3: WA */}
        <section className="bg-card-main rounded-[10px] p-3 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 bg-accent-green text-bg-main rounded-[5px] flex items-center justify-center font-black text-[12px] shadow-lg shadow-accent-green/20">3</span>
            <h3 className="font-bold text-white uppercase text-[14px] tracking-tight">WhatsApp</h3>
          </div>
          <input
            type="tel"
            placeholder="08123456789"
            className="w-full h-[45px] bg-bg-main border border-slate-text/20 rounded-[10px] px-4 text-[14px] font-bold focus:outline-none focus:border-accent-green transition-all"
            value={wa}
            onChange={(e) => setWa(e.target.value)}
          />
        </section>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleCheckout}
            disabled={selectedNominal === null || !gameId || !wa || isSubmitting}
            className="w-full max-w-[160px] h-[45px] bg-accent-green text-black font-black rounded-[10px] shadow-lg shadow-accent-green/20 disabled:opacity-50 transition-all active:scale-95 uppercase tracking-widest text-[14px]"
          >
            {isSubmitting ? 'MEMPROSES...' : 'CHECKOUT'}
          </button>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

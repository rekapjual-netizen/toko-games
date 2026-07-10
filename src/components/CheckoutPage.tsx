import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { formatCurrency } from '../lib/utils';
import { CheckCircle2, ChevronLeft, MessageSquare } from 'lucide-react';
import { db } from '../lib/db';
import { Order } from '../types';

export function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useApp();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    db.orders.getById(id).then(setOrder);
  }, [id]);

  if (order === undefined) return <div className="p-6 text-slate-text text-[11px] uppercase font-bold">Memuat pesanan...</div>;
  if (!order) return <div className="p-6">Pesanan tidak ditemukan.</div>;

  const handleWhatsApp = () => {
    const message = `Halo Admin, saya mau konfirmasi pembayaran:%0A%0AOrder ID: ${order.id}%0AGame: ${order.nama_game}%0ANominal: ${order.nominal}%0AID Akun: ${order.id_game}%0ATotal: ${formatCurrency(order.total)}%0A%0ASaya sudah transfer via QRIS. Mohon diproses ya.`;
    const waNumber = settings.wa_number || '628123456789';
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="pb-24">
      <div className="px-3 h-[60px] flex items-center gap-4 bg-card-main border-b border-white/5 sticky top-0 z-40">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-white/5 rounded-[10px] transition-colors"><ChevronLeft size={20} /></button>
        <h1 className="font-bold text-white uppercase tracking-tight text-[14px]">Checkout</h1>
      </div>

      <div className="p-3 space-y-[10px]">
        <div className="bg-accent-green/10 border border-accent-green/50 rounded-[10px] p-3 flex items-center gap-3 shadow-2xl shadow-accent-green/5">
          <div className="w-10 h-10 bg-accent-green rounded-[10px] flex items-center justify-center text-black shadow-lg">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h2 className="text-white font-bold text-[14px] uppercase">Menunggu Bayar</h2>
            <p className="text-slate-text text-[11px] font-medium mt-0.5">Silakan scan kode QRIS</p>
          </div>
        </div>

        <section className="bg-card-main rounded-[10px] overflow-hidden border border-white/5 shadow-2xl">
          <div className="bg-white/5 px-3 py-2 border-b border-white/5 flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-text uppercase">ID Transaksi</span>
            <span className="text-[11px] font-bold text-white uppercase">#{order.id}</span>
          </div>
          <div className="p-6 flex flex-col items-center bg-gradient-to-b from-transparent to-black/20">
            <div className="bg-white p-2 rounded-[10px] shadow-[0_0_30px_rgba(0,255,136,0.2)] border-[4px] border-white max-w-[240px] w-full aspect-square flex items-center justify-center overflow-hidden">
              {settings.url_gambar_qris ? (
                <img src={settings.url_gambar_qris} className="w-full h-full object-contain" alt="QRIS" />
              ) : (
                <div className="text-slate-500 text-center text-[10px] font-black uppercase tracking-widest leading-relaxed p-4">
                  GAMBAR QRIS <br/> BELUM DIUPLOAD
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col items-center">
              <p className="text-accent-green text-[11px] font-bold tracking-widest uppercase">Scan via E-Wallet</p>
            </div>
          </div>
        </section>

        <section className="bg-card-main rounded-[10px] p-3 border border-white/5 space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-slate-text text-[12px] font-bold uppercase">Total Bayar</span>
            <span className="text-accent-green font-black text-[22px] leading-none">{formatCurrency(order.total)}</span>
          </div>
          <div className="border-t border-white/5 pt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-text text-[11px] font-medium uppercase">Game</span>
              <span className="text-white text-[11px] font-bold uppercase">{order.nama_game}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-text text-[11px] font-medium uppercase">Nominal</span>
              <span className="text-white text-[11px] font-bold uppercase">{order.nominal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-text text-[11px] font-medium uppercase">User ID</span>
              <span className="text-white text-[11px] font-bold uppercase">{order.id_game}</span>
            </div>
          </div>
        </section>

        <div className="flex justify-center pt-2">
          <button
            onClick={handleWhatsApp}
            className="w-full max-w-[160px] h-[45px] bg-[#25D366] text-white font-black rounded-[10px] flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transform transition hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-[12px]"
          >
            <MessageSquare size={18} fill="white" />
            KONFIRMASI
          </button>
        </div>
      </div>
    </div>
  );
}

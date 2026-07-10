import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { Header, BottomNav } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ProductDetail } from './components/ProductDetail';
import { CheckoutPage } from './components/CheckoutPage';
import { useApp } from './AppContext';

function HelpPage() {
  const { settings } = useApp();

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-white font-black uppercase tracking-[0.2em] text-xs">Pusat Bantuan</h2>
      <div className="bg-card-main p-6 rounded-3xl border border-white/5 space-y-4">
        <p className="text-slate-text text-[10px] font-medium leading-relaxed italic">Butuh bantuan terkait pesanan atau ingin mendaftarkan produk baru? Silakan hubungi admin kami.</p>
        <a
          href={`https://wa.me/${settings.wa_number || '628123456789'}`}
          target="_blank"
          rel="noreferrer"
          className="block w-full py-4 bg-[#25D366] text-white text-center font-black rounded-2xl uppercase tracking-widest text-[10px]"
        >
          Hubungi WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-bg-main text-white font-sans transition-colors duration-500 selection:bg-accent-green selection:text-bg-main">
          <Header />
          <main className="max-w-md mx-auto relative min-h-[calc(100vh-80px)] md:border-x md:border-white/5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout/:id" element={<CheckoutPage />} />
              <Route
                path="/kalkulator"
                element={
                  <div className="p-8 text-center">
                    <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">Kalkulator Game</h2>
                    <p className="text-slate-text text-[10px] uppercase font-bold italic">Fitur hitung kebutuhan diamond segera hadir.</p>
                  </div>
                }
              />
              <Route
                path="/transaksi"
                element={
                  <div className="p-8 text-center">
                    <h2 className="text-white font-black uppercase tracking-widest text-sm mb-4">Riwayat Transaksi</h2>
                    <p className="text-slate-text text-[10px] uppercase font-bold italic">Fitur Cek Transaksi segera hadir.</p>
                  </div>
                }
              />
              <Route path="/bantuan" element={<HelpPage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AppProvider>
  );
}

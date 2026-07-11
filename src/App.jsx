import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Header, BottomNav } from './components/Navigation';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import HelpPage from './pages/HelpPage';

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="min-h-screen bg-bg-main text-white font-sans selection:bg-accent-green selection:text-bg-main">
          <Header />
          <main className="max-w-md mx-auto relative min-h-[calc(100vh-80px)] md:border-x md:border-white/5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/bantuan" element={<HelpPage />} />
              {/* Tidak ada route /admin, /login, atau /dashboard di project toko ini */}
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </ShopProvider>
  );
}

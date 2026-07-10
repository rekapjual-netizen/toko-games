import React from 'react';
import { Home, Calculator, Receipt, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { label: 'BERANDA', icon: Home, path: '/' },
    { label: 'KALKULATOR', icon: Calculator, path: '/kalkulator' },
    { label: 'TRANSAKSI', icon: Receipt, path: '/transaksi' },
    { label: 'BANTUAN', icon: HelpCircle, path: '/bantuan' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-accent-green/10 h-[60px] px-3 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center gap-0.5 transition-colors',
              isActive ? 'text-accent-green' : 'text-slate-text'
            )}
          >
            <item.icon size={22} fill={isActive ? 'currentColor' : 'none'} />
            <span className="text-[11px] font-black uppercase tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function Header() {
  return (
    <header className="px-3 py-3 flex items-center justify-between sticky top-0 bg-bg-main/90 backdrop-blur-md z-40 border-b border-card-main">
      <div className="flex flex-col">
        <h1 className="text-[18px] font-black text-accent-green tracking-tighter leading-none italic">
          TOKO GAME QRIS
        </h1>
        <p className="text-[10px] font-medium text-slate-text tracking-widest mt-0.5 uppercase">
          DOMPET AMAN, NGE-GAME JALAN
        </p>
      </div>
    </header>
  );
}

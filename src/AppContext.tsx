import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Banner, SettingQRIS } from './types';
import { db } from './lib/db';

interface AppContextType {
  products: Product[];
  banners: Banner[];
  settings: SettingQRIS;
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [settings, setSettings] = useState<SettingQRIS>({
    kode_qris_static: '',
    url_gambar_qris: '',
    wa_number: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = async () => {
    const [p, b, s] = await Promise.all([
      db.products.getAll(),
      db.banners.getAll(),
      db.settings.getQRIS(),
    ]);
    setProducts(p);
    setBanners(b);
    setSettings(s);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AppContext.Provider value={{ products, banners, settings, isLoading, refreshData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

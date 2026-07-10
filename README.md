# PWA Kasir — Toko Game QRIS

App publik untuk pelanggan: lihat produk, checkout, bayar via QRIS.
Order yang dibuat di sini tersimpan di Firestore project **toko-qris**
dan otomatis muncul di app Admin (project terpisah).

## Fitur
- Lihat daftar & detail produk (top up, voucher, pulsa)
- Checkout & tampilkan QRIS untuk dibayar
- Konfirmasi pembayaran via WhatsApp
- Simpan order ke Firebase Firestore

**Tidak ada** fitur admin/login di project ini.

## Setup

1. `npm install`
2. Salin `.env.example` jadi `.env`, isi dengan config Firebase project **toko-qris**
   (Firebase Console > Project Settings > General > Your apps > Web app > SDK config).
3. `npm run dev` untuk coba lokal.

## Deploy ke Netlify

1. Push folder ini ke repo Git (terpisah dari project Admin), atau drag-drop folder ke Netlify.
2. Build command: `npm run build`, publish directory: `dist` (sudah diatur di `netlify.toml`).
3. Di Netlify: **Site settings > Environment variables**, tambahkan semua variabel
   dari `.env.example` dengan nilai project `toko-qris`.
4. Deploy.

## Firestore Rules

Pastikan rules di `../firestore.rules` (satu folder di atas, dipakai bareng
dengan project Admin) sudah diterapkan di Firebase Console > Firestore Database > Rules,
supaya harga produk & data QRIS tidak bisa diubah orang selain admin.

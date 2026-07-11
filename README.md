# GTH Store — Toko (PWA Pembeli)

Aplikasi toko untuk pembeli. **Hanya membaca (read-only)** data dari Firestore — tidak ada fitur login, tambah, atau hapus data di project ini. Semua pengelolaan data (produk, banner, dll) dilakukan lewat project `gthstore-admin`.

## Fitur
- Banner promo (dibaca dari Firestore, dikelola via Admin)
- List produk + kategori + pencarian
- Detail produk + galeri hingga 5 foto
- Checkout via WhatsApp (tidak menyimpan data apa pun ke database)
- PWA (bisa di-install di HP)

## Cara Menjalankan

1. **Isi konfigurasi Firebase**

   Buka `src/firebase.js`, tempel `firebaseConfig` dari Firebase Console project kamu (harus **project yang sama** dengan yang dipakai di `gthstore-admin`):

   ```js
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

2. **Install dependency**

   ```bash
   npm i
   ```

3. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Buka `http://localhost:5173`

4. **Build untuk production**

   ```bash
   npm run build
   ```

   Hasil build ada di folder `dist/`, siap di-deploy ke Netlify/Vercel/Firebase Hosting.

## Struktur Data Firestore yang Dibaca

- `products` (koleksi): `nama_game`, `kategori`, `url_gambar`, `nominal_list` (array {nama, harga}), `images` (array URL, maks 5), `is_popular`, `popular_rank`
- `banners` (koleksi): `url_gambar`, `order`
- `categories` (koleksi): `name`
- `settings/qris` (dokumen): `wa_number`, `url_gambar_qris`
- `settings/tampilan` (dokumen): `name`, `slogan`, `logo_url`, `primary_color`, `description`

## Catatan Keamanan (Firestore Rules)

Karena project ini read-only, pastikan Firestore Security Rules kamu hanya mengizinkan **read** untuk collection publik di atas, dan **write** hanya untuk user yang sudah login (lewat project Admin). Contoh:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /banners/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /categories/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

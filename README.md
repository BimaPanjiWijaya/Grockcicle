# Grockcicle - eCommerce Web App

## Tentang Project

Grockcicle adalah web aplikasi eCommerce yang menyediakan katalog produk, pencarian, infinite scroll, detail produk, serta wishlist. Aplikasi ini dibangun dengan arsitektur Next.js App Router dan API routes terintegrasi dengan MongoDB untuk penyimpanan data pengguna, produk, dan wishlist.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- React 19
- MongoDB (driver resmi)
- Tailwind CSS v4
- Zod (validasi)
- JWT + bcryptjs (autentikasi)
- react-infinite-scroll-component
- react-toastify
- ESLint
- Node.js

## Fitur Utama

- Registrasi dan login pengguna
- List produk dengan pencarian dan infinite scroll
- Detail produk dengan metadata dinamis
- Tambah dan hapus wishlist
- API routes untuk produk, auth, dan wishlist

## Cara Menjalankan Secara Lokal

1. Masuk ke folder aplikasi:

```bash
cd grockcicle
```

2. Install dependency:

```bash
npm install
```

3. Siapkan environment variables:

```bash
copy env-example .env.local
```

Isi file `.env.local` sesuai kebutuhan:

- `DB_CONNECTION_URI` : koneksi MongoDB
- `SECRET_KEY` : secret untuk JWT
- `NEXT_PUBLIC_BASE_URL` : base URL aplikasi (contoh: http://localhost:3000)

4. Jalankan development server:

```bash
npm run dev
```

5. Buka aplikasi di browser:

http://localhost:3000

## Tata Cara Menggunakan Website

- Buka halaman utama untuk melihat banner, informasi, dan produk unggulan.
- Masuk ke halaman Products untuk melihat semua produk dan gunakan pencarian.
- Scroll ke bawah untuk memuat produk berikutnya (infinite scroll).
- Klik produk untuk melihat detail dan menambahkan ke wishlist.
- Gunakan halaman Wishlist untuk melihat dan menghapus produk yang disimpan.
- Registrasi akun baru atau login untuk mengakses fitur wishlist.

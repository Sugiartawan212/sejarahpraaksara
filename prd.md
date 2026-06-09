# Product Requirements Document (PRD)

## 1. Project Overview
- **Project Name:** Umah Luwung Premium Portfolio
- **Agency Entity:** Bayu Komputer (Web Development Division)
- **Client Point of Contact:** Kak Sri (Umah Luwung)
- **Business Goal:** Melaunching website B2B portofolio desain interior kelas atas yang memancarkan kredibilitas, kemewahan, dan profesionalisme. Sistem harus beroperasi sebagai alat *lead generation* yang efektif untuk menarik klien *high-net-worth*.
- **Development Strategy:** Menduplikat dan merombak boilerplate website properti sebelumnya, beralih fokus dari "spesifikasi bangunan" menjadi "estetika visual dan karya interior".

## 2. Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Sanity (Headless CMS)
- **Animation:** Framer Motion (untuk micro-interactions dan scroll animations)

## 3. Core Features
- **Smart Lead Generation:** Integrasi tombol Call-to-Action (CTA) WhatsApp yang dinamis. Saat di-klik dari halaman detail proyek, pesan WhatsApp otomatis terisi dengan konteks proyek yang sedang dilihat.
- **Custom Interior Sanity Schema:** Merombak skema database lama. Menghapus field real estate (harga, jumlah kamar, tipe properti) dan menggantinya dengan parameter desain interior:
  - `Project Title`
  - `Category` (Kitchen Set, Wardrobe, Living Room, dll.)
  - `Design Style` (Modern Minimalist, Japandi, dll.)
  - `Key Materials` (Solid Wood, HPL, Marble, dll.)
  - `Timeline/Duration`
- **Dynamic Portfolio Grid:** Tampilan galeri foto interior beresolusi tinggi dengan sistem *masonry layout* yang responsif.
- **Sticky Project Navigation:** Menu navigasi bawah yang menempel (*sticky bottom nav*) pada halaman detail proyek untuk mempermudah perpindahan antara Deskripsi, Galeri, dan Spesifikasi.

## 4. Out of Scope
- Tidak ada sistem keranjang belanja (E-commerce/Cart).
- Tidak ada sistem Login/Register untuk pengguna publik (autentikasi hanya untuk Sanity Studio).
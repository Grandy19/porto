# 04. INFORMATION ARCHITECTURE & CONTENT STRATEGY (V2 REVISION)

Dokumen ini mendefinisikan peta alur pengguna, analisis arsitektur routing (Hybrid App Router), skema data _case study_, spesifikasi tujuan seksi, serta struktur seksi halaman utama.

---

## 1. Architectural Routing Analysis: Hybrid App Router

- **Halaman Utama (`/`)**: Menampilkan Hero, Projects, About, Engineering Journey, dan Contact.
- **Modal/Drawer Intercepting Route (`@modal/(.)projects/[slug]`)**: Membuka case study dalam drawer di atas halaman utama tanpa reload.
- **Direct Page Access (`/projects/[slug]`)**: Merender halaman full-page case study untuk SEO, indexing, dan OpenGraph.

---

## 2. Peta Alur Homepage Terstruktur (V2)

Berdasarkan revisi _UX flow_, struktur berurutan di Homepage adalah sebagai berikut:

1.  **Navbar**: Sticky Glassmorphic Header.
2.  **Hero Section (100vh)**: Fokus utama visual. Menyatukan elemen tipografi dominan, foto potret elegan dengan pendar halus, dan visual identitas jaringan data (_AI/Data Network_). Tombol CTA: `View Projects` & `Hire Me`.
3.  **Infinite Marquee**: Teks berjalan tanpa batas di tepi bawah layar yang merangkum _buzzwords_ keahlian (_Next.js • TypeScript • AI Models • Smart City • Data Analytics_).
4.  **Selected Projects**: Daftar kurasi _flagship projects_ (Tampilan Executive Summary 30-detik).
5.  **About Me**: Cerita singkat (Brand Story) dan Pilar Kepribadian (_Personality Pillars_).
6.  **Engineering Journey (Methodology)**: Seksi yang merangkum metodologi 7-Tahap (_Challenge_ hingga _Lessons Learned_), menegaskan kedewasaan proses rekayasa sebelum recruiter melihat lebih jauh.
7.  **Contact**: Seksi minim friksi dengan fitur _Copy Email_ 1-klik.
8.  **Footer**: Status sistem operasional dan tautan hak cipta.

---

## 3. Section Goal Specification & UX Targets

| Section            | Tujuan UX Utama (UX Goal)                                         | Metrik / Kondisi Sukses                                         |
| :----------------- | :---------------------------------------------------------------- | :-------------------------------------------------------------- |
| **Hero & Marquee** | Menggabungkan kehangatan personal dengan ketegasan _engineering_. | Menangkap perhatian emosional & rasional dalam 5 detik pertama. |
| **Projects**       | Membuktikan kompetensi melalui eksekusi.                          | Recruiter menemukan 1 project andalan dalam 15 detik pindaian.  |
| **About**          | Menjelaskan filosofi & pola pikir secara humanis.                 | Keterbacaan $< 30\text{s}$ tanpa dinding teks yang menjenuhkan. |
| **Eng. Journey**   | Menunjukkan kedewasaan proses rekayasa (alur 7-tahap).            | Engineering Manager memahami cara kandidat memecahkan masalah.  |
| **Contact**        | Menyediakan jalur komunikasi _zero-friction_.                     | Klik `Copy Email` instan tanpa mengisi form panjang.            |

---

## 4. Alur Signature Experience: Executive Summary First

Alur saat Recruiter / EM membuka proyek tertentu (Drawer terbuka):

- **Bagian 1: Executive Summary (30 Detik)**: Role, Duration, Core Problem, Key Impact Metric, Tech Stack.
- **Bagian 2: The 7-Step Engineering Journey**: Rincian Challenge, Thinking Process, Solution, Architecture Diagram, Trade-offs, Impact, Lessons Learned.

---

## 5. Expanded Complete MDX Schema

Skema `.mdx` proyek dengan atribut lengkap untuk menjamin konsistensi struktur:

```yaml
---
id: 'smart-city-traffic-analytics'
title: 'Smart Urban Traffic Analytics Platform'
category: 'Smart City / Urban Tech'
featured: true
year: '2026'
duration: '3 Months'
role: 'Lead Software Engineer & Data Architect'
executiveSummary:
  problem: 'Kemacetan perkotaan akibat pengelolaan sinyal lalu lintas yang kaku...'
  solution: 'Platform pemantauan arus lalu lintas berbasis IoT dan model prediksi AI...'
  primaryImpact: 'Menurunkan estimasi waktu tunggu persimpangan hingga 32%.'
metrics:
  - label: 'Data Pipeline Throughput'
    value: '10k+ events/sec'
# ... [Fields teks untuk The 7-Step Journey: challenge, thinkingProcess, architectureDiagram, dll]
---
```

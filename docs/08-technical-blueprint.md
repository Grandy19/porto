# 08. TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT (FINAL)

Dokumen ini merupakan kerangka kerja teknis (*Technical Blueprint*) untuk Fase 6. Seluruh keputusan desain dari Fase 1-5 akan direalisasikan dengan kepatuhan mutlak pada pedoman ketat berikut.

## A. Implementation Fidelity Rules
1.  **Prototype is the Source of Truth**: Developer tidak boleh mengubah layout, spacing, hierarchy, typography, motion, maupun visual treatment tanpa alasan teknis yang jelas.
2.  **No Downsizing**: Apabila ditemukan kendala implementasi, solusi pertama adalah mencari pendekatan teknis yang tetap mempertahankan desain, bukan menyederhanakan desain.
3.  **Strict Performance Target**: Lighthouse Performance $\ge 95$, Accessibility = 100, Best Practices = 100, SEO = 100.
4.  **Subjectivity Ban**: Tidak ada perubahan visual subjektif. Perubahan hanya diperbolehkan jika ada *blocker* teknis, masalah performa, isu aksesibilitas, atau isu *usability* yang terbukti.

---

## B. Blueprint Arsitektur

### 1. Dependency Strategy (Core & Dev)
Dependensi fondasi di-install sejak Sprint 1.
*   **Core Dependencies**:
    *   `framer-motion`
    *   `lucide-react`
    *   `next-themes`
    *   `react-hook-form` & `zod`
    *   `class-variance-authority` (cva), `clsx`, `tailwind-merge`
    *   `next-mdx-remote` *(Alasan memilih ini dibanding Contentlayer: Contentlayer saat ini sudah tidak aktif di-maintain (deprecated) dan memiliki banyak isu kompatibilitas dengan Next.js 14/15 App Router. `next-mdx-remote/rsc` adalah standar modern, sangat ringan, dan bekerja sempurna dengan React Server Components).*
    *   `gray-matter`, `reading-time`, `rehype-slug`, `rehype-autolink-headings`, `remark-gfm`.
*   **Dev Dependencies**:
    *   `prettier`, `prettier-plugin-tailwindcss`
    *   `husky`, `lint-staged`

### 2. State Management Strategy
Hindari *premature optimization*. Aturan hierarki *state*:
1.  **Local UI State** $\rightarrow$ Gunakan `useState` (contoh: *toggle dropdown*).
2.  **Shared Component State** $\rightarrow$ Gunakan React `Context` (contoh: *theme provider*).
3.  **Global State** $\rightarrow$ Gunakan `Zustand` **hanya** jika state melintasi rute halaman yang berbeda secara rumit. Dilarang menambah *global state* jika tidak mendesak.

### 3. Folder Architecture (Strict Feature-Based)
Direktori tidak boleh menjadi tempat membuang file acak.
```text
src/
 ├── app/                  # Routing App Router
 ├── components/
 │    ├── ui/              # shadcn UI & core elements
 │    ├── layout/          # Navbar, Footer
 │    ├── home/            # Hero, About, Projects Grid (Khusus Home)
 │    ├── projects/        # Komponen khusus halaman /projects
 │    ├── contact/         # Komponen khusus contact
 │    └── motion/          # Wrapper Framer Motion
 ├── content/
 │    └── projects/        # File .mdx
 ├── hooks/                # Custom React hooks (useScroll, useMediaQuery)
 ├── lib/                  # Logika eksternal (MDX parser, utils)
 ├── utils/                # Helper functions (cn, formatters)
 ├── types/                # Global TypeScript Definitions
 ├── constants/            # Static data (Navigation links, Socials)
 └── styles/               # globals.css
```

### 4. Performance Rules (Performance Budget)
1.  **Server Components (RSC)** sebagai default mutlak.
2.  **Client Components (`"use client"`)** seminimal mungkin (didorong ke *leaf node* terdalam).
3.  **Dynamic Import** (`next/dynamic`) wajib untuk komponen berat.
4.  Wajib `next/image` untuk seluruh gambar.
5.  Wajib `next/font` untuk menghilangkan CLS.
6.  **Lazy Loading**: Seluruh seksi di bawah *Hero* (Projects, About, Contact) wajib di-*lazy-load* saat di-*scroll*.
7.  Dilarang menambah *library* yang membengkakkan *bundle size* tanpa alasan jelas.

### 5. Motion Rules
*   Prinsip mutlak: **Felt, not seen.**
*   Maksimum 60 FPS (Gunakan *hardware acceleration* `transform` / `opacity`).
*   Dukungan `@media (prefers-reduced-motion: reduce)` wajib untuk seluruh animasi.
*   Tidak ada animasi yang menghambat tahap rendering awal (*blocking render*).
*   Hindari animasi yang berjalan terus-menerus tanpa henti kecuali memberikan *value* identitas (seperti ambient *Geospatial Mesh*).

### 6. SEO Strategy (Bawaan Sprint 1)
*   **Metadata API**: Konfigurasi `layout.tsx` statis dan dinamis.
*   **OpenGraph & Twitter Card**: Dinamis mengikuti parameter MDX.
*   **XML & Robots**: Auto-generate `sitemap.xml` & `robots.txt`.
*   **Structured Data**: Injeksi JSON-LD (*Person* untuk Home, *Article/Project* untuk Case Studies).

### 7. Code Quality & Engineering Standard
*   **TypeScript Strict Mode**: `strict: true`, tidak boleh ada *type* `any`.
*   **ESLint Zero Warning**: Kode tidak di-*commit* jika ada satu pun *warning*.
*   **Reusability**: Wajib merancang *reusable component*, *reusable animation*, *reusable typography*, dan *reusable layout* (mencegah duplikasi kode).

---

## C. Sprint 1 Planning (Foundation Only)
Sprint 1 tidak membuat halaman apapun, murni arsitektur teknis agar fondasi kokoh untuk skala panjang.

**Sprint 1 Deliverables**:
*   Next.js Setup (App Router, Strict TS).
*   Tailwind CSS & shadcn/ui.
*   Strict Folder Architecture (`src/`).
*   Theme Config & Design Tokens (`globals.css`).
*   Typography Setup (`next/font`).
*   Linting & Formatting (ESLint 0 warnings, Prettier plugin tailwind).
*   Git Hooks (Husky & lint-staged).
*   CI/CD (Vercel deployment prep).
*   MDX Engine Initialization (`next-mdx-remote`).

*(Sprint 2 akan fokus pada Layout dan Navbar).*

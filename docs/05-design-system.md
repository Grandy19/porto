# 05. DESIGN SYSTEM, CONTENT BUDGET, & PERFORMANCE BUDGET (REVISED)

Dokumen ini menetapkan aturan baku (_Design Tokens_), batasan konten (_Content Budget_), standar performa teknis (_Performance Budget_), serta inventarisasi komponen yang menjadi fondasi seluruh implementasi visual.

---

## 1. Performance Budget (Lighthouse $\ge 95$ Target)

- **Initial JavaScript Payload**: Maksimal **100 KB** (gzipped). Fokus pada React Server Components (RSC).
- **Images / Assets**: Maksimal **150 KB** per gambar. Wajib menggunakan `next/image` (WebP/AVIF, _lazy loading_, _blur placeholder_).
- **Custom Fonts**: Maksimal **2 varian font**. Dimuat via `next/font` (`display: swap`).
- **LCP & CLS**: LCP $< 1.5\text{s}$, CLS $< 0.05$. Dimensi gambar wajib ditetapkan (width/height).
- **INP (Interaction to Next Paint)**: $< 100\text{ms}$. Animasi mikro menggunakan kemurnian CSS.

---

## 2. Content Budget (Scannability & Rhythm)

- **Hero Section**: Positioning Statement maks 20 kata. Tech Badges maks 4.
- **About Section**: Brief Story maks 3 kalimat. Pilar Personality deskripsi maks 12 kata per pilar.
- **Projects Grid**: Title maks 6 kata. Subtitle maks 12 kata. Tech Badges maks 4. Wajib 1 Key Metric.
- **Signature Drawer**: Core Problem maks 2 kalimat. Key Metrics maks 3. Tech Stack utama maks 6.

---

## 3. Design Tokens (Variabel Semantik & Sistem)

### A. Color Semantics

| Token             | Light Mode         | Dark Mode          | Fungsi                           |
| :---------------- | :----------------- | :----------------- | :------------------------------- |
| **bg-primary**    | `bg-white`         | `bg-zinc-950`      | Latar belakang halaman utama     |
| **bg-secondary**  | `bg-zinc-50`       | `bg-zinc-900`      | Card, Drawer background          |
| **text-primary**  | `text-zinc-900`    | `text-zinc-50`     | Headline, teks bacaan utama      |
| **text-muted**    | `text-zinc-500`    | `text-zinc-400`    | Subtitle, informasi sekunder     |
| **border-subtle** | `border-zinc-200`  | `border-zinc-800`  | Divider, batas kartu tipis (1px) |
| **accent-status** | `text-emerald-600` | `text-emerald-400` | Indikator status "Available"     |

### B. Typography Scale

- **Font Family**: Primary Sans (`Inter`), Monospace (`JetBrains Mono`).
- **Scale**: `text-5xl/6xl` (Hero), `text-3xl` (Section), `text-xl/2xl` (Card Title), `text-base` (Body, lh: 1.6), `text-sm` (Badges).

### C. Responsive Grid Specification

Menggunakan sistem _12-column grid_ yang adaptif.

| Breakpoint         | Viewport            | Max Container | Columns | Gutter | Margins / Padding |
| :----------------- | :------------------ | :------------ | :------ | :----- | :---------------- |
| **Mobile (`sm`)**  | $< 640\text{px}$    | `100%`        | 4       | `16px` | `px-4` (16px)     |
| **Tablet (`md`)**  | $\ge 768\text{px}$  | `768px`       | 8       | `24px` | `px-8` (32px)     |
| **Desktop (`lg`)** | $\ge 1024\text{px}$ | `1024px`      | 12      | `32px` | `auto` (Centered) |
| **Wide (`xl`)**    | $\ge 1280\text{px}$ | `1152px`      | 12      | `32px` | `auto` (Centered) |

### D. Icon System

- **Library Utama**: `Lucide React`.
- **Spesifikasi Styling**: `stroke-width: 1.5`, `stroke-linecap: round`, `stroke-linejoin: round`.
- **Ukuran Standar**: `size: 20px` (UI elements), `size: 16px` (Badges/Micro-UI), `size: 24px` (Section Headers).
- **Aturan Penggunaan**: Ikon harus selalu berwujud _line-art_ geometris, tidak boleh _solid/filled_ kecuali untuk indikator status.

### E. Elevation System (Shadows)

Elemen visual dipisahkan kedalamannya berdasarkan peran fungsional.

| Level                 | CSS Box Shadow (Tailwind) | Penggunaan Spesifik                                    |
| :-------------------- | :------------------------ | :----------------------------------------------------- |
| **Level 0 (Flat)**    | `shadow-none`             | Default background, teks, tombol statis.               |
| **Level 1 (Subtle)**  | `shadow-sm`               | Elemen interaktif pasif, _Input Fields_.               |
| **Level 2 (Hover)**   | `shadow-md`               | Keadaan hover pada _Project Cards_, _Primary Buttons_. |
| **Level 3 (Float)**   | `shadow-lg`               | _Sticky Nav Header_, _Dropdown Menus_.                 |
| **Level 4 (Overlay)** | `shadow-2xl`              | _Drawer_, _Modals_, elemen yang memblokir layar utama. |

### F. Border & Radius System

Menghindari radius yang terlalu bulat agar mempertahankan kesan _architectural_ & profesional.

- **`radius-sm` (4px)**: Input fields, checkboxes, tag/badges kecil.
- **`radius-md` (8px)**: Buttons, pill badges menengah.
- **`radius-lg` (12px)**: Project Cards, konten _highlight_, gambar thumbnail.
- **`border-width`**: Selalu 1px solid (`border`), tidak menggunakan border lebih tebal untuk menjaga nuansa premium.

### G. Motion Tokens (Duration & Easing)

Klasifikasi animasi agar seluruh pergerakan terasa harmonis dan konsisten.

| Token Durasi | Waktu   | Kurva Easing (Tailwind / CSS)                  | Penggunaan                                          |
| :----------- | :------ | :--------------------------------------------- | :-------------------------------------------------- |
| **Fast**     | `100ms` | `ease-out` (`cubic-bezier(0, 0, 0.2, 1)`)      | _Button Press/Active, Checkbox Toggle_.             |
| **Normal**   | `150ms` | `ease-in-out` (`cubic-bezier(0.4, 0, 0.2, 1)`) | _Hover State, Opacity Change, Border Color Change_. |
| **Medium**   | `250ms` | `ease-out` (`cubic-bezier(0, 0, 0.2, 1)`)      | _Drawer Slide-In, Modal Pop, Page Transition_.      |
| **Slow**     | `400ms` | `ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`)   | _Scroll Reveal (Fade Up) awal saat halaman dimuat_. |

---

## 4. UI Component Inventory

Daftar lengkap komponen UI yang akan dibangun. Komponen di luar daftar ini dilarang dibuat kecuali melalui evaluasi khusus untuk mencegah penyimpangan.

### A. Core Elements

- **Button**: `Primary` (Solid), `Secondary` (Outline), `Ghost` (Icon-only), `Destructive` (jarang digunakan).
- **Badge**: `Tech Stack` (Monospace, muted bg), `Metric` (Accent text, border), `Status` (Pill, glowing dot).
- **Typography**: `H1`, `H2`, `H3`, `Paragraph`, `Caption`, `CodeInline`.

### B. Navigation & Shell

- **Header Nav**: Sticky, Glassmorphic backdrop, Theme Toggle button, Resume Download Button.
- **Footer**: Status indicator text, Social links row.

### C. Layout Containers

- **Section Wrapper**: Padding seragam `py-16 md:py-24`, Max-width limiter.
- **Card Container**: Base card dengan border radius 12px, subtle hover shadow.
- **Grid System**: 12-column responsive layout component.

### D. Complex Components

- **Project Executive Card**: Thumbnail image, Title, Stack Badges, Key Metric, "Deep Dive" trigger.
- **Skill Matrix Grid**: Daftar keahlian yang terkelompok per lapisan sistem.
- **Personality Pillar Card**: Icon Lucide, Title, 12-word description.
- **Signature Drawer (Slide-over)**: Panel 7-Tahap membaca case study dari kanan layar, dilengkapi tombol tutup (_close_ `X`).

### E. Forms & Feedback

- **Input / Textarea**: Minimalist border, focus ring `ring-2 ring-zinc-500`.
- **Copy-to-Clipboard Card**: Kartu email interaktif dengan klik untuk menyalin.
- **Toast Notification**: Feedback sukses instan saat menyalin kontak atau aksi berhasil.

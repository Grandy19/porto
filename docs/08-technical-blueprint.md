# 08. TECHNICAL ARCHITECTURE & IMPLEMENTATION BLUEPRINT (FINAL APPROVED)

Dokumen ini merupakan kerangka kerja teknis (_Technical Blueprint_) untuk Fase 6. Seluruh keputusan desain dari Fase 1-5 akan direalisasikan dengan kepatuhan mutlak pada pedoman ketat berikut.

## A. Implementation Fidelity Rules

1.  **Prototype is the Source of Truth**: Developer tidak boleh mengubah layout, spacing, hierarchy, typography, motion, maupun visual treatment tanpa alasan teknis yang jelas.
2.  **No Downsizing**: Apabila ditemukan kendala implementasi, solusi pertama adalah mencari pendekatan teknis yang tetap mempertahankan desain.
3.  **Strict Performance Target**: Lighthouse Performance $\ge 95$, Accessibility = 100, Best Practices = 100, SEO = 100.
4.  **Subjectivity Ban**: Perubahan visual hanya diperbolehkan jika ada _blocker_ teknis, masalah performa, isu aksesibilitas, atau isu _usability_ yang terbukti.

---

## B. Blueprint Arsitektur

### 1. Environment Configuration

Tidak boleh ada _hardcoded_ URL atau _keys_ dalam kode. Seluruh variabel lingkungan harus didaftarkan di dalam `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://grandy.web.id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_XXXXXXXX
CONTACT_EMAIL=alexander.grandy@email.com
```

### 2. Dependency Strategy (Core & Dev)

Dependensi fondasi di-install sejak awal:

- **Core**: `framer-motion`, `lucide-react`, `next-themes`, `react-hook-form`, `zod`, `class-variance-authority`, `clsx`, `tailwind-merge`, `next-mdx-remote`, `gray-matter`, `reading-time`, `rehype-slug`, `rehype-autolink-headings`, `remark-gfm`.
  _(Menggunakan `next-mdx-remote/rsc` karena *Contentlayer* sudah *deprecated* dan rawan masalah kompabilitas pada Next.js App Router)._
- **Dev**: `prettier`, `prettier-plugin-tailwindcss`, `husky`, `lint-staged`.
- **Testing**: `vitest`, `@testing-library/react`, `playwright`.

### 3. State Management Strategy

1.  **Local UI State** $\rightarrow$ `useState`
2.  **Shared Component State** $\rightarrow$ React `Context`
3.  **Global State** $\rightarrow$ `Zustand` (Hanya jika benar-benar melintasi halaman rumit. Jangan tambahkan jika sekadar "mungkin nanti dipakai").

### 4. Folder Architecture & Routing (Strict Feature-Based)

```text
src/
 ├── app/                  # Routing App Router
 │    ├── loading.tsx      # Fallback loading
 │    ├── error.tsx        # Fallback error
 │    └── not-found.tsx    # Fallback 404
 ├── components/
 │    ├── ui/              # shadcn UI & core elements
 │    ├── layout/          # Navbar, Footer
 │    ├── home/            # Hero, About, Projects Grid (Khusus Home)
 │    ├── projects/        # Komponen khusus halaman /projects
 │    ├── contact/         # Komponen khusus contact
 │    └── motion/          # Sentralisasi animasi (fade.ts, dll)
 ├── content/
 │    └── projects/        # File .mdx
 ├── hooks/                # Custom React hooks
 ├── lib/                  # Logika eksternal
 ├── utils/                # Helper functions (cn, formatters)
 ├── types/                # Global TypeScript Definitions
 ├── constants/            # Data statis
 └── styles/               # globals.css
```

**Alias Import**: `tsconfig.json` diwajibkan menggunakan alias absolut `@/*` (misal: `@/components`, `@/lib`). Dilarang keras menggunakan import relatif panjang seperti `../../../../components`.

### 5. Constants (Static Data Extraction)

Seluruh data statis dipisahkan agar _reusable_ dan terpusat:

- `constants/site.ts` (Metadata, URL)
- `constants/navigation.ts` (Links)
- `constants/socials.ts`
- `constants/skills.ts`
- `constants/projects.ts` (Jika tidak via MDX)

### 6. Animation Architecture

Sentralisasi mutlak! Dilarang keras menulis varian animasi (_inline motion variants_) yang tersebar di komponen UI. Semua animasi harus di-eksport dari `src/components/motion/`:

- `fade.ts`, `slide.ts`, `stagger.ts`, `magnetic.ts`, `parallax.ts`, `marquee.ts`.

### 7. Performance & Motion Rules

1.  **RSC Default**: _Server Components_ wajib menjadi _default_. _Client Component_ seminimal mungkin.
2.  **Dynamic Import**: Komponen berat wajib `next/dynamic`.
3.  **Image Strategy**:
    - Wajib WebP/AVIF via `<Image />`.
    - Wajib memiliki _blur placeholder_.
    - Wajib memiliki ukuran responsif.
    - Tidak boleh ada gambar $> 150\text{KB}$ kecuali terbukti mutlak diperlukan.
4.  **Motion Limits**: "Felt, not seen." Target 60 FPS, wajib menghormati `prefers-reduced-motion`, tidak _blocking render_, dan hindari animasi _looping_ tanpa nilai fungsional.

### 8. SEO Strategy

Persiapan SEO tingkat produksi sejak hari pertama:

- _Metadata API_ dinamis di setiap _layout_.
- OpenGraph & Twitter Card terpadu.
- Auto-generate `sitemap.xml` & `robots.txt`.
- _Structured Data_ (JSON-LD _Person_ untuk Home, _Project_ untuk MDX).

### 9. MDX Architecture (Zod Validation)

Seluruh `.mdx` file memiliki skema data (_frontmatter_) yang divalidasi keras melalui `Zod`.

```typescript
const ProjectSchema = z.object({
  title: z.string(),
  // ...
});
```

Gagal validasi _field_ wajib saat waktu kompilasi (_build-time_) akan menyebabkan _Build Fail_. Jangan menunggu _runtime error_.

### 10. Code Quality & Git Workflow

- **TypeScript**: Strict mode, `no any`.
- **ESLint**: Zero warning policy.
- **Reusability**: Wajib merancang _reusable component_, _typography_, _layout_.
- **Branching Strategy**: `main`, `develop`, `feature/*`, `fix/*`.
- **Conventional Commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `perf:`, `test:`, `chore:`.

### 11. Testing & CI/CD Pipeline

Fondasi _testing_ wajib ada:

- **Unit**: Vitest.
- **E2E**: Playwright.
- **Pipeline Minimal (GitHub Actions)**: `lint` $\rightarrow$ `typecheck` $\rightarrow$ `test` $\rightarrow$ `build`.
- Setiap _Pull Request_ wajib hijau di semua tahap sebelum di-_merge_.

---

## C. Sprint 1: Definition of Done (DoD)

Sprint 1 (Technical Foundation) hanya akan dianggap Selesai apabila ke-10 ceklis berikut terpenuhi:

- [ ] Clean Build ✅
- [ ] Type Check ✅
- [ ] ESLint 0 Warning ✅
- [ ] Prettier Pass ✅
- [ ] Husky Working ✅
- [ ] Preview Deployment Vercel Berhasil ✅
- [ ] Lighthouse Baseline Dicatat ✅
- [ ] Folder Architecture Final ✅
- [ ] MDX Engine Berjalan ✅
- [ ] CI Pipeline Hijau ✅

# 06. LOW-FIDELITY WIREFRAMES & STRUCTURAL LAYOUT (REVISED)

Dokumen ini mendefinisikan kerangka struktural (_structural blueprint_) untuk elemen antarmuka, mengacu pada struktur _Homepage Flow_ terbaru yang memadukan kehangatan personal dan ketegasan rekayasa teknis.

---

## 1. Global Flow & Navigation

**Alur Homepage (Scroll Linier)**:
`Navbar` $\rightarrow$ `Hero (100vh)` $\rightarrow$ `Infinite Marquee` $\rightarrow$ `Selected Projects` $\rightarrow$ `About Me` $\rightarrow$ `Engineering Journey (Teaser)` $\rightarrow$ `Contact` $\rightarrow$ `Footer`.

### Sticky Glassmorphic Header

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [Logo: GA]           [Home]  [About]  [Projects]  [Contact]            │
│                                                                        │
│                                      [Theme Toggle] [Download CV .pdf] │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Hero Section (`100vh Fullscreen`) & Infinite Marquee

Komposisi 70% identitas personal (Rique) & 30% ketegasan _engineering_ (Linear/Vercel).

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [ Navbar ]                                                             │
│                                           * [Background: Ambient Glow] │
│                                           * [Noise Texture & Network]  │
│                                           *                            │
│  [Dominant Typography H1]                 * ┌────────────────────────┐ │
│  Grandy                                   * │                        │ │
│  Alexander.                               * │      (Portrait         │ │
│                                           * │       Photo            │ │
│                                           * │       Grandy)          │ │
│  [Subtitle / Positioning]                 * │                        │ │
│  Software Engineer building intelligent   * │     [Fade out mask]    │ │
│  digital solutions...                     * │                        │ │
│                                           * └────────────────────────┘ │
│                                           *                            │
│  [Btn: View Projects] [Btn: Hire Me]      *                            │
│                                           *                            │
│  [Minimalist Tech Badges]                 *                            │
│                                                                        │
│ ────────────────────────────────────────────────────────────────────── │
│ [Infinite Marquee: • Next.js • AI Models • Smart City • TypeScript...] │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Selected Projects Section (`max-w-6xl`)

```text
┌────────────────────────────────────────────────────────────────────────┐
│  [Section Label: 01. PROJECTS]                                         │
│                                                                        │
│  ┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│  │ [ Image Thumbnail 16:9 ]        │ │ [ Image Thumbnail 16:9 ]        │
│  │                                 │ │                                 │
│  │ [Card Title: Max 6 Words]       │ │ [Card Title: Max 6 Words]       │
│  │ [Subtitle: Problem statement]   │ │ [Subtitle: Problem statement]   │
│  │ [Metric: ⚡ 40% Less Latency]    │ │ [Metric: 📊 10k Data/sec]       │
│  └─────────────────────────────────┘ └─────────────────────────────────┘
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. About Me Section (`max-w-3xl`)

```text
┌────────────────────────────────────────────────────────────────────────┐
│  [Section Label: 02. ABOUT ME]                                         │
│  [Section Title: Think Beyond Code. Build with Purpose.]               │
│                                                                        │
│  [Highlight Story Box]                                                 │
│                                                                        │
│  [Grid 2x2: Personality Pillars]                                       │
│  ┌─────────────────────────┐  ┌─────────────────────────┐              │
│  │ 🛠️ THE BUILDER          │  │ 🌐 THE SYSTEMS THINKER  │              │
│  └─────────────────────────┘  └─────────────────────────┘              │
│  ┌─────────────────────────┐  ┌─────────────────────────┐              │
│  │ 🔍 CURIOUS ENGINEER     │  │ 📈 CONTINUOUS LEARNER   │              │
│  └─────────────────────────┘  └─────────────────────────┘              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Engineering Journey Section (`max-w-4xl`)

Seksi baru di _homepage_ untuk memperkenalkan _Signature Experience_ (Alur Berpikir 7-Tahap) sebelum user mengeklik _deep-dive_ di proyek, memastikan audiens memahami metodologi Grandy.

```text
┌────────────────────────────────────────────────────────────────────────┐
│  [Section Label: 03. METHODOLOGY]                                      │
│  [Section Title: The Engineering Journey Canvas]                       │
│                                                                        │
│  [Text: Bagaimana saya memecah masalah dari abstraksi hingga kode]     │
│                                                                        │
│  [Horizontal Timeline / Grid of 7 Steps]                               │
│  1. Challenge ──► 2. Thinking Process ──► 3. The Solution              │
│  4. Architecture ──► 5. Trade-offs ──► 6. Impact ──► 7. Lessons        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Contact Section (`max-w-2xl`)

```text
┌────────────────────────────────────────────────────────────────────────┐
│  [Section Label: 04. GET IN TOUCH]                                     │
│  [Section Title: Let's Build Something Meaningful Together.]           │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐      │
│  │ 📧 alexander.grandy@email.com            [📋 Copy Email]   │      │
│  └──────────────────────────────────────────────────────────────┘      │
│                                                                        │
│  [💼 LinkedIn]  [🐙 GitHub]                                            │
└────────────────────────────────────────────────────────────────────────┘
```

# 07. HIGH-FIDELITY PROTOTYPE & UI SPECIFICATION (FINAL EXPERIENCE PASS)

Dokumen ini merupakan spesifikasi antarmuka *pixel-perfect* tingkat tertinggi. Fase ini memoles desain menjadi sebuah pengalaman visual (*immersive experience*) yang membedakan portofolio ini secara mutlak dari *template SaaS*, menetapkan identitas khas seorang Grandy Alexander melalui **Signature Moment** saat pertama kali website dibuka.

---

## 0. Signature Moment: The Entrance Sequence (Choreography)
Untuk menciptakan daya tarik visual instan yang membuat recruiter berhenti sejenak, kita menerapkan animasi pembuka yang terorkestrasi (*staggered reveal*) dengan kurva lambat dan premium (`ease: [0.16, 1, 0.3, 1]`).

*   **T=0ms (Initial State)**: Layar hitam murni `#09090B`. Navbar transparan 100% tanpa batas.
*   **T=300ms**: Latar *Ambient Glow* memudar masuk perlahan (*Fade In*, `duration: 1500ms`), menetapkan kedalaman spasial.
*   **T=500ms**: Foto Portrait muncul dari gelap menggunakan kombinasi *opacity* dan *blur filter* (dari `blur-md` ke `blur-0`), menyatu sempurna dengan *gradient mask*.
*   **T=700ms**: Teks raksasa "Grandy Alexander" terkuak dari bawah ke atas per kata (*Word-by-word slide up reveal*).
*   **T=1000ms**: *Geospatial Urban Mesh* perlahan terwujud (*Fade in*) dan mulai bernapas.
*   **T=1200ms**: *Rotating Role Text* ("Software Engineer") turun dengan elegan.
*   **T=1400ms**: Navbar links, *Infinite Marquee*, dan CTA Buttons perlahan muncul (*Subtle Fade Up*).

Hasil akhirnya adalah pembukaan sinematik yang mengunci perhatian audiens selama 2 detik pertama tanpa terasa lambat atau membuang waktu.

---

## 1. The Signature Identity: "Geospatial Urban Mesh" yang Hidup
Visual *Geospatial Urban Data Mesh* (grid topografi digital) bukan lagi lapisan statis.

*   **Fluid Motion**: Mesh bergerak otonom secara sangat lambat (*drift*) menyerupai aliran data.
*   **Mouse Reactive Parallax**: Saat kursor digerakkan, grid topografi bergeser sepersekian piksel berlawanan arah dari kursor (dengan *spring physics: mass 1, stiffness 50, damping 20*). Reaksi ini amat sangat subtil ("felt, not seen") namun memberikan ilusi kedalaman spasial nyata.

---

## 2. Typography Mastery & Rotating Text Signature
Nama "Grandy Alexander" bukan sekadar teks, melainkan jangkar struktural halaman.

*   **Responsive Scaling**: Menggunakan CSS `clamp()` (`text-[8vw]`) agar selalu proporsional dan masif.
*   **Tracking Tighter**: Pengurangan jarak antar huruf (`tracking-tighter`) agar teks terlihat solid.
*   **Signature Interaction (Rotating Role Text)**:
    *   Fokus penuh pada pergerakan vertikal *slot-machine* murni.
    *   Animasi keluar: Teks bergeser naik (`translateY(-100%)`) sambil menghilang (*fade out*).
    *   Animasi masuk: Teks baru bergeser masuk dari bawah (`translateY(100%)`) ke tengah (`translateY(0)`).
    *   Waktu tahan 2500ms, transisi cepat 350ms (`ease-out`). Halus, instan, premium, tanpa efek ketikan (*typewriter*).

---

## 3. Navbar Integration (The Invisible Anchor)
Navbar didesain untuk tidak memutuskan ilusi ruang dari Hero Section.

*   **Saat di Hero ($Y = 0$)**: Navbar benar-benar transparan tanpa warna latar, tanpa *blur*, dan tanpa *border*. Elemen navigasi terlihat seperti melayang dan menjadi bagian tak terpisahkan dari kanvas Hero.
*   **Saat Scroll ($Y > 50px$)**: Barulah navbar perlahan (*transition 300ms*) membeku menjadi *glassmorphism* tebal (`bg-zinc-950/75`, `backdrop-blur-md`, `border-b border-zinc-800`) untuk menjaga kontras teks saat melintasi seksi *Projects* dan *About*.

---

## 4. CTA with Character (Magnetic Micro-Interaction)
Tombol *View Projects* dan *Hire Me* memberikan kesan *craftsmanship* tinggi saat disentuh kursor.

*   **Magnetic Pull**: Tombol mendeteksi kursor dalam radius $40\text{px}$. Tombol akan "tertarik" secara fisik (bergeser 10-15px) ke arah kursor. Saat kursor menjauh, tombol memantul kembali ke tengah (*spring physics*).
*   **Subtle Edge Glow**: Saat di-*hover*, *border* tombol primer memancarkan pendaran tipis yang bergerak (via *conic-gradient masking* internal) yang mensimulasikan aliran energi di tepi tombol.

---

## 5. Seamless Portrait Integration
Foto potret meminjam teknik pencahayaan studio sinematik.

1.  **Gradient Masking**: Tepi bawah dan kiri foto memudar sempurna ke hitam murni.
2.  **Simulated Rim Light**: *Drop-shadow* berwarna *emerald/indigo* tipis diletakkan persis di belakang layer figur, memisahkan subjek dari gelapnya ruang belakang seolah subjek disinari dari belakang.

---

## 6. Aksesibilitas Otonom
Semua kemewahan interaksi (*parallax*, *magnetic*, *glow*, *mesh motion*) mematuhi `@media (prefers-reduced-motion: reduce)`. Jika sistem pengguna mengaktifkan pengurangan animasi, sekuens pembuka akan di-bypass dan halaman langsung dirender dalam keadaan statis solid.

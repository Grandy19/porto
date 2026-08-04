export type Certification = {
  id: string;
  title: string;
  image: string;
  pdfUrl: string;
  verificationUrl: string;
};

export const certifications: Certification[] = [
  {
    id: 'sertif-1',
    title: 'Sertifikat Visualisasi Data',
    image: '/sertif1.jpg',
    pdfUrl: '/sertifikat_visualisasi data.pdf',
    verificationUrl: '/sertifikat_visualisasi data.pdf',
  },
  {
    id: 'sertif-2',
    title: 'Sertifikat JavaScript',
    image: '/sertif2.jpg',
    pdfUrl: '/sertifikat_javascript.pdf',
    verificationUrl: '/sertifikat_javascript.pdf',
  },
  {
    id: 'sertif-3',
    title: 'Sertifikat Belajar Dasar Data Science',
    image: '/sertif3.jpg',
    pdfUrl: '/sertifikat belajar dasar data science.pdf',
    verificationUrl: '/sertifikat belajar dasar data science.pdf',
  },
  {
    id: 'sertif-4',
    title: 'Sertifikat Belajar Dasar AI',
    image: '/sertif4.jpg',
    pdfUrl: '/sertifikat belajar dasar ai.pdf',
    verificationUrl: '/sertifikat belajar dasar ai.pdf',
  },
  {
    id: 'sertif-5',
    title: 'Sertifikasi Awareness AI',
    image: '/sertif5.jpg',
    pdfUrl:
      '/SertifikasiAwarenessAI_707012400031_Sitomorang Grandy Alexander.pdf',
    verificationUrl:
      '/SertifikasiAwarenessAI_707012400031_Sitomorang Grandy Alexander.pdf',
  },
  {
    id: 'sertif-6',
    title: 'Sertifikat Lomba',
    image: '/sertif6.png',
    pdfUrl: '/[D4SIKC48-02][707012400031]_SERTIFIKAT LOMBA.pdf',
    verificationUrl: '/[D4SIKC48-02][707012400031]_SERTIFIKAT LOMBA.pdf',
  },
];

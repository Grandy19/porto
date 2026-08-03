export const siteConfig = {
  name: 'Grandy Alexander',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://grandy.web.id',
  description:
    'Software Engineer building intelligent digital solutions through Software Engineering, AI, and Data (Smart City Context).',
  links: {
    github: 'https://github.com/grandy',
    linkedin: 'https://linkedin.com/in/grandy',
    email: process.env.CONTACT_EMAIL || 'alexander.grandy@email.com',
  },
};

export type SiteConfig = typeof siteConfig;

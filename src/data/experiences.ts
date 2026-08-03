export type Experience = {
  title: string;
  category: string;
  role: string;
  subtitle: string;
  organization: string;
  year: string;
  image: string;
  description: string;
  story: string;
  skills: string[];
  highlights: string[];
  projectSlug?: string;
  imagePosition?: string;
  imageTransform?: string;
};

export const experiences: Experience[] = [
  {
    title: "BPM SIKC",
    category: "Student Representative Board",
    role: "Vice Chairman",
    subtitle: "Vice Chairman",
    organization: "Telkom University",
    year: "2025",
    image: "/SO1.jpeg",
    description: "Led student initiatives, coordinated organizational programs, and supported strategic leadership across the representative board.",
    story: "Served as the Vice Chairman of the Student Representative Board (BPM SIKC), overseeing internal governance, legislation, and student advocacy across the institution.",
    skills: ["Strategic Leadership", "Public Policy", "Team Coordination", "Conflict Resolution"],
    highlights: ["Oversaw 5+ student commissions", "Drafted foundational organizational bylaws", "Facilitated institutional student hearings"],
    imagePosition: "50% 100%",
    imageTransform: "translateY(-14%) scale(1.25)"
  },
  {
    title: "National Competition",
    category: "Innovation & UX Award",
    role: "Lead UI/UX & Product Designer",
    subtitle: "The Best Innovation",
    organization: "National Tech Competition",
    year: "2025",
    image: "/CO1.jpeg",
    description: "Designed an innovative user experience recognized for creativity, usability, and real-world problem solving.",
    story: "Awarded 'The Best Innovation' for conceptualizing and prototyping an inclusive digital product focused on accessible education and assistive technology.",
    skills: ["User Research", "Interactive Prototyping", "Design Systems", "Usability Testing"],
    highlights: ["Awarded The Best Innovation", "Tested with 30+ real target users", "Created 50+ high-fidelity screen flows"],
    imagePosition: "50% 80%"
  },
  {
    title: "IWP Projects",
    category: "Digital Innovation",
    role: "Startup Co-Founder & Tech Lead",
    subtitle: "Startup Co-Founder",
    organization: "IWP Projects",
    year: "2026",
    image: "/TD1.jpeg",
    description: "Building innovative digital solutions through user-centered design and modern software engineering.",
    story: "Co-founded a digital innovation studio focusing on engineering scalable web applications, enterprise platforms, and bespoke digital experiences for startups and SMEs.",
    skills: ["Next.js", "TypeScript", "System Architecture", "Product Strategy"],
    highlights: ["Co-founded agile engineering studio", "Delivered 3+ enterprise digital products", "Implemented robust CI/CD and design systems"],
    projectSlug: "dashboard-iwp",
    imagePosition: "50% 50%"
  },
  {
    title: "UX Teaching Assistant",
    category: "Academic & Mentorship",
    role: "Teaching Assistant",
    subtitle: "HCI Laboratory Mentor",
    organization: "HCI & Design Laboratory",
    year: "2026",
    image: "/UX1.jpeg",
    description: "Mentored students in user-centered design, prototyping, and usability evaluation during practical sessions.",
    story: "Guided 60+ university students in mastering Human-Computer Interaction (HCI) methodologies, heuristic evaluations, Figma prototyping, and design thinking workflows.",
    skills: ["HCI Methodologies", "Figma", "Heuristic Evaluation", "Design Mentorship"],
    highlights: ["Mentored 60+ computer science students", "Curated 10+ design critique workshops", "Reviewed 30+ term project submissions"],
    imagePosition: "50% 50%"
  },
  {
    title: "HarmonyKids Project",
    category: "Social Impact & Inclusion",
    role: "Full Stack Developer & UI/UX",
    subtitle: "Special Needs Platform",
    organization: "Inclusive Tech Initiative",
    year: "2024",
    image: "/HK1.jpeg",
    description: "Collaborated to design and develop an inclusive digital platform for children with special needs.",
    story: "Engineered an accessible web platform designed to assist parents, educators, and therapists in tracking developmental milestones and educational exercises for children.",
    skills: ["React", "Tailwind CSS", "Accessibility (a11y)", "User Testing"],
    highlights: ["Built accessible UI with WCAG AA standards", "Implemented interactive milestone tracking", "Featured in inclusive education showcase"],
    projectSlug: "harmonykids",
    imagePosition: "50% 30%"
  },
  {
    title: "Web Teaching Assistant",
    category: "Academic & Mentorship",
    role: "Teaching Assistant",
    subtitle: "Web Engineering Mentor",
    organization: "Web Engineering Laboratory",
    year: "2025",
    image: "/WB1.jpeg",
    description: "Mentored students in web development fundamentals, frontend implementation, and practical programming concepts.",
    story: "Conducted practical lab sessions covering modern frontend architectures, responsive design, JavaScript ES6+, API integration, and standard Git collaboration practices.",
    skills: ["JavaScript", "HTML/CSS", "Git Workflow", "Frontend Architecture"],
    highlights: ["Conducted 14+ hands-on coding lab sessions", "Trained students in modern Git workflows", "Graded and guided capstone web applications"]
  }
];

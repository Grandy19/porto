export type ProcessStep = {
  research: string;
  insights: string;
  solution: string;
  outcome: {
    description: string;
    highlights: string[];
  };
};

export type GalleryImage = {
  src: string;
  alt: string;
  size: 'large' | 'small' | 'wide';
};

export type ProjectData = {
  slug: string;
  title: string;
  shortDescription: string;
  heroDescription?: string;
  role: string;
  year: string;
  duration: string;
  category: string;
  status: string;
  team: string;
  platform: string;
  contribution: string;
  liveUrl?: string;
  githubUrl?: string;
  thumbnailUrl: string;
  heroUrl?: string;
  stack: string[];
  overview: React.ReactNode;
  process: ProcessStep;
  features: string[];
  gallery: GalleryImage[];
};

export const projects: ProjectData[] = [
  {
    slug: 'growcare',
    title: 'GrowCare',
    shortDescription: 'Empowering parents of children with special needs through an integrated digital platform that combines developmental monitoring and specialist consultations.',
    heroDescription: 'Helping parents monitor, support, and nurture children with special needs through one digital platform.',
    role: 'UI/UX Designer',
    year: '2025',
    duration: '3 Months',
    category: 'Healthcare Platform',
    status: 'Competition Project',
    team: '5 Members',
    platform: 'Mobile Application',
    contribution: 'UI/UX Design, Prototyping, User Research',
    thumbnailUrl: '/Growcare (2).jpg',
    heroUrl: '/projectgrowcare.png',
    stack: ['Figma', 'Design Systems', 'Prototyping'],
    overview: (
      <>
        GrowCare is a <span className="font-bold text-zinc-50">digital healthcare platform</span> that helps parents of children with special needs <span className="font-bold text-zinc-50">monitor their child's development</span> and <span className="font-bold text-zinc-50">connect with trusted specialists</span> through one <span className="font-bold text-zinc-50">seamless experience</span>.
      </>
    ),
    process: {
      research: 'Interviewed parents of children with special needs to understand their daily challenges in developmental monitoring, healthcare access, and communication with specialists.',
      insights: 'Parents often struggle with scattered medical records, limited access to specialists, and the lack of a simple way to monitor their child\'s developmental progress over time.',
      solution: 'Created a unified digital healthcare platform that combines developmental tracking, specialist consultations, and centralized medical records into one seamless experience.',
      outcome: {
        description: 'Designed a user-centered healthcare experience that simplifies how parents monitor child development, connect with trusted specialists, and manage essential medical information through a single digital platform.',
        highlights: [
          'Development Tracking',
          'Specialist Consultation',
          'Medical Records',
          'User-Centered Experience'
        ]
      }
    },
    features: [
      'Specialized Developmental Milestone Tracker',
      'Direct Tele-consultation with Specialists',
      'Centralized Medical History Vault',
      'Community Support Forum',
      'Progress Visualization Charts'
    ],
    gallery: [
      { src: '/growcaredg1.jpg', alt: 'Home Dashboard & Healthcare Facilities', size: 'large' },
      { src: '/growcaredg2.jpg', alt: 'Specialist Consultation & Parent Community', size: 'small' },
      { src: '/growcaredg3.jpg', alt: 'Child Development & Health Articles', size: 'small' },
      { src: '/grocaredg5.jpg', alt: 'Child Profile & Schedule Management', size: 'wide' }
    ]
  },
  {
    slug: 'dashboard-iwp',
    title: 'Dashboard IWP',
    shortDescription: 'An internal sales dashboard that enables distributors to monitor sales performance through interactive data visualization.',
    role: 'Frontend Engineer & UI/UX',
    year: '2026',
    duration: 'Ongoing',
    category: 'Enterprise SaaS',
    status: 'Production',
    team: '4 Members',
    platform: 'Web Application',
    contribution: 'Frontend Development, UI/UX Design, Data Visualization',
    thumbnailUrl: '/iwpaint (3).jpg',
    heroUrl: '/diwp.png',
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Chart.js'],
    overview: (
      <>
        Dashboard IWP is an <strong className="font-semibold text-white">internal sales analytics platform</strong> helping distributors <strong className="font-semibold text-white">monitor sales performance, visualize KPIs, and make informed business decisions</strong> efficiently.
      </>
    ),
    process: {
      research: 'Analyzed the reporting workflow of distributors and supervisors who relied on fragmented spreadsheets and delayed sales reports.',
      insights: 'Fragmented sales data reduced visibility into performance, making KPI tracking and business reporting inefficient.',
      solution: 'Developed a centralized sales dashboard that consolidates distributor data into interactive visualizations and KPI monitoring.',
      outcome: {
        description: 'Delivered a centralized analytics platform that simplified sales reporting and improved visibility into distributor performance.',
        highlights: [
          'Sales Performance Monitoring',
          'KPI Tracking',
          'Interactive Dashboards',
          'Centralized Reporting'
        ]
      }
    },
    features: [
      'Real-time Sales Performance Tracking',
      'Interactive Data Visualization with Chart.js',
      'Regional Heatmaps and Comparison Tools',
      'Customizable Report Generation',
      'Role-based Access Control'
    ],
    gallery: [
      { src: '/11.jpg', alt: 'Admin Dashboard', size: 'wide' },
      { src: '/12.jpg', alt: 'Sales Dashboard', size: 'small' },
      { src: '/13.jpg', alt: 'Supervisor Dashboard', size: 'small' },
      { src: '/14.jpg', alt: 'Head of Distribution Dashboard', size: 'large' }
    ]
  },
  {
    slug: 'harmonykids',
    title: 'HarmonyKids',
    shortDescription: 'An integrated web platform that helps parents discover, compare, and enroll in kindergartens, playgroups, and daycare centers with ease.',
    role: 'Full Stack Developer & UI/UX',
    year: '2024',
    duration: '6 Months',
    category: 'EdTech Platform',
    status: 'Completed',
    team: '3 Members',
    platform: 'Web Application',
    contribution: 'Full Stack Development, Database Design, UI/UX',
    thumbnailUrl: '/Harmonykids (2).jpg',
    heroUrl: '/Halaman Beranda (7).png',
    liveUrl: 'https://harmonykids.free.nets.web.id',
    stack: ['Laravel', 'TailwindCSS', 'MySQL', 'REST API'],
    overview: (
      <>
        HarmonyKids empowers parents to <strong className="font-semibold text-white">discover, compare, and connect</strong> with <strong className="font-semibold text-white">trusted early childhood education providers</strong> through an integrated digital platform.
      </>
    ),
    process: {
      research: 'Interviewed parents to uncover the challenges of discovering trusted early childhood education providers and understanding their decision-making process.',
      insights: 'Finding suitable institutions was often time-consuming due to fragmented information and the lack of a centralized comparison platform.',
      solution: 'Created HarmonyKids, an integrated platform that combines school discovery, comparison, transportation, and enrollment into one seamless experience.',
      outcome: {
        description: 'Delivered a scalable platform that simplifies how parents discover and access trusted early childhood education services.',
        highlights: [
          'Smart Discovery',
          'Institution Comparison',
          'Digital Enrollment',
          'Seamless Experience'
        ]
      }
    },
    features: [
      'Location-based Search and Discovery',
      'Advanced Filtering (Curriculum, Price, Facilities)',
      'Detailed Institution Profiles',
      'Verified Parent Reviews and Ratings',
      'Institution Management Dashboard (CMS)'
    ],
    gallery: [
      { src: '/hk1.jpg', alt: 'Home Dashboard & HarmoFind', size: 'large' },
      { src: '/hk2.jpg', alt: 'HarmoRide & HarmoView', size: 'wide' },
      { src: '/hk3.jpg', alt: 'HarmoTalk & HarmoTalent', size: 'small' },
      { src: '/hk4.jpg', alt: 'HarmoTale & Institution Registration', size: 'small' }
    ]
  },
  {
    slug: 'farmora',
    title: 'Farmora',
    shortDescription: 'A modern marketplace empowering local growers to connect with plant enthusiasts through digital commerce.',
    heroDescription: 'A digital marketplace connecting plant enthusiasts with local growers through a seamless shopping experience.',
    role: 'Backend & UI/UX',
    year: '2025',
    duration: '2 Months',
    category: 'Software Engineering',
    status: 'Completed',
    team: '4 Members',
    platform: 'Web Application',
    contribution: 'Full Stack Development, UI/UX Design',
    thumbnailUrl: '/farmorap.jpg',
    heroUrl: '/farmoram.png',
    stack: ['Laravel', 'MySQL', 'Tailwind CSS'],
    overview: (
      <>
        Farmora is a <strong className="font-semibold text-zinc-50">digital marketplace</strong> connecting plant enthusiasts with <strong className="font-semibold text-zinc-50">trusted local growers</strong> while promoting <strong className="font-semibold text-zinc-50">sustainable agriculture</strong> and supporting <strong className="font-semibold text-zinc-50">local farming communities</strong>.
      </>
    ),
    process: {
      research: 'Analyzed the needs of plant enthusiasts and local growers to identify challenges in digital plant commerce.',
      insights: 'Local growers lacked a dedicated platform to showcase products and connect directly with potential buyers.',
      solution: 'Developed a digital marketplace integrating product discovery, grower profiles, and community features into one platform.',
      outcome: {
        description: 'Delivered a functional marketplace prototype that streamlines plant trading while supporting local growers and sustainable agriculture.',
        highlights: ['Marketplace', 'Community', 'Grower Profiles', 'Secure Transactions']
      }
    },
    features: ['Plant Marketplace', 'Local Gardener Profiles', 'Secure Transactions'],
    gallery: [
      { src: '/16.jpg', alt: 'Home Dashboard & Green Market', size: 'large' },
      { src: '/17.jpg', alt: 'Product Details & Grower Store', size: 'wide' },
      { src: '/18.jpg', alt: 'Farm Schedule & Community', size: 'small' },
      { src: '/19.jpg', alt: 'Articles & Account', size: 'small' }
    ]
  },
  {
    slug: 'trix',
    title: 'TRIX',
    shortDescription: 'A smart waste management platform rewarding citizens for recycling while promoting sustainable environmental practices.',
    heroDescription: 'A smart waste management platform rewarding communities for responsible recycling and sustainable environmental practices.',
    role: 'UI/UX Design',
    year: '2026',
    duration: '3 Months',
    category: 'Smart City',
    status: 'Completed',
    team: '4 Members',
    platform: 'Web App Application',
    contribution: 'Backend Architecture, Integration',
    thumbnailUrl: '/trixp.jpg',
    heroUrl: '/trixx.png',
    stack: ['Laravel', 'Tailwind CSS', 'MySQL'],
    overview: (
      <>
        TRIX is a <strong className="font-semibold text-zinc-50">Smart City platform</strong> transforming <strong className="font-semibold text-zinc-50">waste management</strong> through <strong className="font-semibold text-zinc-50">community participation</strong>, <strong className="font-semibold text-zinc-50">recycling incentives</strong>, and <strong className="font-semibold text-zinc-50">sustainable environmental practices</strong>.
      </>
    ),
    process: {
      research: 'Analyzed urban waste management challenges and citizen behavior to identify opportunities for improving recycling participation.',
      insights: 'Reward-based gamification can significantly increase public engagement in responsible waste disposal and recycling activities.',
      solution: 'Designed a digital platform that rewards citizens with redeemable points for responsible waste disposal and recycling.',
      outcome: {
        description: 'Developed a Smart City platform promoting sustainable waste management through community participation and reward-based recycling.',
        highlights: ['Smart City', 'Waste Management', 'Gamification', 'Reward System']
      }
    },
    features: ['Point System', 'Waste Tracking', 'Leaderboards'],
    gallery: [
      { src: '/21.jpg', alt: 'TRIX Gallery 1', size: 'large' },
      { src: '/22.jpg', alt: 'TRIX Gallery 2', size: 'wide' },
      { src: '/23.jpg', alt: 'TRIX Gallery 3', size: 'small' },
      { src: '/24.jpg', alt: 'TRIX Gallery 4', size: 'small' }
    ]
  },
  {
    slug: 'inkluvia',
    title: 'Inkluvia',
    shortDescription: 'A speech-to-text learning platform helping hearing-impaired students understand Pancasila through accessible digital education.',
    heroDescription: 'An inclusive learning platform powered by speech-to-text technology for hearing-impaired students.',
    role: 'Frontend Developer & UI/UX',
    year: '2026',
    duration: '4 Months',
    category: 'Inclusive Education',
    status: 'Completed',
    team: '4 Members',
    platform: 'Web App Application',
    contribution: 'AI Model Integration, UX Design',
    thumbnailUrl: '/inkluviap.jpg',
    heroUrl: '/inluviaa.png',
    stack: ['Speech to Text', 'NLP', 'Figma', 'UI/UX'],
    overview: (
      <>
        Inkluvia leverages <strong className="font-semibold text-zinc-50">AI and speech-to-text technology</strong> to create <strong className="font-semibold text-zinc-50">accessible Pancasila learning experiences</strong> for <strong className="font-semibold text-zinc-50">hearing-impaired junior high school students</strong>.
      </>
    ),
    process: {
      research: 'Conducted user research with educators to identify learning challenges faced by hearing-impaired junior high school students.',
      insights: 'Accessible real-time transcription improves learning experiences by helping students understand spoken classroom content.',
      solution: 'Developed an AI-powered learning platform integrating speech-to-text technology to support accessible Pancasila education.',
      outcome: {
        description: 'Delivered an inclusive learning platform that enhances educational accessibility for hearing-impaired students through AI-powered speech recognition.',
        highlights: ['Accessibility', 'Speech-to-Text', 'Artificial Intelligence', 'Natural Language Processing']
      }
    },
    features: ['Real-time Transcription', 'Sign Language Dictionary', 'Interactive Quizzes'],
    gallery: [
      { src: '/26.jpg', alt: 'Speech-to-Text', size: 'large' },
      { src: '/27.jpg', alt: 'Learning History & Quiz', size: 'wide' },
      { src: '/28.jpg', alt: 'Settings & Teachers Account', size: 'small' },
      { src: '/29 (2).jpg', alt: 'Student Quiz & Learning Summary', size: 'small' }
    ]
  },
  {
    slug: 'waves',
    title: 'WAVES',
    shortDescription: 'An IoT-based water monitoring system for detecting leaks and improving industrial water management efficiency.',
    heroDescription: 'An IoT-based water monitoring system for leak detection and efficient industrial water management.',
    role: 'IoT Engineer',
    year: '2025',
    duration: '3 Months',
    category: 'IoT',
    status: 'Completed',
    team: '5 Members',
    platform: 'Web Application',
    contribution: 'Sensor Integration, Dashboard Development',
    thumbnailUrl: '/wavesp.jpg',
    heroUrl: '/wavess.png',
    stack: ['IoT', 'Dashboard Monitoring', 'Sensor'],
    overview: (
      <>
        WAVES is an <strong className="font-semibold text-zinc-50">IoT-based water monitoring platform</strong> providing <strong className="font-semibold text-zinc-50">real-time monitoring</strong>, <strong className="font-semibold text-zinc-50">leak detection</strong>, and <strong className="font-semibold text-zinc-50">analytics</strong> to improve <strong className="font-semibold text-zinc-50">industrial water management</strong>.
      </>
    ),
    process: {
      research: 'Analyzed industrial water consumption patterns and identified common causes of water leakage and system inefficiencies.',
      insights: 'Undetected water leaks reduce operational efficiency, increase costs, and contribute to unnecessary resource waste.',
      solution: 'Developed an IoT-based monitoring system integrating flow sensors with a real-time dashboard for continuous water monitoring.',
      outcome: {
        description: 'Delivered an intelligent monitoring solution enabling early leak detection and supporting efficient industrial water management.',
        highlights: ['IoT', 'Real-Time Monitoring', 'Leak Detection', 'Data Analytics']
      }
    },
    features: ['Leak Detection', 'Usage Analytics', 'Automated Alerts'],
    gallery: [
      { src: '/wavess.png', alt: 'WAVES Gallery 1', size: 'wide' }
    ]
  },
  {
    slug: 'personal-portfolio',
    title: 'Personal Portfolio',
    shortDescription: 'A modern portfolio showcasing software projects, technical expertise, and interactive digital experiences.',
    heroDescription: 'A modern developer portfolio showcasing innovative software projects, technical expertise, and impactful digital experiences.',
    role: 'Frontend Engineer',
    year: '2026',
    duration: '1 Month',
    category: 'Personal Brand',
    status: 'Live',
    team: 'Solo',
    platform: 'Web Application',
    contribution: 'Design, Development, Deployment',
    liveUrl: '/',
    thumbnailUrl: '/portop.jpg',
    heroUrl: '/portov.png',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    overview: (
      <>
        A modern developer portfolio featuring <strong className="font-semibold text-zinc-50">software engineering projects</strong>, <strong className="font-semibold text-zinc-50">technical expertise</strong>, and <strong className="font-semibold text-zinc-50">interactive digital experiences</strong> built with <strong className="font-semibold text-zinc-50">performance and usability</strong> in mind.
      </>
    ),
    process: {
      research: 'Analyzed modern developer portfolios and award-winning websites to identify best practices in design, performance, and user experience.',
      insights: 'A portfolio should demonstrate technical expertise through real projects, intuitive interactions, and a seamless user experience.',
      solution: 'Developed a modern portfolio using Next.js, Framer Motion, and Tailwind CSS with immersive animations and responsive design.',
      outcome: {
        description: 'Created a professional portfolio showcasing my projects, technical expertise, and personal brand through an engaging user experience.',
        highlights: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
      }
    },
    features: ['Interactive Elements', 'Dynamic Routing', 'Responsive Design'],
    gallery: [
      { src: '/porto1.png', alt: 'Portfolio Home Page', size: 'large' },
      { src: '/porto3.png', alt: 'Portfolio About', size: 'wide' },
      { src: '/perbaikan1.png', alt: 'Portfolio Projects', size: 'small' },
      { src: '/porto2.png', alt: 'Portfolio Contact', size: 'small' }
    ]
  },
  {
    slug: 'spbe-kota-bontang',
    title: 'SPBE Kota Bontang',
    shortDescription: 'An enterprise architecture strategy supporting SPBE implementation and Smart City transformation in Bontang City.',
    heroDescription: 'An SPBE architecture design supporting digital government transformation and Smart City development in Bontang.',
    role: 'Enterprise Architect',
    year: '2026',
    duration: '6 Months',
    category: 'Smart City',
    status: 'Completed',
    team: '3 Members',
    platform: 'Architecture Document',
    contribution: 'TOGAF Modeling, Requirements Gathering',
    thumbnailUrl: '/bontangp.jpg',
    heroUrl: '/fotobontang.png',
    stack: ['TOGAF ADM', 'Enterprise Architecture'],
    overview: (
      <>
        A <strong className="font-semibold text-zinc-50">strategic enterprise architecture project</strong> designing an <strong className="font-semibold text-zinc-50">SPBE framework</strong> to support <strong className="font-semibold text-zinc-50">integrated digital government services</strong> in Kota Bontang.
      </>
    ),
    process: {
      research: 'Analyzed existing government business processes, policies, and information systems to identify digital transformation opportunities.',
      insights: 'Fragmented systems and isolated data limited operational efficiency and hindered integrated public service delivery.',
      solution: 'Designed an SPBE enterprise architecture using TOGAF ADM to standardize business processes, applications, data, and technology.',
      outcome: {
        description: 'Produced a strategic enterprise architecture blueprint supporting integrated digital governance and Smart City transformation in Kota Bontang.',
        highlights: ['TOGAF ADM', 'SPBE', 'Enterprise Architecture', 'Visual Paradigm']
      }
    },
    features: ['Business Architecture', 'Data Architecture', 'Application Architecture'],
    gallery: [
      { src: '/31.jpg', alt: 'Preliminary Phase', size: 'large' },
      { src: '/32.jpg', alt: 'Architecture Vision', size: 'wide' },
      { src: '/33.jpg', alt: 'Business Architecture', size: 'small' },
      { src: '/34.jpg', alt: 'Information System Architecture', size: 'small' },
      { src: '/35.jpg', alt: 'Technology Architecture', size: 'small' }
    ]
  },
  {
    slug: 'employee-attrition-prediction',
    title: 'Employee Attrition Prediction',
    shortDescription: 'A predictive machine learning system helping organizations identify employee attrition risks before resignation occurs.',
    heroDescription: 'Developed a machine learning model to predict employee attrition using HR analytics and predictive modeling.',
    role: 'Data Scientist',
    year: '2026',
    duration: '2 Months',
    category: 'Machine Learning',
    status: 'Completed',
    team: '3 Members',
    platform: 'Streamlit Python',
    contribution: 'Data Preprocessing, Model Training, Evaluation',
    thumbnailUrl: '/employep.jpg',
    heroUrl: '/employep.png',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Machine Learning'],
    overview: (
      <>
        A <strong className="font-semibold text-zinc-50">machine learning project</strong> developing an <strong className="font-semibold text-zinc-50">employee attrition prediction model</strong> using <strong className="font-semibold text-zinc-50">HR analytics</strong> to support <strong className="font-semibold text-zinc-50">proactive workforce retention</strong> and <strong className="font-semibold text-zinc-50">data-driven decision-making</strong>.
      </>
    ),
    process: {
      research: 'Analyzed HR analytics data to identify employee characteristics and behavioral patterns associated with employee attrition.',
      insights: 'Identified key attrition factors through exploratory data analysis and feature importance evaluation.',
      solution: 'Developed and optimized an SVM classification model using SMOTE and hyperparameter tuning, then deployed the solution as an interactive web application with Streamlit for real-time employee attrition prediction.',
      outcome: {
        description: 'Built an end-to-end employee attrition prediction system by training an optimized SVM model with SMOTE and deploying it as an interactive Streamlit web application.',
        highlights: ['Support Vector Machine', 'Neural Network', 'Decision Tree', 'Hyperparameter Optimization']
      }
    },
  features: ['Interactive Elements', 'Dynamic Routing', 'Responsive Design'],
    gallery: [
      { src: '/employep.png', alt: 'Prediction Input & Parameters', size: 'large' },
      { src: '/employe2.png', alt: 'Prediction Output & Risk Analysis', size: 'wide' },
      { src: '/employe3.png', alt: 'Model Performance & Confusion Matrix', size: 'small' },
    ]
  }
];

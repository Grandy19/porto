export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  role: string;
  techStack: string[];
  impactMetrics: string[];
  link: string;
  isFeatured: boolean;
};

// TODO: Replace with real project data provided by the user.
// Using structured placeholders as requested, without making false claims.
export const projects: Project[] = [
  {
    id: 'featured-1',
    title: '[Featured Project Name - Smart City / AI]',
    shortDescription: '[Detailed description of the problem solved and the engineering approach]',
    role: '[Role e.g., Lead AI Engineer]',
    techStack: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
    impactMetrics: ['[Metric 1 e.g., Reduced latency]', '[Metric 2 e.g., Handled 1M+ reqs]'],
    link: '#',
    isFeatured: true,
  },
  {
    id: 'standard-1',
    title: '[Supporting Project 1]',
    shortDescription: '[Brief description of the project]',
    role: '[Role]',
    techStack: ['[Tech A]', '[Tech B]'],
    impactMetrics: ['[Metric]'],
    link: '#',
    isFeatured: false,
  },
  {
    id: 'standard-2',
    title: '[Supporting Project 2]',
    shortDescription: '[Brief description of the project]',
    role: '[Role]',
    techStack: ['[Tech X]', '[Tech Y]'],
    impactMetrics: ['[Metric]'],
    link: '#',
    isFeatured: false,
  },
];

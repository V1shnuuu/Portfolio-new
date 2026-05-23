import { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', level: 88, category: 'Frontend' },
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'HTML/CSS', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 72, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 80, category: 'Frontend' },

  // Backend
  { name: 'Python', level: 87, category: 'Backend' },
  { name: 'SQL', level: 75, category: 'Backend' },
  { name: 'Java', level: 65, category: 'Backend' },
  { name: 'Node.js', level: 68, category: 'Backend' },

  // ML/AI
  { name: 'TensorFlow', level: 80, category: 'ML/AI' },
  { name: 'Keras', level: 78, category: 'ML/AI' },
  { name: 'Deep Learning', level: 75, category: 'ML/AI' },
  { name: 'Computer Vision', level: 72, category: 'ML/AI' },
  { name: 'Data Analytics', level: 70, category: 'ML/AI' },

  // Design
  { name: 'Figma', level: 85, category: 'Design' },
  { name: 'Photoshop', level: 75, category: 'Design' },
  { name: 'After Effects', level: 70, category: 'Design' },
  { name: 'UI/UX Design', level: 82, category: 'Design' },
  { name: 'Wireframing', level: 80, category: 'Design' },

  // Tools
  { name: 'Git', level: 85, category: 'Tools' },
  { name: 'VS Code', level: 90, category: 'Tools' },
  { name: 'Jupyter Notebook', level: 78, category: 'Tools' },

  // Blockchain
  { name: 'BnB Chain', level: 60, category: 'Blockchain' },
  { name: 'Smart Contracts', level: 55, category: 'Blockchain' },

  // Networking
  { name: 'CCNA', level: 70, category: 'Networking' },
  { name: 'Cybersecurity', level: 65, category: 'Networking' },
  { name: 'MongoDB', level: 68, category: 'Networking' },
];

export const skillCategories = [
  'Frontend',
  'Backend',
  'ML/AI',
  'Design',
  'Tools',
  'Blockchain',
  'Networking',
] as const;

export const marqueeSkills: string[] = [
  'React.js',
  'Python',
  'TensorFlow',
  'Figma',
  'TypeScript',
  'Keras',
  'UI/UX',
  'Deep Learning',
  'JavaScript',
  'Git',
  'SQL',
  'After Effects',
  'Photoshop',
  'CCNA',
  'MongoDB',
  'Computer Vision',
];

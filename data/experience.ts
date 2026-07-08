import { ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    id: 'intulogic-intern',
    role: 'Software Intern',
    company: 'Intulogic Pvt. Ltd.',
    period: 'Nov 2025 – Dec 2025',
    description: [
      'Integrated into production-grade software development workflows.',
      'Contributed to debugging sessions and feature implementation cycles.',
      'Worked with modern toolchains and industry-standard development practices.',
    ],
    type: 'work',
  },
  {
    id: 'revatura-intern',
    role: 'UI/UX Design Intern',
    company: 'Revatura',
    period: 'May 2025 – Jun 2025',
    description: [
      'Designed wireframes and responsive layout systems in Figma.',
      'Ran usability testing sessions and applied user feedback to iterative design revisions.',
      'Contributed to a scalable component library for the product design system.',
    ],
    type: 'work',
  },
  {
    id: 'bnb-hackathon',
    role: 'BnB Chain Hackathon — Finalist',
    company: 'Evo Arena',
    period: '2025',
    description: [
      'Reached national finalist level at the Evo Arena BnB Chain Hackathon.',
      'Built a decentralized finance solution under 48-hour hackathon conditions.',
      'Competed against hundreds of teams in blockchain innovation.',
    ],
    type: 'achievement',
  },
  {
    id: 'microlabs-hackathon',
    role: 'Microlabs Hackathon — Finalist',
    company: 'Microlabs',
    period: '2025',
    description: [
      'Achieved finalist recognition for the Fever Oracle healthcare monitoring system.',
      'Demonstrated ML-powered clinical tools to a panel of industry judges.',
    ],
    type: 'achievement',
  },
  {
    id: 'cybersecurity-workshop',
    role: 'Cybersecurity Workshop',
    company: 'Technical Training Program',
    period: '2024',
    description: [
      'Completed advanced cybersecurity workshop focused on threat detection.',
      'Practiced network security analysis and vulnerability assessment techniques.',
    ],
    type: 'achievement',
  },
  {
    id: 'cit-education',
    role: 'B.E. Computer Science & Engineering',
    company: 'Chennai Institute of Technology',
    period: '2024 – 2028',
    description: [
      'Specializing in Machine Learning, Full-Stack Development, and Systems Design.',
      'Active in hackathons, technical workshops, and open-source projects.',
      'Building at the intersection of engineering and creative technology.',
    ],
    type: 'education',
  },
];

export const certifications = [
  'C for Beginners — Coursera',
  'Advanced HTML/CSS — Coursera',
  'CCNA: Introduction to Networks — Cisco',
  'Websites using WordPress — Coursera',
  'App with Azure Cognitive Services — Microsoft',
  'MongoDB Basics — MongoDB',
] as const;

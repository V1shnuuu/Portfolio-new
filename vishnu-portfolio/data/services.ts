import { Service } from '@/types';

export const services: Service[] = [
  {
    title: 'Creative Frontend Development',
    description: 'Transforming designs into dynamic web platforms with fluid micro-interactions, responsive grids, and high-performance smooth scrolling.',
    icon: 'layout',
    features: [
      'Lenis smooth scroll configurations',
      'Complex GSAP layouts and pinning',
      'TypeScript strict typing integrations',
      'Tailwind fluid layouts and dark themes',
    ],
  },
  {
    title: 'UI/UX Interactive Design',
    description: 'Constructing custom design systems, wireframes, and prototypes focusing on accessible visual hierarchies and dark-mode elegance.',
    icon: 'figma',
    features: [
      'Figma wireframing and prototyping',
      'Consistent design system tokens',
      'A11y (WCAG) accessibility standards',
      'User journey mapping & usability audits',
    ],
  },
  {
    title: 'Machine Learning Pipelines',
    description: 'Training and deploying lightweight deep learning models, classification engines, and custom predictions mapped through REST APIs.',
    icon: 'brain',
    features: [
      'PyTorch classification networks',
      'XGBoost anomaly detections',
      'Interactive visual dashboards',
      'FastAPI web endpoints hosting models',
    ],
  },
];

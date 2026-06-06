import { CaseStudy } from '@/types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'fever-oracle-case-study',
    slug: 'fever-oracle',
    title: 'How ML Caught Fever 4 Hours Before Symptoms Appeared',
    client: 'Academic Research Project',
    category: 'Machine Learning / Healthcare',
    year: '2024',
    thumbnail: '/images/case-studies/fever-oracle-thumb.jpg',
    heroImage: '/images/case-studies/fever-oracle-hero.jpg',
    tagline: 'Predicting health crises before they happen — with 89% accuracy.',
    challenge:
      'Traditional healthcare systems rely on reactive monitoring: a patient spikes a fever, a nurse notices, and treatment begins. This delay — often 2-6 hours — can be critical. The challenge was building a system that detects the statistical signature of an impending fever in vital sign data, before the temperature rises.',
    solution:
      'We built Fever Oracle: a TensorFlow/Keras LSTM model trained on 15,000+ vital sign sequences (heart rate, SpO₂, skin temp, respiration rate). The model learned the subtle multi-variate pattern that precedes fever onset. A real-time React dashboard surfaces predictions with confidence scores and time-to-event estimates for clinical staff.',
    process: [
      {
        step: 1,
        title: 'Data Collection & Cleaning',
        description: 'Curated 15,000+ anonymized patient vital sign records, handled missing values, and created 4-hour rolling window sequences as model input.',
        icon: 'Database',
      },
      {
        step: 2,
        title: 'Feature Engineering',
        description: 'Derived 12 statistical features per window (mean, variance, rate-of-change) across 4 vital signs. Applied MinMax normalization for model stability.',
        icon: 'BarChart',
      },
      {
        step: 3,
        title: 'Model Architecture',
        description: 'Designed a 2-layer LSTM with dropout for time-series pattern recognition. Trained with binary cross-entropy loss, optimized with Adam.',
        icon: 'Brain',
      },
      {
        step: 4,
        title: 'Dashboard Development',
        description: 'Built a real-time React dashboard with WebSocket data feeds, alert thresholds, patient list view, and confidence score visualizations.',
        icon: 'Monitor',
      },
      {
        step: 5,
        title: 'Validation & Testing',
        description: 'Evaluated on a held-out 20% test set. Achieved 89% accuracy, 0.91 AUC-ROC. Validated with clinical feedback on alert relevance.',
        icon: 'CheckCircle',
      },
    ],
    metrics: [
      { label: 'Detection Accuracy', value: '89%', change: 'vs 0% for rule-based', isPositive: true },
      { label: 'Early Warning Time', value: '2-4 hrs', change: 'Before symptom onset', isPositive: true },
      { label: 'AUC-ROC Score', value: '0.91', change: 'Near clinical-grade', isPositive: true },
      { label: 'False Positive Rate', value: '8%', change: 'Low alarm fatigue', isPositive: true },
    ],
    before: '/images/case-studies/fever-oracle-before.jpg',
    after: '/images/case-studies/fever-oracle-after.jpg',
    testimonial: {
      text: 'Vishnu\'s Fever Oracle demonstrated that accessible hardware combined with modern ML can provide predictive capability that was previously only available in ICU settings. The architecture is sound and clinically sensible.',
      author: 'Research Advisor',
      role: 'Department of Computer Science, CIT Chennai',
    },
    tech: ['Python', 'TensorFlow', 'Keras', 'LSTM', 'React.js', 'WebSocket', 'Data Analytics'],
    projectId: 'fever-oracle',
  },
];

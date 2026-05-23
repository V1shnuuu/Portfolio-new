import { useInView, IntersectionOptions } from 'react-intersection-observer';

interface ScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.1, triggerOnce = true } = options;
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return [ref, inView] as const;
}

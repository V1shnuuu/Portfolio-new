import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useGSAPTimeline(options: gsap.TimelineVars = {}) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline(options);
    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  return timelineRef;
}

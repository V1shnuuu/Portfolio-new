import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis smooth scroll
    const lenisInstance = new Lenis({
      duration: 1.4,
      lerp: 0.08,
    });

    setLenis(lenisInstance);

    // Bind Lenis animation frame updates to GSAP ticker
    const updateRaf = (time: number) => {
      // gsap ticker time is in seconds, Lenis raf expects milliseconds
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);

    // Reset GSAP ticker lag smoothing to coordinate with Lenis scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenisInstance.destroy();
    };
  }, []);

  return lenis;
}

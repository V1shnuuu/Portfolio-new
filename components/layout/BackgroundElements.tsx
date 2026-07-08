'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function BackgroundElements() {
  const shouldReduceMotion = useReducedMotion();

  // Floating animation configuration for shapes
  const floatAnimation = (duration: number, yOffset: number, xOffset: number, rotate: number) => ({
    y: shouldReduceMotion ? 0 : [0, yOffset, 0],
    x: shouldReduceMotion ? 0 : [0, xOffset, 0],
    rotate: shouldReduceMotion ? 0 : [0, rotate, 0],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
    },
  });

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-[-1] overflow-hidden pointer-events-none bg-slate-50/50"
      aria-hidden="true"
    >
      {/* 1. Global Light Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.4] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 2. Gradient Mesh Layer (More Vibrant) */}
      <motion.div
        className="absolute inset-0 opacity-[0.35]"
        animate={shouldReduceMotion ? {} : {
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle at 15% 50%, rgba(139, 92, 246, 0.45), transparent 45%), radial-gradient(circle at 85% 30%, rgba(0, 217, 255, 0.45), transparent 45%), radial-gradient(circle at 50% 80%, rgba(255, 0, 110, 0.35), transparent 50%)',
          backgroundSize: '200% 200%',
          filter: 'blur(70px)',
        }}
      />

      {/* 3. Dotted Grid Pattern Layer */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%2364748b'/%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
        }}
      />

      {/* 4. Floating Geometric Shapes (Increased Opacity & Scale) */}
      {/* Shape 1: Cyan Polygon */}
      <motion.div
        className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full border-[1px] border-accent-cyan/20 bg-gradient-to-br from-accent-cyan/15 to-transparent mix-blend-multiply"
        animate={floatAnimation(25, -50, 30, 20)}
        style={{ filter: 'blur(30px)' }}
      />

      {/* Shape 2: Violet Blob */}
      <motion.div
        className="absolute top-[35%] right-[0%] w-[600px] h-[400px] rounded-[100px] bg-gradient-to-tr from-accent-violet/15 to-transparent mix-blend-multiply"
        animate={floatAnimation(20, 60, -40, -15)}
        style={{ filter: 'blur(40px)' }}
      />

      {/* Shape 3: Pink Accent */}
      <motion.div
        className="absolute bottom-[0%] left-[20%] w-[450px] h-[450px] rounded-full bg-gradient-to-t from-accent-pink/15 to-transparent border-[1px] border-accent-pink/20 mix-blend-multiply"
        animate={floatAnimation(22, -40, -30, 25)}
        style={{ filter: 'blur(35px)' }}
      />

      {/* Shape 4: Extra Indigo Accent for depth */}
      <motion.div
        className="absolute top-[60%] left-[60%] w-[350px] h-[350px] rounded-full bg-gradient-to-bl from-accent-indigo/15 to-transparent mix-blend-multiply"
        animate={floatAnimation(28, 40, 40, -20)}
        style={{ filter: 'blur(40px)' }}
      />
    </div>
  );
}

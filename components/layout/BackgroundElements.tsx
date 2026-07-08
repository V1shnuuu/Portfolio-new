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
      className="fixed inset-0 w-screen h-screen z-[-1] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* 1. Gradient Mesh Layer */}
      <motion.div
        className="absolute inset-0 opacity-[0.15]"
        animate={shouldReduceMotion ? {} : {
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle at 15% 50%, rgba(139, 92, 246, 0.4), transparent 40%), radial-gradient(circle at 85% 30%, rgba(0, 217, 255, 0.4), transparent 40%), radial-gradient(circle at 50% 80%, rgba(255, 0, 110, 0.3), transparent 50%)',
          backgroundSize: '200% 200%',
          filter: 'blur(60px)',
        }}
      />

      {/* 2. Dotted Grid Pattern Layer */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%230f172a'/%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 3. Floating Geometric Shapes */}
      {/* Shape 1: Cyan Polygon */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full border-[1px] border-accent-cyan/10 bg-gradient-to-br from-accent-cyan/5 to-transparent"
        animate={floatAnimation(25, -40, 20, 15)}
        style={{ filter: 'blur(20px)' }}
      />

      {/* Shape 2: Violet Blob */}
      <motion.div
        className="absolute top-[40%] right-[5%] w-[500px] h-[300px] rounded-[100px] bg-gradient-to-tr from-accent-violet/10 to-transparent"
        animate={floatAnimation(20, 50, -30, -10)}
        style={{ filter: 'blur(30px)' }}
      />

      {/* Shape 3: Pink Accent */}
      <motion.div
        className="absolute bottom-[5%] left-[30%] w-[350px] h-[350px] rounded-full bg-gradient-to-t from-accent-pink/5 to-transparent border-[1px] border-accent-pink/10"
        animate={floatAnimation(22, -30, -20, 20)}
        style={{ filter: 'blur(25px)' }}
      />
    </div>
  );
}

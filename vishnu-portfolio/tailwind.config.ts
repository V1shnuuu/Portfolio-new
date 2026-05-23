import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}', // In case we put components there
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        'surface-elevated': '#1a1a1a',
        text: {
          primary: '#ffffff',
          muted: '#a1a1aa',
          faint: '#52525b',
        },
        accent: {
          violet: '#8b5cf6',
          indigo: '#6366f1',
          glow: 'rgba(139,92,246,0.15)',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '8xl': '7rem',
        '9xl': '9rem',
        '10xl': '11rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 20px rgba(139,92,246,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(139,92,246,0.5)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'violet-glow': 'radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)',
      },
    },
  },
  plugins: [],
}

export default config;

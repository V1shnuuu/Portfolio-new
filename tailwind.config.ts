import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
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
          cyan: '#00D9FF',
          pink: '#FF006E',
          purple: '#8338EC',
          glow: 'rgba(139,92,246,0.15)',
          'cyan-glow': 'rgba(0,217,255,0.15)',
          'pink-glow': 'rgba(255,0,110,0.15)',
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
        'glow-pulse-cyan': 'glowPulseCyan 3s ease-in-out infinite',
        'glow-pulse-pink': 'glowPulsePink 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'count-up': 'countUp 1s ease-out forwards',
        'slide-down': 'slideDown 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'page-in': 'pageIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
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
        glowPulseCyan: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0,217,255,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0,217,255,0.5)' },
        },
        glowPulsePink: {
          '0%,100%': { boxShadow: '0 0 20px rgba(255,0,110,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(255,0,110,0.5)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pageIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'violet-glow': 'radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(ellipse at center, rgba(0,217,255,0.15) 0%, transparent 70%)',
        'pink-glow': 'radial-gradient(ellipse at center, rgba(255,0,110,0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)',
        'tri-gradient': 'linear-gradient(135deg, #00D9FF 0%, #8338EC 50%, #FF006E 100%)',
        'cyan-violet': 'linear-gradient(135deg, #00D9FF 0%, #8b5cf6 100%)',
        'violet-pink': 'linear-gradient(135deg, #8338EC 0%, #FF006E 100%)',
      },
      boxShadow: {
        'glow-violet': '0 0 30px rgba(139,92,246,0.3)',
        'glow-cyan': '0 0 30px rgba(0,217,255,0.3)',
        'glow-pink': '0 0 30px rgba(255,0,110,0.3)',
        'glow-lg': '0 0 60px rgba(139,92,246,0.4)',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config

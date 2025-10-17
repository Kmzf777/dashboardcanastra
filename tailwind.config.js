/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium Design System Colors
        'space-black': '#0A0E14',
        'surface-elevated': '#151B26',
        'surface-hover': '#1C2530',
        'primary-cyan': '#00F5FF',
        'secondary-purple': '#8B5CF6',
        'secondary-purple-light': '#A78BFA',
        'success-green': '#10B981',
        'warning-amber': '#F59E0B',
        'danger-red': '#EF4444',
        'text-primary': '#F9FAFB',
        'text-secondary': '#9CA3AF',
        'text-tertiary': '#6B7280',
        'border-subtle': '#1F2937',
        'border-emphasis': '#374151',
      },
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
        '4xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        '2xl': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '600' }],
        'lg': ['1.125rem', { lineHeight: '1.3', fontWeight: '600' }],
        'sm': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
        'xs': ['0.75rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      backdropBlur: {
        'premium': '20px',
      },
      backdropSaturate: {
        '180': '1.8',
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'count-up': 'count-up 1s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.33)',
            opacity: '1',
          },
          '80%, 100%': {
            transform: 'scale(2.33)',
            opacity: '0',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'shimmer': {
          '0%': {
            transform: 'translateX(-100%) skewX(-12deg)',
          },
          '100%': {
            transform: 'translateX(200%) skewX(-12deg)',
          },
        },
        'count-up': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 245, 255, 0.6)',
          },
        },
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'glow-cyan': '0 0 20px rgba(0, 245, 255, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card-hover': '0 32px 64px -12px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #00F5FF 0%, #8B5CF6 100%)',
        'gradient-surface': 'linear-gradient(135deg, rgba(21, 27, 38, 0.6) 0%, rgba(28, 37, 48, 0.4) 100%)',
      },
    },
  },
  plugins: [],
}
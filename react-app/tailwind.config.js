/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Azul Profissional do Governo
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#1E3A8A', // Azul navy profissional
          600: '#1E40AF',
          700: '#1E3A8A',
          800: '#1E3A8A',
          900: '#0F172A',
          DEFAULT: '#1E3A8A',
        },
        // Secondary: Vermelho Profissional (Hero)
        secondary: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#991B1B', // Vermelho burgundy profissional
          600: '#7F1D1D',
          700: '#7F1D1D',
          800: '#7F1D1D',
          900: '#450A0A',
          DEFAULT: '#991B1B',
        },
        // Accent: Teal Profissional
        accent: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#0F766E', // Teal profissional
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          DEFAULT: '#0F766E',
        },
        // Green: Verde Profissional
        green: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#047857', // Verde profissional
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          DEFAULT: '#047857',
        },
        // Neutrals: Preto e Cinzas Oficiais MS
        neutral: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#C6C6C6', // Cinza claro oficial MS
          400: '#9A9A9A',
          500: '#6E6E6E',
          600: '#3C3C3C', // Cinza escuro oficial MS
          700: '#2E2E2E',
          800: '#1A1A1A',
          900: '#020203', // Preto oficial MS
        },
        // Feedback colors - Cores profissionais
        success: '#047857', // Verde profissional
        warning: '#D97706', // Âmbar profissional
        error: '#B91C1C', // Vermelho profissional
        info: '#1E40AF', // Azul navy profissional
        // Textos
        text: {
          primary: '#020203', // Preto oficial MS
          secondary: '#3C3C3C', // Cinza escuro oficial MS
          disabled: '#C6C6C6', // Cinza claro oficial MS
        },
        bg: {
          body: '#F5F5F5',
          surface: '#FFFFFF',
        },
        border: '#C6C6C6', // Cinza claro oficial MS
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        heading: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
        strong: '0 8px 32px rgba(0, 0, 0, 0.16)',
        'card-hover': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      maxWidth: {
        container: '1200px',
      },
      height: {
        header: '70px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

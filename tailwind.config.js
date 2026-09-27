/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0a0b',
        surface: '#111113',
        hairline: 'rgba(255,255,255,0.08)',
        hairlineStrong: 'rgba(255,255,255,0.16)',
        ink: '#ededec',
        muted: '#98999e',
        faint: '#616268',
        accent: '#c8a15c',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
        prose: '46rem',
      },
      transitionDuration: {
        150: '150ms',
      },
    },
  },
  plugins: [],
}

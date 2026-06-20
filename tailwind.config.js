/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        paper: '#F4EEE1', cream: '#FBF7EE', ink: '#17120F', inksoft: '#2A231E',
        cinnabar: '#A8362B', cinnabarDark: '#7E261E', gold: '#C2922F',
        jade: '#3F6B57', clay: '#8C5A3C',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        cn: ['"Noto Serif SC"', '"Songti SC"', '"Source Han Serif SC"', '"SimSun"', 'serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
};

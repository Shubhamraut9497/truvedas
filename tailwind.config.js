module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        // override blue scale so existing `blue-*` classes use #1976d2 as the main tone
        blue: {
          50:  '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1976d2', // primary
          700: '#1565c0',
          800: '#0d47a1',
          900: '#08297a',
          DEFAULT: '#1976d2'
        },
        // explicit primary alias for convenience
        primary: '#1976d2'
      }
    }
  },
  plugins: [],
};
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C00',
        secondary: '#FFD700',
        gray: {
          dark: '#424242',
          mid: '#616161',
          light: '#757575',
          lighter: '#9E9E9E',
        },
        background: {
          light: '#F8F8F8',
          border: '#E0E0E0',
        }
      },
      spacing: {
        '12': '12px',
        '16': '16px',
      },
      borderRadius: {
        '8': '8px',
        '20': '20px',
      }
    },
  },
  plugins: [],
}


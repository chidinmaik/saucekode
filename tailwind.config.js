// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000080', // Custom blue
        secondary: '#FFA500', // Custom orange
        accent: '#F59E0B', // Custom yellow
        dark: '#111827', // Custom dark
        light: '#F3F4F6', // Custom light gray
        customRed: '#EF4444', // Custom red
      }, 
    },
  },
  plugins: [],
}

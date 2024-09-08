/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'chat-background': "url('/chat-bg-pattern.png')",
      },
    },
  },
  plugins: [],
};

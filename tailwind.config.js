/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'chat-background':
          "url('https://img.freepik.com/premium-vector/seamless-pattern-with-different-social-media-icons_405287-75.jpg')",
      },
    },
  },
  plugins: [],
};

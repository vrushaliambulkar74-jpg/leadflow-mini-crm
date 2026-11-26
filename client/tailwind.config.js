/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { brand: '#3E1F9E', canvas: '#F7F7FC' }, boxShadow: { soft: '0 10px 35px rgba(31, 25, 71, .06)' } } },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // You can extend more colors if needed
                'brand-indigo': '#5c6ac4',
                'brand-violet': '#8b5cf6',
                'brand-cyan': '#06b6d4',
            },
            animation: {
                'slide-up': 'slide-up 0.5s ease-out forwards',
                'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
                'bounce-slow': 'bounce 2s infinite',
                'float': 'float 3s ease-in-out infinite alternate',
            },
            keyframes: {
                'slide-up': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                'fade-in-up': {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                'float': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-10px)' },
                },
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            // Optional: you can add custom utilities if needed
            addUtilities({
                '.text-glow': {
                    textShadow: '0 0 8px rgba(255,255,255,0.6)',
                },
            });
        }),
    ],
    darkMode: ["class"], // compatible with shadcn dark mode
};

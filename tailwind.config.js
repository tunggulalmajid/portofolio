import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                navy: {
                    900: '#151929',
                    800: '#1e2235',
                    700: '#252a40',
                    600: '#2d3350',
                },
                accent: {
                    DEFAULT: '#4ade80',
                    dark: '#22c55e',
                    light: '#86efac',
                },
            },
            keyframes: {
                'scroll-left': {
                    '0%':   { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                'scroll-left': 'scroll-left 30s linear infinite',
            },
        },
    },

    plugins: [forms],
};

const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js, jsx}', './components/**/*.{js, jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        navy: {
          400: '#18338c',
          500: '#122669',
          600: '#0c1a46',
          700: '#091334',
          800: '#060d23',
          900: '#030611'
        }
      },
      screens: {
        xs: '500px',
      },
      backgroundImage: {
        'hero': "url('~/public/hero.jpg')",
      },
      keyframes: {
        'fade-in-right': {
          '0%': {
              opacity: '0',
              transform: 'translateX(10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateX(0)'
          },
        'fade-in-left': {
          '0%': {
              opacity: '1',
              transform: 'translateX(-10px)'
          },
          '100%': {
              opacity: '0',
              transform: 'translateX(0)'
          },
        }
      }
    },
      animation: {
        'cursor': 'ping .65s ease-in-out infinite',
        'fade-in-right': 'fade-in-right 0.5s ease-out',
        'fade-in-left': 'fade-in-left 0.5s ease-out'
       }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.4xl') },
        'h2': { fontSize: theme('fontSize.2xl') },
        'h3': { fontSize: theme('fontSize.xl') },
        'a': { padding: theme('spacing.2') }
      })
    }),
    plugin(function({ addComponents, theme }) {
      const buttons = {
        '.nav-btn': {
          padding: `${theme('spacing.2')} ${theme('spacing.8')}`,
        },
        // ...
      }

      addComponents(buttons)
    })
  ],
}

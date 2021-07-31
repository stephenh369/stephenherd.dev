const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.{js, jsx}', './components/**/*.{js, jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.4xl') },
        'h2': { fontSize: theme('fontSize.2xl') },
        'h3': { fontSize: theme('fontSize.lg') },
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

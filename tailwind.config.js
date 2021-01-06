const theme2 = {
  stroke: '#001858',
  main: '#fffffe',
  background: '#f3d2c1',
  paragraph: '#172c66',
  highlight: '#8bd3dd',
  secondary: '#fef6e4',
  tertiary: '#e53170',
  ok: '#60D394',
}

module.exports = {
  purge: ['./pages/**/*.tsx'],
  theme: {
    fontFamily: {
      serif: ['PT Serif', 'serif'],
      mono: ['SF Mono', 'Menlo', 'monospace'],
    },
    extend: {
      borderWidth: {
        3: '3px',
      },
      colors: theme2,
    },
  },
  variants: {},
  plugins: [],
}

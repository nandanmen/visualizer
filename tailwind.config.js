const theme1 = {
  stroke: '#001858',
  main: '#f3d2c1',
  highlight: '#fef6e4',
  secondary: '#8bd3dd',
  tertiary: '#f582ae',
}

const theme2 = {
  stroke: '#001858',
  main: '#fffffe',
  background: '#f3d2c1',
  paragraph: '#172c66',
  highlight: '#8bd3dd',
  secondary: '#fef6e4',
  tertiary: '#e53170',
}

module.exports = {
  purge: [],
  theme: {
    fontFamily: {
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

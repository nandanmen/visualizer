const theme1 = {
  stroke: '#001858',
  main: '#f3d2c1',
  highlight: '#fef6e4',
  secondary: '#8bd3dd',
  tertiary: '#f582ae',
}

const theme2 = {
  stroke: 'black',
  main: '#fffffe',
  paragraph: '#a7a9be',
  highlight: '#8bd3dd',
  secondary: '#fef6e4',
  tertiary: '#e53170',
}

module.exports = {
  purge: [],
  theme: {
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

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/patterns/sliding-window/find-all-averages',
        permanent: false,
      },
    ]
  },
}

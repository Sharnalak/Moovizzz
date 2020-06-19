module.exports = {
  siteMetadata: {
    title: `Moovizz`
  },
  plugins: [
    `source-plugin-themoviedb`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
};

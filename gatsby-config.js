module.exports = {
  siteMetadata: {
    title: `Fusion Japan`,
    description: `Sushi Restaurant in Woodland Park Colorado offering, Thai, Japanese, and Chinese inspired dishes.`,
    author: `@nicbovee`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-173917314-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false, 
      },
    }
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `y8mm766yw6ku`,
        accessToken: `340PWA9yugcqUhDs5P_Z14NafNbzSsPEfwQFvAnSR5E`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    {
      singularName: "page",
      queryParams: {
        publicationState:
          process.env.GATSBY_IS_PREVIEW === "true" ? "preview" : "live",
        populate: {
          category: { populate: "*" },
          cover: "*",
          blocks: {
            populate: "*",
          },
        },
      },
    },
  ],
  singleTypes: [],
};

module.exports = {
  siteMetadata: {
    title: `first gatsby site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
  ],
};

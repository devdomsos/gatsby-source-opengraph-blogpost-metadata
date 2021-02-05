# gatsby-source-opengraph-blogpost-metadata

Pull opengraph metadata from opengraph.io API. You need to get your API key from opengraph.io 

# Metadata Response Example

in your graphql

```
{
    allOgMetadataNode {
        edges {
        node {
            title
            description
            id
            url
            favicon
            articlePublishedTime
            image
            site_name
    }
}
```

# Gatsby-config.js
```
{
      resolve: `gatsby-source-opengraph-blogpost-metadata`,
      options: {
        apiKey: 'your_api_key',
        articlesUrlArray: 'articlesUrlsArray[]',
      }
    },
```

Have fun! 
# gatsby-source-bandcamp

A Gatsby plugin to retrieve data from Bandcamp

> The plugin uses https://github.com/ndungujan23/mixjar under the hood.

Learn more about [Gatsby](https://www.gatsbyjs.org/) and its plugins here: [https://www.gatsbyjs.org/docs/plugins/](https://www.gatsbyjs.org/docs/plugins/) <br />

## Install

```bash
npm install gatsby-source-bandcamp
```

## How to use

```js
// gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-bandcamp`,
    options: {
      // Put your bandcamp access token here
      // docs -> https://bandcamp.com/developer
      accessToken: "YOUR-BANDCAMP-ACCESS-TOKEN",
    },
  },
]
```

## GraphQL Queries

To see all possible queries please use the GraphiQL editor which is available under `http://localhost:8000/___graphql`

### Get all projects of the user:

```graphql
query {
  allBandcamp {
    edges {
      node {
        id
        description
      }
    }
  }
}
```

## License

[MIT](LICENSE) &copy; Alexandre Ferreira.

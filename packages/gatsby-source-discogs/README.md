# gatsby-source-discogs

A Gatsby plugin to retrieve data from [Discogs API](https://www.discogs.com/developers)

> The plugin uses https://github.com/bartve/disconnect under the hood.

Learn more about [Gatsby](https://www.gatsbyjs.org/) and its plugins here: [https://www.gatsbyjs.org/docs/plugins/](https://www.gatsbyjs.org/docs/plugins/) <br />

## Install

```bash
npm install gatsby-source-discogs
```

## How to use

```js
// gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-discogs`,
  },
]
```

## GraphQL Queries

To see all possible queries please use the GraphiQL editor which is available under `http://localhost:8000/___graphql`

### Get all projects of the user:

```graphql
query {
  allDiscogs {
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

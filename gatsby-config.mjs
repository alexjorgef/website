/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Copyright (C) 2022  Lennart Jörgens
 * Copyright (C) 2022  Alexandre Ferreira
 */

/* eslint-disable import/no-default-export */
import path from "path"
import dotenv from "dotenv"
import remarkSlug from "remark-slug"
import remarkGfm from "remark-gfm"
import remarkSmartyPants from "remark-smartypants"
import rehypeMetaAsAttributes from "@lekoarts/rehype-meta-as-attributes"
import camelCase from "lodash.camelcase"
import { withDefaults } from "./src/utils/with-defaults.mjs"
import { capitalize } from "./src/utils/capitalize.mjs"
import { slugifyOptions } from "./src/utils/slugify.mjs"
import { site } from "./src/constants/meta.mjs"

dotenv.config()

const {
  GATSBY_GITHUB_TOKEN,
  GATSBY_GITLAB_TOKEN,
  GATSBY_FORMSPREE_ID,
  GATSBY_RECAPTCHA_V2_SITE_KEY,
  GATSBY_DISQUS_NAME,
  GATSBY_DISCOGS_USERNAME,
  GATSBY_DISCOGS_TOKEN,
  GATSBY_MIXCLOUD_USERNAME,
  GATSBY_BANDCAMP_USERNAME,
  ANALYSE_BUNDLE,
  // GATSBY_DISCOGS_TOKEN,
} = process.env

if (!GATSBY_GITHUB_TOKEN) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A GitHub access token as GATSBY_GITHUB_TOKEN is required to build some parts of the website.`)
}

if (!GATSBY_GITLAB_TOKEN) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A GitLab access token as GATSBY_GITLAB_TOKEN is required to build some parts of the website.`)
}

if (!GATSBY_FORMSPREE_ID) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A Formspree identifier as GATSBY_FORMSPREE_ID is required to build some parts of the website.`)
}

if (!GATSBY_RECAPTCHA_V2_SITE_KEY) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A reCAPTCHA v2 site key as GATSBY_RECAPTCHA_V2_SITE_KEY is required to build some parts of the website.`)
}

if (!GATSBY_DISQUS_NAME) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A Disqus shortname as GATSBY_DISQUS_NAME is required to build some parts of the website.`)
}

if (!GATSBY_BANDCAMP_USERNAME) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A Bandcamp username as GATSBY_BANDCAMP_USERNAME is required to build some parts of the website.`)
}

if (!GATSBY_DISCOGS_USERNAME || !GATSBY_DISCOGS_TOKEN) {
  console.warn(`Check the README https://github.com/alexjorgef/website#readme\n
  A Disqus shortname as GATSBY_DISCOGS_USERNAME and a token GATSBY_DISCOGS_TOKEN is required to build some parts of the website.`)
}

const options = withDefaults({})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const gatsbyConfig = {
  siteMetadata: {
    siteTitle: site.title,
    siteTitleDefault: site.titleDefault,
    siteAuthorName: site.authorName,
    siteAuthorSurname: site.authorSurname,
    siteAuthorLabel: site.authorLabel,
    siteAuthorEmail: site.authorEmail,
    siteAuthorNickname: site.authorNickname,
    siteAuthorAddress: site.authorAddress,
    siteAuthorAddressCity: site.authorAddressCity,
    siteAuthorAddressZip: site.authorAddressZip,
    siteAuthorAddressProvince: site.authorAddressProvince,
    siteAuthorAddressCountry: site.authorAddressCountry,
    siteUrl: site.url,
    siteDescription: site.description,
    siteImage: site.defaultOgImage,
    linkedin: site.linkedin,
    github: site.github,
    gitlab: site.gitlab,
    instagram: site.instagram,
    twitter: site.twitter,
    stackoverflow: site.stackoverflow,
    telegram: site.telegram,
    wakatime: site.wakatime,
  },
  trailingSlash: `never`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.writingSource,
        path: options.writingSource,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.gardenSource,
        path: options.gardenSource,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.awesomeSource,
        path: options.awesomeSource,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.portfolioSource,
        path: options.portfolioSource,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: options.dataSource,
        path: options.dataSource,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `src/pages`,
      },
    },
    GATSBY_GITHUB_TOKEN && {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GitHub`,
        fieldName: `github`,
        url: `https://api.github.com/graphql`,
        headers: {
          Authorization: `bearer ${GATSBY_GITHUB_TOKEN}`,
        }
      },
    },
    GATSBY_GITLAB_TOKEN && {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GitLab`,
        fieldName: `gitlab`,
        url: `https://gitlab.com/api/graphql`,
        headers: {
          Authorization: `bearer ${GATSBY_GITLAB_TOKEN}`,
        }
      },
    },
    GATSBY_MIXCLOUD_USERNAME && {
      resolve: `@alexjorgef/gatsby-source-mixcloud`,
      options: {
        username: GATSBY_MIXCLOUD_USERNAME,
      },
    },
    GATSBY_DISCOGS_TOKEN && {
      resolve: `@alexjorgef/gatsby-source-discogs`,
      options: {
        username: GATSBY_DISCOGS_USERNAME,
        api_token: GATSBY_DISCOGS_TOKEN,
      },
    },
    GATSBY_BANDCAMP_USERNAME && {
      resolve: `@alexjorgef/gatsby-source-bandcamp`,
      options: {
        username: GATSBY_BANDCAMP_USERNAME,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              quality: 90,
              linkImagesToOriginal: true,
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkSlug, remarkSmartyPants],
          rehypePlugins: [rehypeMetaAsAttributes],
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node }) => capitalize(camelCase(node.name)),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-vanilla-extract`,
    `gatsby-plugin-image`,
    // Overwrite the default "slugify" option
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.resolve(`src/pages`),
        slugify: slugifyOptions,
        ignore: {
          patterns: [`**/*.css.ts`],
        },
      },
    },
    {
      resolve: `@chakra-ui/gatsby-plugin`,
      options: {
        resetCSS: true,
        portalZIndex: 40,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: site.titleDefault,
        short_name: site.title,
        description: site.description,
        start_url: `/`,
        background_color: `#0f172a`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
        excludes: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/privacy-policy`,
          `/legal-notice`,
        ],
        query: `#graphql
        {
          posts: allPost(filter: { published: { eq: true } } ) {
            nodes {
              path: slug
              lastmod: lastUpdated
            }
          }
          garden: allGarden {
            nodes {
              lastmod: lastUpdated
              path: slug
            }
          }
          other: allSitePage(filter: { pluginCreator: { name: { ne: "default-site-plugin" } } } ) {
            nodes {
              path
            }
          }
        }
        `,
        resolveSiteUrl: () => site.url,
        resolvePages: ({ posts, garden, other }) => [].concat(posts.nodes, garden.nodes, other.nodes),
        serialize: ({ path: pagePath, lastmod }) => ({
          url: pagePath,
          lastmod,
        }),
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `#graphql
        {
          site {
            siteMetadata {
              title: siteTitleDefault
              description: siteDescription
              siteUrl
              site_url: siteUrl
            }
          }
        }
        `,
        feeds: [
          {
            query: `#graphql
            {
              posts: allPost(filter: {published: {eq: true}}, sort: {date: DESC}) {
                nodes {
                  title
                  date
                  description
                  slug
                }
              }
              garden: allGarden(sort: {lastUpdated: DESC}) {
                nodes {
                  title
                  date: lastUpdated(formatString: "MMM DD, YYYY")
                  description
                  slug
                }
              }
            }
            `,
            serialize: ({ query: { site: s, posts, garden } }) => {
              // Combine posts and garden + sort them by date
              const allEntries = [...posts.nodes, ...garden.nodes].sort(
                (a, b) => Date.parse(b.date) - Date.parse(a.date)
              )

              return allEntries.map((node) => {
                const url = `${s.siteMetadata.siteUrl}${node.slug}`
                const content = `<p>${node.description}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: node.title,
                  url,
                  guid: url,
                  date: node.date,
                  description: node.description,
                  custom_elements: [{ "content:encoded": content }],
                }
              })
            },
            output: `/rss.xml`,
            title: site.titleDefault,
            language: `en`,
            image_url: `${site.url}/social/logo-60w.png`,
          },
        ],
      },
    },
    // {
    //   resolve: `@aurorafossorg/gatsby-plugin-feed-reproducible`,
    //   options: {
    //     query: `#graphql
    //     {
    //       site {
    //         siteMetadata {
    //           title: siteTitleDefault
    //           description: siteDescription
    //           siteUrl
    //           site_url: siteUrl
    //         }
    //       }
    //     }
    //     `,
    //     feeds: [
    //       {
    //         query: `#graphql
    //         {
    //           allPost(filter: { published: { eq: true } }, sort: { fields: date, order: DESC } ) {
    //             nodes {
    //               title
    //               date
    //               description
    //               slug
    //             }
    //           }
    //         }
    //         `,
    //         serialize: ({ query: { site: s, allPost } }) =>
    //           allPost.nodes.map((node) => {
    //             const url = `${s.siteMetadata.siteUrl}${node.slug}`
    //             const content = `<p>${node.description}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

    //             return {
    //               title: node.title,
    //               url,
    //               guid: url,
    //               date: node.date,
    //               description: node.description,
    //               custom_elements: [{ "content:encoded": content }],
    //             }
    //           }),
    //         output: `/rss.xml`,
    //         title: site.titleDefault,
    //       },
    //     ],
    //     omitBuildDate: true,
    //   },
    // },
    ANALYSE_BUNDLE && {
      resolve: `gatsby-plugin-perf-budgets`,
      options: {},
    },
    ANALYSE_BUNDLE && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {},
    },
  ].filter(Boolean),
}

export default gatsbyConfig

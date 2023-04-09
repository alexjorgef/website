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

import { GatsbyConfig } from "gatsby"
import path from "path"
import { slugifyOptions } from "../packages/utils"
import { site } from "./src/constants/meta"

require(`dotenv`).config()

if (!process.env.GATSBY_GITHUB_TOKEN || process.env.GATSBY_GITHUB_TOKEN === `xxx`) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A GitHub access token as GATSBY_GITHUB_TOKEN is required to build some parts of the website.`)
}

if (!process.env.GATSBY_GITLAB_TOKEN || process.env.GATSBY_GITLAB_TOKEN === `xxx`) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A GitLab access token as GATSBY_GITLAB_TOKEN is required to build some parts of the website.`)
}

if (!process.env.GATSBY_FORMSPREE_ID || process.env.GATSBY_FORMSPREE_ID === `xxx`) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A Formspree identifier as GATSBY_FORMSPREE_ID is required to build some parts of the website.`)
}

if (!process.env.GATSBY_RECAPTCHA_V2_SITE_KEY || process.env.GATSBY_RECAPTCHA_V2_SITE_KEY === `xxx`) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A reCAPTCHA v2 site key as GATSBY_RECAPTCHA_V2_SITE_KEY is required to build some parts of the website.`)
}

if (!process.env.GATSBY_DISQUS_NAME || process.env.GATSBY_DISQUS_NAME === `xxx`) {
  throw Error(`Check the README https://github.com/alexjorgef/website#readme\n
  A Disqus shortname as GATSBY_DISQUS_NAME is required to build some parts of the website.`)
}

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const gatsbyConfig: GatsbyConfig = {
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
    siteImage: site.image,
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
    `gatsby-theme-core`,
    `@chakra-ui/gatsby-plugin`,
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet-async`,
    // Overwrite the default "slugify" option
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.resolve(`src/pages`),
        slugify: slugifyOptions,
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
      resolve: `@aurorafossorg/gatsby-plugin-feed-reproducible`,
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
              allPost(filter: { published: { eq: true } }, sort: { fields: date, order: DESC } ) {
                nodes {
                  title
                  date
                  description
                  slug
                }
              }
            }
            `,
            serialize: ({ query: { site: s, allPost } }) =>
              allPost.nodes.map((node) => {
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
              }),
            output: `/rss.xml`,
            title: site.titleDefault,
          },
        ],
        omitBuildDate: true,
      },
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-perf-budgets`,
      options: {},
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {},
    },
  ].filter(Boolean),
}

export default gatsbyConfig

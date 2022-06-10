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

import { GatsbyConfig, PluginOptions } from "gatsby"
import remarkSlug from "remark-slug"
import remarkSmartyPants from "remark-smartypants"
import camelCase from "lodash.camelcase"
import { withDefaults, capitalize } from "utils"

const { GATSBY_GITHUB_TOKEN, GATSBY_GITLAB_TOKEN } = process.env

const gatsbyConfig = (themeOptions: PluginOptions): GatsbyConfig => {
  const options = withDefaults(themeOptions)

  return {
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
          name: `src/pages`,
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
          },
          fetchOptions: {},
        },
      },
      {
        resolve: `gatsby-source-graphql`,
        options: {
          typeName: `GitLab`,
          fieldName: `gitlab`,
          url: `https://gitlab.com/api/graphql`,
          headers: {
            Authorization: `bearer ${GATSBY_GITLAB_TOKEN}`,
          },
          fetchOptions: {},
        },
      },
      {
        resolve: `gatsby-plugin-mdx`,
        options: {
          lessBabel: true,
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
          remarkPlugins: [remarkSlug, remarkSmartyPants],
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
      {
        resolve: `gatsby-source-mixcloud`,
        options: {
          username: `dzzzz`,
        },
      },
      {
        resolve: `gatsby-source-bandcamp`,
        options: {
          username: `alexjorgef`,
        },
      },
    ].filter(Boolean),
  }
}

export default gatsbyConfig

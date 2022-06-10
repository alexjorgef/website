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

import { GatsbyNode } from "gatsby"
import path from "path"

type CreatePagesResult = {
  redirects: {
    nodes: {
      fromPath: string
      toPath: string
    }[]
  }
  portfolio: {
    nodes: {
      id: string
      slug: string
    }[]
  }
  awesome: {
    nodes: {
      id: string
      slug: string
    }[]
  }
  garden: {
    nodes: {
      id: string
      slug: string
    }[]
  }
  writing: {
    nodes: {
      id: string
      slug: string
      type: "prose" | "tutorial"
      parent: {
        fields: {
          isDefault: boolean
          locale: string
        }
      }
    }[]
  }
}

const awesomeTemplate = path.resolve(`src/templates/awesome.tsx`)
const projectTemplate = path.resolve(`src/templates/project.tsx`)
const gardenTemplate = path.resolve(`src/templates/garden.tsx`)
const proseTemplate = path.resolve(`src/templates/prose.tsx`)
const tutorialTemplate = path.resolve(`src/templates/tutorial.tsx`)

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  const result = await graphql<CreatePagesResult>(`
    {
      redirects: allRedirects {
        nodes {
          fromPath
          toPath
        }
      }
      locales: allLocales {
        nodes {
          default
          name
        }
      }
      portfolio: allProject {
        nodes {
          id
          slug
        }
      }
      awesome: allAwesome {
        nodes {
          id
          slug
        }
      }
      garden: allGarden {
        nodes {
          id
          slug
        }
      }
      writing: allPost(filter: { published: { eq: true } }) {
        nodes {
          id
          slug
          type
          ... on MdxPost {
            parent {
              ... on Mdx {
                fields {
                  isDefault
                  locale
                }
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading the createPages query results`, result.errors)
    return
  }

  const {
    data: { redirects, garden, writing },
  } = result

  redirects.nodes.forEach((redirect) => {
    createRedirect({ isPermanent: true, ...redirect, force: true })
  })

  result.data.awesome.nodes.forEach((awesome) => {
    createPage({
      path: awesome.slug,
      component: awesomeTemplate,
      context: {
        id: awesome.id,
      },
    })
  })

  result.data.portfolio.nodes.forEach((project) => {
    createPage({
      path: project.slug,
      component: projectTemplate,
      context: {
        id: project.id,
      },
    })
  })

  garden.nodes.forEach((post) => {
    createPage({
      path: post.slug,
      component: gardenTemplate,
      context: {
        id: post.id,
      },
    })
  })

  writing.nodes.forEach((article) => {
    const component = article.type === `tutorial` ? tutorialTemplate : proseTemplate

    const writingSlug = article.parent.fields.isDefault
      ? `${article.slug}`
      : `/${article.parent.fields.locale}${article.slug}`

    createPage({
      path: writingSlug,
      component,
      context: {
        id: article.id,
        locale: article.parent.fields.locale,
      },
    })
  })
}

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

import path from "path"
import Prando from "prando"
import get from "lodash.get"
import readingTime from "reading-time"
import { shuffle } from "./src/utils/shuffle.mjs"
import { mdxResolverPassthrough } from "./src/utils/mdx-resolver-passthrough.mjs"
import { slugify } from "./src/utils/slugify.mjs"
import { withDefaults } from "./src/utils/with-defaults.mjs"
import { site } from "./src/constants/meta.mjs"

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
export const createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions

  const getFieldValue = (fieldName, source) => get(source, fieldName)

  createFieldExtension({
    name: `slugify`,
    args: {
      prefixFieldName: `String`,
      prefix: `String`,
      inputFallback: `String`,
    },
    extend({ prefixFieldName, prefix, inputFallback }) {
      return {
        resolve(source) {
          const computedPrefix = prefixFieldName ? getFieldValue(prefixFieldName, source) : prefix
          const computedInput = (source.slug ? source.slug : source.title) || getFieldValue(inputFallback, source)
          return slugify(computedInput, computedPrefix)
        },
      }
    },
  })

  createFieldExtension({
    name: `mdxpassthrough`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      }
    },
  })

  // Create Gastby type definitions
  createTypes(`#graphql
    enum PostTypeEnum {
      prose
      tutorial
    }

    interface Post implements Node {
      id: ID!
      slug: String! @slugify(prefixFieldName: "category")
      excerpt(pruneLength: Int = 160): String!
      tableOfContents: JSON
      timeToRead: Int
      image: String
      category: Category! @link(by: "name")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      description: String
      locale: String
      locales: [String]
      published: Boolean
      subtitle: String
      title: String!
      type: PostTypeEnum!
      contentFilePath: String!
    }

    type MdxPost implements Node & Post {
      slug: String! @slugify(prefixFieldName: "category")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      tableOfContents: JSON @mdxpassthrough(fieldName: "tableOfContents")
      timeToRead: Int
      image: String
      category: Category! @link(by: "name")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      description: String
      locale: String
      locales: [String]
      published: Boolean
      subtitle: String
      title: String!
      type: PostTypeEnum!
      contentFilePath: String!
    }

    type Category implements Node {
      name: String!
      slug: String! @slugify(inputFallback: "name")
      posts: [Post] @link(by: "category.name", from: "name")
      description: String!
      gradient: String!
      image: File @fileByRelativePath
    }

    interface Garden implements Node {
      id: ID!
      slug: String! @slugify(prefix: "garden")
      excerpt(pruneLength: Int = 160): String!
      timeToRead: Int
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      tags: [String!]!
      icon: String!
      contentFilePath: String!
      image: String
    }

    type MdxGarden implements Node & Garden {
      slug: String! @slugify(prefix: "garden")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      timeToRead: Int
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      tags: [String!]!
      icon: String!
      contentFilePath: String!
      image: String
    }

    type ProjectImage implements Node {
      image: File! @fileByRelativePath
      description: String!
    }

    interface Project implements Node {
      id: ID!
      slug: String! @slugify(prefix: "project")
      excerpt(pruneLength: Int = 160): String!
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      description: String
      featureImage: File! @fileByRelativePath
      images: [ProjectImage!]!
      archived: Boolean
      tags: [String!]!
      contentFilePath: String!
    }

    type MdxProject implements Node & Project {
      slug: String! @slugify(prefix: "project")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      description: String
      featureImage: File! @fileByRelativePath
      archived: Boolean
      images: [ProjectImage!]!
      tags: [String!]!
      contentFilePath: String!
    }

    interface Awesome implements Node {
      id: ID!
      slug: String! @slugify(prefix: "awesome")
      excerpt(pruneLength: Int = 160): String!
      tableOfContents: JSON
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      subtitle: String
      description: String
      published: Boolean
      tags: [String!]!
      icon: String!
      contentFilePath: String!
    }

    type MdxAwesome implements Node & Awesome {
      slug: String! @slugify(prefix: "awesome")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      tableOfContents: JSON @mdxpassthrough(fieldName: "tableOfContents")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      subtitle: String
      description: String
      published: Boolean
      tags: [String!]!
      icon: String!
      contentFilePath: String!
    }

    type CoreConfig implements Node {
      writingSource: String
      gardenSource: String
      workSource: String
      awesomeSource: String
    }

    type github implements Node {
      repository(name: String, owner: String): Repository
    }

    type Repository {
      stargazerCount: Int
      description: String
      name: String
      url: String
    }

  `)
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
export const onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest, getNodesByType },
  themeOptions
) => {
  if (node.internal.type !== `Mdx`) {
    return
  }
  if (!node.parent) {
    return
  }

  const { createNode, createParentChildLink, createNodeField } = actions
  const { writingSource, gardenSource, portfolioSource, awesomeSource, localeInitial } = withDefaults(themeOptions)

  const fileNode = getNode(node.parent)

  if (!fileNode) {
    return
  }

  const source = fileNode.sourceInstanceName
  const timeToRead = Math.round(readingTime(node.body).minutes)

  // WritingNode
  if (source === writingSource) {
    const name = path.basename(node.internal.contentFilePath)
    const isDefault = name === `index`
    const lang = isDefault ? localeInitial : name.split(`.`)[1]

    /** @type {Array<String>} */
    const langs = []
    const nodes = getNodesByType(`File`)
    nodes.forEach((refNode) => {
      if (refNode.id !== fileNode.id) {
        if (refNode.sourceInstanceName === writingSource) {
          if (refNode.extension === `mdx`) {
            if (refNode.relativeDirectory === fileNode.relativeDirectory) {
              const refName = path.basename(`${refNode.absolutePath}`, `.mdx`)
              const refIsDefault = refName === `index`
              const refLang = refIsDefault ? localeInitial : refName.split(`.`)[1]
              langs.push(refLang)
            }
          }
        }
      }
    })

    /** @type {WritingNode} */
    const f = node.frontmatter
    /** @type {WritingNode} */
    const fieldData = {
      slug: f.slug ? f.slug : undefined,
      title: f.title,
      locale: lang,
      locales: langs,
      subtitle: f.subtitle ? f.subtitle : undefined,
      date: f.date,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      category: f.category,
      image: f.image ? f.image : undefined,
      description: f.description,
      published: f.published ?? true,
      type: f.type,
      contentFilePath: fileNode.absolutePath,
      timeToRead,
    }

    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`)

    createNode({
      ...fieldData,
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxPostId) })
  }

  // GardenNode
  if (source === gardenSource) {
    /** @type {GardenNode} */
    const f = node.frontmatter
    /** @type {GardenNode} */
    const fieldData = {
      slug: f.slug ? f.slug : undefined,
      description: f.description,
      title: f.title,
      date: f.date,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      icon: f.icon,
      tags: f.tags,
      contentFilePath: fileNode.absolutePath,
      timeToRead,
      image: f.image ? f.image : site.defaultGardenOgImage,
    }

    const mdxGardenId = createNodeId(`${node.id} >>> MdxGarden`)

    createNode({
      ...fieldData,
      id: mdxGardenId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxGarden`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Garden interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxGardenId) })
  }

  // AwesomeNode
  if (source === awesomeSource) {
    /** @type {AwesomeNode} */
    const f = node.frontmatter
    /** @type {AwesomeNode} */
    const fieldData = {
      slug: f.slug ? f.slug : undefined,
      description: f.description,
      title: f.title,
      date: f.date,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      icon: f.icon,
      tags: f.tags,
      contentFilePath: fileNode.absolutePath,
      timeToRead,
      image: f.image ? f.image : site.defaultGardenOgImage,
    }

    const mdxAwesomeId = createNodeId(`${node.id} >>> MdxAwesome`)

    createNode({
      ...fieldData,
      id: mdxAwesomeId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxAwesome`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Awesome interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxAwesomeId) })
  }

  // ProjectNode
  if (source === portfolioSource) {
    /** @type {ProjectNode} */
    const f = node.frontmatter
    /** @type {ProjectNode} */
    const fieldData = {
      slug: f.slug ? f.slug : undefined,
      description: f.description,
      title: f.title,
      date: f.date,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      icon: f.icon,
      tags: f.tags,
      contentFilePath: fileNode.absolutePath,
      timeToRead,
      image: f.image ? f.image : undefined,
    }

    const mdxProjectId = createNodeId(`${node.id} >>> MdxProject`)

    createNode({
      ...fieldData,
      id: mdxProjectId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxProject`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Project interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxProjectId) })
  }
}

/**
 * @typedef {{
 *   slug?: string
 *   image?: string
 *   category: "JavaScript" | "Environment" | "Mathematics" | "Artificial Intelligence"
 *   date: string
 *   lastUpdated?: string
 *   description: string
 *   published: boolean
 *   subtitle?: string
 *   title: string
 *   type: "prose" | "tutorial"
 *   contentFilePath: string
 *   timeToRead: number
 * }} WritingNode
 */

/**
 * @typedef {{
 *   slug?: string
 *   description: string
 *   date: string
 *   lastUpdated?: string
 *   title: string
 *   tags: Array<string>
 *   icon: string
 *   contentFilePath: string
 *   timeToRead: number
 *   image: string
 * }} GardenNode
 */

/**
 * @typedef {{
 *   slug?: string
 *   description: string
 *   date: string
 *   lastUpdated?: string
 *   title: string
 *   tags: Array<string>
 *   icon: string
 *   archived: boolean
 *   contentFilePath: string
 *   timeToRead: number
 *   image: string
 *   gallery: {
 *     image: string
 *     description: string
 *   }[]
 * }} ProjectNode
 */

/**
 * @typedef {{
 *   slug?: string
 *   description: string
 *   date: string
 *   lastUpdated?: string
 *   title: string
 *   tags: Array<string>
 *   icon: string
 *   contentFilePath: string
 *   timeToRead: number
 *   image: string
 * }} AwesomeNode
 */

/**
 * @type {import('gatsby').GatsbyNode['createResolvers']}
 */
export const createResolvers = (createResolverArgs) => {
  const resolvers = {
    Query: {
      randomPosts: {
        type: [`Post`],
        args: {
          count: {
            type: `Int`,
            description: `Count of how many nodes should be returned`,
          },
          seed: {
            type: `String`,
            description: `Input a seed (e.g. the current id of the node) to deterministically retrieve the same nodes on every run`,
          },
        },
        async resolve(_source, args, context) {
          const { count = 2, seed } = args || {}
          const rng = new Prando(seed)
          const s = rng.next()
          const { entries } = await context.nodeModel.findAll({
            query: {
              sort: {
                fields: [`date`],
                order: [`ASC`],
              },
            },
            type: `Post`,
          })
          const allNodes = Array.from(entries)
          rng.reset()
          return shuffle(allNodes, s, count)
        },
      },
    },
  }

  createResolverArgs.createResolvers(resolvers)
}

/**
 * @typedef {{
 *   errors: Array<Error>,
 *   data: {
 *    redirects: {
 *     nodes: Array<{
 *       fromPath: string,
 *       toPath: string,
 *     }>
 *   }
 *   portfolio: {
 *     nodes: Array<{
 *       id: string,
 *       slug: string,
 *       contentFilePath: string,
 *     }>
 *   }
 *   awesome: {
 *     nodes: Array<{
 *       id: string,
 *       slug: string,
 *       contentFilePath: string,
 *     }>
 *   }
 *   garden: {
 *     nodes: Array<{
 *       id: string,
 *       slug: string,
 *       contentFilePath: string,
 *     }>
 *   }
 *   writing: {
 *     nodes: Array<{
 *       id: string,
 *       slug: string,
 *       type: "prose" | "tutorial",
 *       contentFilePath: string,
 *       parent: {
 *         fields: {
 *           isDefault: boolean
 *           locale: string
 *         }
 *         parent: {
 *           relativeDirectory: string
 *           relativePath: string
 *         }
 *       }
 *     }>
 *   }
 *  }
 * }} CreatePagesResult
 */

const awesomeTemplate = path.resolve(`src/templates/awesome.tsx`)
const projectTemplate = path.resolve(`src/templates/project.tsx`)
const gardenTemplate = path.resolve(`src/templates/garden.tsx`)
const proseTemplate = path.resolve(`src/templates/prose.tsx`)
const tutorialTemplate = path.resolve(`src/templates/tutorial.tsx`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
export const createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  /** @type {CreatePagesResult} */
  const result = await graphql(`
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
          contentFilePath
        }
      }
      awesome: allAwesome {
        nodes {
          id
          slug
          contentFilePath
        }
      }
      garden: allGarden {
        nodes {
          id
          slug
          contentFilePath
        }
      }
      writing: allPost(filter: { published: { eq: true } }) {
        nodes {
          id
          slug
          type
          contentFilePath
          ... on MdxPost {
            parent {
              ... on Mdx {
                fields {
                  isDefault
                  locale
                }
                parent {
                  ... on File {
                    relativeDirectory
                    relativePath
                  }
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
      component: `${awesomeTemplate}?__contentFilePath=${awesome.contentFilePath}`,
      context: {
        id: awesome.id,
      },
    })
  })

  result.data.portfolio.nodes.forEach((project) => {
    createPage({
      path: project.slug,
      component: `${projectTemplate}?__contentFilePath=${project.contentFilePath}`,
      context: {
        id: project.id,
      },
    })
  })

  garden.nodes.forEach((post) => {
    createPage({
      path: post.slug,
      component: `${gardenTemplate}?__contentFilePath=${post.contentFilePath}`,
      context: {
        id: post.id,
      },
    })
  })

  writing.nodes.forEach((article) => {
    const componentTemplate = article.type === `tutorial` ? tutorialTemplate : proseTemplate

    const writingSlug = article.parent.fields.isDefault
      ? `${article.slug}`
      : `/${article.parent.fields.locale}${article.slug}`

    createPage({
      path: writingSlug,
      component: `${componentTemplate}?__contentFilePath=${article.contentFilePath}`,
      context: {
        id: article.id,
        locale: article.parent.fields.locale,
      },
    })

    writing.nodes.forEach((articleTranslate) => {
      if (
        article.parent.parent.relativeDirectory === articleTranslate.parent.parent.relativeDirectory &&
        article.parent.parent.relativePath !== articleTranslate.parent.parent.relativePath
      ) {
        if (articleTranslate.parent.fields.isDefault) {
          createRedirect({
            isPermanent: true,
            fromPath: `/${articleTranslate.parent.fields.locale}${article.slug}`,
            toPath: `${articleTranslate.slug}`,
            force: true,
            redirectInBrowser: true,
          })
        } else {
          createRedirect({
            isPermanent: true,
            fromPath: `/${articleTranslate.parent.fields.locale}${article.slug}`,
            toPath: `/${articleTranslate.parent.fields.locale}${articleTranslate.slug}`,
            force: true,
            redirectInBrowser: true,
          })
        }
      }
    })
  })
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
 */
export const onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === `develop` || stage === `build-javascript`) {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find((plugin) => plugin.constructor.name === `MiniCssExtractPlugin`)
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}

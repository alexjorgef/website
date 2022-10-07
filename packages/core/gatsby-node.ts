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

import { CreateNodeArgs, GatsbyNode, PluginOptions } from "gatsby"
import path from "path"
import Prando from "prando"
import get from "lodash.get"
import { mdxResolverPassthrough, slugify, withDefaults, shuffle } from "utils"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }): void => {
  const { createTypes, createFieldExtension } = actions

  const getFieldValue = (fieldName, source) => get(source, fieldName)

  createFieldExtension({
    name: `slugify`,
    args: {
      fieldName: `String`,
      fallback: `String`,
    },
    extend({ fieldName, fallback }) {
      return {
        resolve(source) {
          const computedPrefix = getFieldValue(fieldName, source)
          const prefix = computedPrefix || fallback
          return slugify(source, prefix)
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

  createTypes(`#graphql
    enum PostTypeEnum {
      prose
      tutorial
    }

    interface Post implements Node {
      id: ID!
      slug: String! @slugify(fieldName: "category")
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
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
    }

    type MdxPost implements Node & Post {
      slug: String! @slugify(fieldName: "category")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      tableOfContents: JSON @mdxpassthrough(fieldName: "tableOfContents")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
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
    }

    type Category implements Node {
      name: String!
      slug: String! @slugify(fieldName: "name")
      posts: [Post] @link(by: "category.name", from: "name")
      description: String!
      gradient: String!
      image: File @fileByRelativePath
    }

    interface Garden implements Node {
      id: ID!
      slug: String! @slugify(fallback: "garden")
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      tags: [String!]!
      icon: String!
    }

    type MdxGarden implements Node & Garden {
      slug: String! @slugify(fallback: "garden")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      tags: [String!]!
      icon: String!
    }

    type ProjectImage implements Node {
      image: File! @fileByRelativePath
      description: String!
    }

    interface Project implements Node {
      id: ID!
      slug: String! @slugify(fallback: "project")
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      description: String
      featureImage: File! @fileByRelativePath
      images: [ProjectImage!]!
      archived: Boolean
      tags: [String!]!
    }

    type MdxProject implements Node & Project {
      slug: String! @slugify(fallback: "project")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      description: String
      featureImage: File! @fileByRelativePath
      archived: Boolean
      images: [ProjectImage!]!
      tags: [String!]!
    }

    interface Awesome implements Node {
      id: ID!
      slug: String! @slugify(fallback: "awesome")
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      tableOfContents: JSON
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      subtitle: String
      description: String
      published: Boolean
      tags: [String!]!
      icon: String!
    }

    type MdxAwesome implements Node & Awesome {
      slug: String! @slugify(fallback: "awesome")
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      tableOfContents: JSON @mdxpassthrough(fieldName: "tableOfContents")
      date: Date! @dateformat
      lastUpdated: Date! @dateformat
      title: String!
      subtitle: String
      description: String
      published: Boolean
      tags: [String!]!
      icon: String!
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

export const sourceNodes: GatsbyNode["sourceNodes"] = ({ actions, createContentDigest }, themeOptions): void => {
  const { createNode } = actions
  const defaultOptions = withDefaults(themeOptions)

  createNode({
    ...defaultOptions,
    id: `gatsby-theme-core-config`,
    parent: null,
    children: [],
    fileAbsolutePath: null,
    internal: {
      type: `CoreConfig`,
      contentDigest: createContentDigest(defaultOptions),
      content: JSON.stringify(defaultOptions),
      description: `Options for gatsby-theme-core`,
    },
  })
}

type WritingNode = {
  fileAbsolutePath: string
  frontmatter: {
    slug?: string
    image?: string
    category: "JavaScript" | "Environment" | "Mathematics" | "Artificial Intelligence"
    date: string
    lastUpdated?: string
    description: string
    published: boolean
    locale: string
    locales: string[]
    subtitle?: string
    title: string
    type: "prose" | "tutorial"
  }
}

type GardenNode = {
  fileAbsolutePath: string
  frontmatter: {
    slug?: string
    date: string
    lastUpdated?: string
    title: string
    tags: string[]
    icon: string
  }
}

type ProjectNode = {
  fileAbsolutePath: string
  frontmatter: {
    slug?: string
    featureImage: string
    date: string
    lastUpdated?: string
    description: string
    archived: boolean
    tags: string[]
    images: {
      image: string
      description: string
    }[]
    title: string
  }
}

type AwesomeNode = {
  fileAbsolutePath: string
  frontmatter: {
    slug?: string
    image?: string
    date: string
    lastUpdated?: string
    description: string
    published: boolean
    subtitle?: string
    title: string
    tags: string[]
    icon: string
  }
}

type MdxNode = WritingNode | GardenNode | ProjectNode | AwesomeNode

export const onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest, getNodesByType }: CreateNodeArgs<MdxNode>,
  themeOptions: PluginOptions
): void => {
  if (node.internal.type !== `Mdx`) {
    return
  }

  const { createNode, createParentChildLink, createNodeField } = actions
  const { writingSource, gardenSource, portfolioSource, awesomeSource, locales } = withDefaults(themeOptions)

  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  if (source === writingSource) {
    const name = path.basename(node.fileAbsolutePath, `.mdx`)
    const isDefault = name === `index`
    const defaultKey = findKey(locales, (o) => o.default === true)
    const lang = isDefault ? defaultKey : name.split(`.`)[1]

    const langs: string[] = []
    const nodes = getNodesByType(`File`)
    nodes.forEach((refNode) => {
      if (refNode.id !== fileNode.id) {
        if (refNode.sourceInstanceName === writingSource) {
          if (refNode.extension === `mdx`) {
            if (refNode.relativeDirectory === fileNode.relativeDirectory) {
              const refName = path.basename(`${refNode.absolutePath}`, `.mdx`)
              const refIsDefault = refName === `index`
              const refDefaultKey = findKey(locales, (o) => o.default === true)
              const refLang = refIsDefault ? refDefaultKey : refName.split(`.`)[1]
              langs.push(refLang)
            }
          }
        }
      }
    })

    const f = node.frontmatter as WritingNode["frontmatter"]
    const fieldData: WritingNode["frontmatter"] = {
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

  if (source === gardenSource) {
    const f = node.frontmatter as GardenNode["frontmatter"]
    const fieldData: GardenNode["frontmatter"] = {
      slug: f.slug ? f.slug : undefined,
      title: f.title,
      date: f.date,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      icon: f.icon,
      tags: f.tags,
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

  if (source === portfolioSource) {
    const f = node.frontmatter as ProjectNode["frontmatter"]
    const fieldData: ProjectNode["frontmatter"] = {
      slug: f.slug ? f.slug : undefined,
      title: f.title,
      description: f.description,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      archived: f.archived ?? true,
      images: f.images,
      date: f.date,
      featureImage: f.featureImage ? f.featureImage : undefined,
      tags: f.tags,
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
  }

  if (source === awesomeSource) {
    const f = node.frontmatter as AwesomeNode["frontmatter"]
    const fieldData: AwesomeNode["frontmatter"] = {
      slug: f.slug ? f.slug : undefined,
      title: f.title,
      subtitle: f.subtitle ? f.subtitle : undefined,
      description: f.description,
      lastUpdated: f.lastUpdated ? f.lastUpdated : f.date,
      published: f.published ?? true,
      date: f.date,
      icon: f.icon,
      tags: f.tags,
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
  }
}

export const createResolvers: GatsbyNode["createResolvers"] = (createResolverArgs): void => {
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

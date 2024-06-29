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

import * as React from "react"
import { PageProps, graphql } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { CategoryHero } from "../components/writing/category-hero"
import { CategoryView } from "../components/writing/category-view"
import { SEO } from "../components/seo"

type ReactProps = {
  posts: {
    nodes: Array<{
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }>
    totalCount: number
  }
  category: {
    name: string
    description: string
    gradient: string
    slug: string
    image: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
}

const ReactCategory: React.FC<PageProps<ReactProps>> = ({ data: { posts, category } }) => (
  <CategoryView posts={posts}>
    <SEO
      title={category.name}
      description={category.description}
      breadcrumbListItems={[{ name: category.name, url: category.slug }]}
    />
    <CategoryHero bgGradient={category.gradient} title={category.name} description={category.description} />
  </CategoryView>
)

export default ReactCategory

export const query = graphql`
  query ($name: String!) {
    category(name: { eq: $name }) {
      name
      description
      gradient
      slug
      image {
        childImageSharp {
          gatsbyImageData(
            width: 350
            layout: CONSTRAINED
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 100
          )
        }
      }
    }
    posts: allPost(
      filter: { published: { eq: true }, category: { name: { eq: $name } }, locale: { eq: "en" } }
      sort: { date: DESC }
    ) {
      nodes {
        ...CardPostInformation
      }
      totalCount
    }
  }
`

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
import { CategoryHero } from "../components/writing/category-hero"
import { CategoryView } from "../components/writing/category-view"
import { SEO } from "../components/seo"

type DataProps = {
  posts: {
    nodes: {
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }[]
  }
}

const Tutorials: React.FC<PageProps<DataProps>> = ({ data: { posts } }) => {
  const tutorialsTitle = `Tutorials`
  const tutorialsDescription = `Tutorials across different categories in a longform format & with interactive elements`

  return (
    <CategoryView posts={posts}>
      <SEO
        title={tutorialsTitle}
        description={tutorialsDescription}
        breadcrumbListItems={[{ name: `Tutorials`, url: `/tutorials` }]}
      />
      <CategoryHero
        bgGradient="linear(to-t, blueGray.600, blueGray.900)"
        title={tutorialsTitle}
        description={tutorialsDescription}
      />
    </CategoryView>
  )
}

export default Tutorials

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true }, type: { eq: tutorial } }, sort: { date: DESC }) {
      nodes {
        ...CardPostInformation
      }
    }
  }
`

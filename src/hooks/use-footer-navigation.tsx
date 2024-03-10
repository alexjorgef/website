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

import { graphql, useStaticQuery } from "gatsby"

type Props = {
  allFooterNavigation: {
    nodes: Array<{
      heading: {
        link?: string
        name: string
      }
      items: Array<{
        isExternal?: boolean
        link: string
        name: string
      }>
    }>
  }
}

export const useFooterNavigation = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      allFooterNavigation {
        nodes {
          heading {
            link
            name
          }
          items {
            isExternal
            link
            name
          }
        }
      }
    }
  `)

  return data.allFooterNavigation.nodes
}

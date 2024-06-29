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
import { Container, Grid, Text, Link as ExternalLink } from "@chakra-ui/react"
import { space } from "../../constants/space"
import { SkipNavContent } from "../a11y/skip-nav"
import { Layout } from "../blocks/layout"
import { Card } from "./card"
import { WritingSubNavigation } from "./subnavigation"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

type CategoryViewProps = {
  posts: {
    nodes: Array<{
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
    }>
  }
}

export const CategoryView: React.FC<React.PropsWithChildren<CategoryViewProps>> = ({ posts, children }) => {
  const meta = useSiteMetadata()

  return (
    <Layout subnavigation={<WritingSubNavigation />}>
      <SkipNavContent>
        {children}
        <Container py={space.paddingMedium}>
          {posts.nodes.length > 0 ? (
            <Grid gridTemplateColumns={[`1fr`, null, `repeat(2, 1fr)`]} gap={8} mx={[`0`, null, null, `-6`]}>
              {posts.nodes.map((post) => (
                <Card
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  subtitle={post.subtitle}
                  description={post.description}
                />
              ))}
            </Grid>
          ) : (
            <Text textStyle="prominent">
              Sadly there's no content for this category available yet. Be sure to follow me on{` `}
              <ExternalLink href={`https://twitter.com/${meta.twitter}`}>Twitter</ExternalLink> to not miss any
              announcements about new posts :)
            </Text>
          )}
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

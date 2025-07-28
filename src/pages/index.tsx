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
import { Stack, Text, Flex } from "@chakra-ui/react"
import { Link } from "../components/link"
import { Layout } from "../components/blocks/layout"
import { FullWidthContainer } from "../components/blocks/full-width-container"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Heading } from "../components/typography/heading"
import { space } from "../constants/space"
import { SEO } from "../components/seo"
import { homepage } from "../constants/json-ld"
import { useI18nContext } from "../context/i18n-provider"

type DataProps = {
  posts: {
    nodes: Array<{
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
      locale: string
      locales: Array<string>
    }>
  }
  postsdetailed: {
    nodes: Array<{
      title: string
      description: string
      slug: string
      locale: string
    }>
  }
  garden: {
    nodes: Array<{
      title: string
      slug: string
    }>
  }
  locales: {
    nodes: Array<{
      name: string
    }>
  }
}

const Index: React.FC<PageProps<DataProps>> = ({ data }) => {
  const { data: language } = useI18nContext()
  const postsShow = data.posts.nodes.filter((post) => (post.locales.length === 0 ? true : post.locale === language))
  return (
    <Layout>
      <SEO>
        <script type="application/ld+json">{JSON.stringify(homepage)}</script>
      </SEO>
      <SkipNavContent>
        <FullWidthContainer variant="hero">
          <Stack align="center" spacing="5" py={space.paddingLarge}>
            <Heading as="h1">Alexandre Ferreira</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              <strong>Software Developer</strong> from Portugal
              <br />
            </Text>
            <Text variant="prominent" maxWidth="40ch" textAlign="center">
              Currently working as a full‑stack developer, specialized in backend and cross‑platform development.
            </Text>
          </Stack>
        </FullWidthContainer>
        <FullWidthContainer variant="light">
          <Stack spacing={24} py={space.paddingMedium}>
            <Flex direction="column" gap={5}>
              <Text variant="prominent">
                Hello, my name is Alexandre Ferreira and I’m a software developer from Portugal, living in the beautiful
                and charming city of Leiria.
              </Text>
              <Text variant="prominent">
                Personally my interests revolve around music, technology and computer graphics. In my spare time, I
                enjoy spending time with my family and friends. I’m also a camping lover, love to go hiking and visit
                new places.
              </Text>
              <Text variant="prominent">
                Currently working as a full-stack developer, specialized in backend technologies and cross-platform
                development.
              </Text>
              <Text variant="prominent">
                So far I've written {postsShow.length} posts, which can be accessed <Link to="/writing">here</Link>.
                Also, explore the{` `}
                <Link to="/notebook">notes</Link> for quick things.
              </Text>
            </Flex>
          </Stack>
        </FullWidthContainer>
      </SkipNavContent>
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    postsdetailed: allPost(filter: { published: { eq: true } }, sort: { date: DESC }, limit: 7) {
      nodes {
        title
        description
        slug
        locale
      }
    }
    posts: allPost(filter: { published: { eq: true } }, sort: { date: DESC }) {
      nodes {
        ...CardPostInformation
      }
    }
    garden: allGarden(
      limit: 3
      sort: { lastUpdated: DESC }
      filter: { slug: { ne: "/garden/what-is-a-digital-garden" } }
    ) {
      nodes {
        title
        slug
      }
    }
    locales: allLocales(filter: { default: { eq: true } }) {
      nodes {
        name
      }
    }
  }
`

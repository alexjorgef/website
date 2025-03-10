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
import { Stack, Text, Badge, Box, Flex, Grid, usePrefersReducedMotion } from "@chakra-ui/react"
import { Link } from "../components/link"
import { Layout } from "../components/blocks/layout"
import { MotionBox } from "../components/blocks/motion-box"
import { FullWidthContainer } from "../components/blocks/full-width-container"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Heading } from "../components/typography/heading"
import { PrimaryButton, SubtleButton } from "../components/buttons"
import { space } from "../constants/space"
import { SEO } from "../components/seo"
import { homepage } from "../constants/json-ld"

type DataProps = {
  posts: {
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

const cardGradients = [
  `linear(to-tr, #F55555, #FCCF31)`,
  `linear(to-tr, #623AA2, #F97794)`,
  `linear(to-tr, #736EFE, #5EFCE8)`,
  `linear(to-tr, #123597, #97ABFF)`,
  `linear(to-tr, #00A88C, #F9F871)`,
  `linear(to-tr, #243949, #517FA4)`,
]

const Index: React.FC<PageProps<DataProps>> = ({ data }) => {
  const shouldReduceMotion = usePrefersReducedMotion()
  const [firstPost, ...rest] = data.posts.nodes
  const otherPosts = [...rest]
  const localeDefault = data.locales.nodes[0].name
  return (
    <Layout>
      <SEO>
        <script type="application/ld+json">{JSON.stringify(homepage)}</script>
      </SEO>
      <SkipNavContent>
        <FullWidthContainer variant="hero">
          <Stack align="center" spacing="5" py={space.paddingLarge}>
            <Heading as="h1">Hi, I’m Alex 😀</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              <strong>Software Developer</strong> from Portugal
              <br />
            </Text>
            <Text variant="prominent" maxWidth="40ch" textAlign="center">
              Currently working as a full‑stack developer, specializing in backend and cross‑platform development.
            </Text>
          </Stack>
        </FullWidthContainer>
        <FullWidthContainer variant="light">
          <Stack alignItems="flex-start" spacing={24} py={space.paddingMedium}>
            <Stack alignItems="flex-start" spacing={[6, 8]}>
              <Badge variant="light">Latest Post</Badge>
              <Box>
                <Heading as="h2">{firstPost.title}</Heading>
                <Text variant="lightContainer">{firstPost.description}</Text>
              </Box>
              <PrimaryButton to={firstPost.slug}>Continue Reading</PrimaryButton>
            </Stack>
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge variant="light">Posts</Badge>
                <SubtleButton to="/writing">Read all</SubtleButton>
              </Flex>
              <Grid templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]} gap={[4, null, 8]}>
                {otherPosts
                  .filter((post) => post.locale === localeDefault)
                  .map((item, index) => (
                    <Link
                      to={item.slug}
                      key={item.slug}
                      borderRadius="lg"
                      _hover={{
                        textDecoration: `none`,
                        boxShadow: shouldReduceMotion ? `outline` : null,
                      }}
                    >
                      <MotionBox
                        bgGradient={cardGradients[index]}
                        p={4}
                        borderRadius="lg"
                        height={[`150px`, null, null, `200px`, `250px`]}
                        boxShadow="lg"
                        display="flex"
                        alignItems="flex-end"
                        color="white"
                        fontSize={[`lg`, null, `md`, `1.125rem`, `1.3125rem`]}
                        sx={{ textShadow: `0 1px 2px rgba(0, 0, 0, 0.5)` }}
                      >
                        {item.title}
                      </MotionBox>
                    </Link>
                  ))}
              </Grid>
            </Stack>
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge variant="light">Notebook</Badge>
                <SubtleButton to="/notebook">Read all</SubtleButton>
              </Flex>
              <Grid templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]} gap={[4, null, 8]}>
                {data.garden.nodes.map((item, index) => (
                  <Link
                    to={item.slug}
                    key={item.slug}
                    borderRadius="lg"
                    _hover={{
                      textDecoration: `none`,
                      boxShadow: shouldReduceMotion ? `outline` : null,
                    }}
                  >
                    <MotionBox
                      bgGradient={cardGradients[index + 3]}
                      p={4}
                      borderRadius="lg"
                      height={[`125px`, null, null, `175px`]}
                      boxShadow="lg"
                      display="flex"
                      alignItems="flex-end"
                      color="white"
                      fontSize={[`lg`, null, `md`, `1.125rem`, `1.3125rem`]}
                      sx={{ textShadow: `0 1px 2px rgba(0, 0, 0, 0.5)` }}
                    >
                      {item.title}
                    </MotionBox>
                  </Link>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </FullWidthContainer>
      </SkipNavContent>
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true } }, sort: { date: DESC }, limit: 7) {
      nodes {
        title
        description
        slug
        locale
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

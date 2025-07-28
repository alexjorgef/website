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
import { Container, Badge, Box, Flex, Stack, Text, Grid, usePrefersReducedMotion } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { MotionBox } from "../components/blocks/motion-box"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Heading } from "../components/typography/heading"
import { Link } from "../components/link"
import { space } from "../constants/space"
import { PrimaryButton, SubtleButton } from "../components/buttons"
import { SEO } from "../components/seo"

type WritingProps = {
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

const cardGradients = [
  `linear(to-tr, #F55555, #FCCF31)`,
  `linear(to-tr, #623AA2, #F97794)`,
  `linear(to-tr, #736EFE, #5EFCE8)`,
  `linear(to-tr, #123597, #97ABFF)`,
  `linear(to-tr, #00A88C, #F9F871)`,
  `linear(to-tr, #243949, #517FA4)`,
]

const Writing: React.FC<PageProps<WritingProps>> = ({ data: { postsdetailed, garden, locales } }) => {
  const shouldReduceMotion = usePrefersReducedMotion()
  const [firstPost, ...rest] = postsdetailed.nodes
  const otherPosts = [...rest]
  const localeDefault = locales.nodes[0].name

  return (
    // <Layout subnavigation={<WritingSubNavigation />}>
    <Layout>
      <SEO title="Writing" breadcrumbListItems={[{ name: `Writing`, url: `/writing` }]} />
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Stack spacing="20" align="center">
            <Stack spacing="3" align="center">
              <Heading as="h1">Writing</Heading>
              <Text variant="prominent" maxWidth="45ch" textAlign="center">
                Thoughts, notes, and learnings
              </Text>
            </Stack>
            {/* <Grid
              gridTemplateColumns={[`1fr`, null, `repeat(2, 1fr)`]}
              gap={8}
              width={[`100%`, null, null, `calc(100% + 3rem)`]}
            >
              {postsShow.map((post) => (
                <Card
                  key={post.slug}
                  slug={language === localeDefault ? post.slug : `/${language}${post.slug}`}
                  title={post.title}
                  subtitle={post.subtitle}
                  description={post.description}
                />
              ))}
            </Grid> */}
          </Stack>
          <Stack alignItems="flex-start" spacing={24} py={space.paddingSmall}>
            <Stack alignItems="flex-start" spacing={[6, 8]}>
              <Badge variant="light" p="0">
                Latest Post
              </Badge>
              <Box>
                <Heading as="h2">{firstPost.title}</Heading>
                <Text variant="lightContainer">{firstPost.description}</Text>
              </Box>
              <PrimaryButton to={firstPost.slug}>Continue Reading</PrimaryButton>
            </Stack>
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge variant="light" p="0">
                  Posts
                </Badge>
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
                <Badge variant="light" p="0">
                  Notes
                </Badge>
                <SubtleButton to="/notebook">Read all</SubtleButton>
              </Flex>
              <Grid templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]} gap={[4, null, 8]}>
                {garden.nodes.map((item, index) => (
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
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Writing

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true } }, sort: { date: DESC }) {
      nodes {
        ...CardPostInformation
      }
    }
    postsdetailed: allPost(filter: { published: { eq: true } }, sort: { date: DESC }, limit: 10) {
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

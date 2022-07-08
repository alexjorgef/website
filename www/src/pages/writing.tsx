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
import { Container, Stack, Text, Grid } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { WritingSubNavigation } from "../components/writing/subnavigation"
import { Heading } from "../components/typography/heading"
import { Link } from "../components/link"
import { space } from "../constants/space"
import { Card } from "../components/writing/card"
import { SEO } from "../components/seo"
import { useI18nContext } from "../context/i18n-provider"

type WritingProps = {
  posts: {
    nodes: {
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
      locale: string
      locales: string[]
    }[]
  }
  locales: {
    nodes: {
      name: string
    }[]
  }
}

const Writing: React.FC<PageProps<WritingProps>> = ({ data: { posts, locales } }) => {
  const { data: language } = useI18nContext()
  const localeDefault = locales.nodes[0].name
  const postsShow = posts.nodes.filter((post) => (post.locales.length === 0 ? true : post.locale === language.data))

  return (
    <Layout subnavigation={<WritingSubNavigation />}>
      <SEO title="Writing" breadcrumbListItems={[{ name: `Writing`, url: `/writing` }]} />
      <SkipNavContent>
        <Container py={space.paddingMedium}>
          <Stack spacing="20" align="center">
            <Stack spacing="3" align="center">
              <Heading as="h1">Writing</Heading>
              <Text variant="prominent" maxWidth="45ch" textAlign="center">
                So far I’ve written {postsShow.length} longform tutorials & articles. For a shorter and more compact
                content, see my <Link to="/notebook">notebook</Link>.
              </Text>
            </Stack>
            <Grid
              gridTemplateColumns={[`1fr`, null, `repeat(2, 1fr)`]}
              gap={8}
              width={[`100%`, null, null, `calc(100% + 3rem)`]}
            >
              {postsShow.map((post) => (
                <Card
                  key={post.slug}
                  slug={language.data === localeDefault ? post.slug : `/${language.data}${post.slug}`}
                  title={post.title}
                  subtitle={post.subtitle}
                  description={post.description}
                />
              ))}
            </Grid>
          </Stack>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Writing

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true } }, sort: { fields: date, order: DESC }) {
      nodes {
        ...CardPostInformation
      }
    }
    locales: allLocales(filter: { default: { eq: true } }) {
      nodes {
        name
      }
    }
  }
`

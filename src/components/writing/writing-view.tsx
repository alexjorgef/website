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

import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { Box, Container, Divider, Link as ExternalLink, Text, Stack } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import { Layout } from "../blocks/layout"
import { SkipNavContent } from "../a11y/skip-nav"
import { Spacer } from "../blocks/spacer"
import { Prose } from "../typography/prose"
import { components } from "../mdx"
import { ShareAnywhereButton, TwitterButton } from "../buttons"
import { site } from "../../constants/meta.mjs"
import { TocItem, WithSidebarWrapper } from "./toc"

export type WritingViewDataProps = {
  post: {
    slug: string
    title: string
    date: string
    description: string
    excerpt: string
    lastUpdated: string
    seoDate: string
    yearDate: string
    seoLastUpdated: string
    subtitle: string
    timeToRead: string
    locale: string
    locales: Array<string>
    tableOfContents?: {
      items?: Array<TocItem>
    }
    image?: string
    category: {
      name: string
      slug: string
    }
    parent: {
      parent: {
        relativePath: string
      }
    }
  }
  pathname: string
  type: "prose" | "tutorial" | "awesome"
  mdxContent: string
}

export type PostLocales = {
  allPost: {
    nodes: Array<{
      locale
    }>
  }
}

export const WritingView: React.FC<React.PropsWithChildren<WritingViewDataProps>> = ({
  post,
  pathname,
  children,
  type,
  mdxContent,
}) => {
  const [hasShareApi, setHasShareApi] = useState(false)

  useEffect(() => {
    setHasShareApi(!!window.navigator.share)
  }, [])

  const encoded = encodeURI(post.slug)

  return (
    <Layout>
      <Container variant="proseRoot">
        <SkipNavContent>
          {children}
          {type === `tutorial` && post.tableOfContents?.items ? (
            <WithSidebarWrapper items={post.tableOfContents.items}>
              <Prose as="article" flex="1 1 100%" minW="100%">
                <MDXProvider components={components}>{mdxContent}</MDXProvider>
              </Prose>
            </WithSidebarWrapper>
          ) : (
            <Prose as="article">
              <MDXProvider components={components}>{mdxContent}</MDXProvider>
            </Prose>
          )}
          <Spacer size={12} axis="vertical" />
          <Divider />
          <Spacer size={6} axis="vertical" />
          <Stack
            direction={[`column`, `row`]}
            display="flex"
            spacing="5"
            justifyContent={[`flex-start`, `space-between`]}
            alignItems={[`flex-start`, `center`]}
          >
            <Box>
              <ExternalLink
                href={`mailto:contact@alexjorgef.com?body=${encoded}`}
                fontWeight="medium"
                fontSize={[`md`, null, null, `1.125rem`]}
              >
                Give feedback
              </ExternalLink>
            </Box>
            {hasShareApi ? (
              <Stack direction={[`column`, `row`]}>
                <ShareAnywhereButton link={`${site.url}${post.slug}`} message={post.title} />
                <TwitterButton link={`${site.url}${post.slug}`} message={post.title} variant="outline" />
              </Stack>
            ) : (
              <TwitterButton link={`${site.url}${post.slug}`} message={post.title} />
            )}
          </Stack>
          {type === `prose` && (
            <Text mt={6} fontSize={[`md`, null, null, `1.125rem`]}>
              Last updated: {post.lastUpdated}
            </Text>
          )}
        </SkipNavContent>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  fragment WritingView on Post {
    slug
    title
    description
    excerpt
    seoLastUpdated: lastUpdated
    lastUpdated(formatString: "MMM DD, YYYY")
    seoDate: date
    yearDate: date(formatString: "YYYY")
    date(formatString: "MMM DD, YYYY")
    subtitle
    timeToRead
    image
    locale
    locales
    category {
      name
      slug
    }
    ... on MdxPost {
      parent {
        ... on Mdx {
          parent {
            ... on File {
              relativePath
            }
          }
        }
      }
    }
  }
`

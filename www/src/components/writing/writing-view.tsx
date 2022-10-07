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
import { Box, Container, Divider, Link as ExternalLink, Text, Stack, useColorMode } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { DiscussionEmbed } from "disqus-react"
import { Layout } from "../blocks/layout"
import { SEO } from "../seo"
import { SkipNavContent } from "../a11y/skip-nav"
import { Spacer } from "../blocks/spacer"
import { Prose } from "../typography/prose"
import { components } from "../mdx"
import { article } from "../../constants/json-ld"
import { ShareAnywhereButton, TwitterButton } from "../buttons"
import { site } from "../../constants/meta"
import { TocItem, WithSidebarWrapper } from "./toc"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

export type WritingViewDataProps = {
  post: {
    slug: string
    title: string
    date: string
    description: string
    body: string
    excerpt: string
    lastUpdated: string
    seoDate: string
    yearDate: string
    seoLastUpdated: string
    subtitle: string
    timeToRead: string
    locale: string
    locales: string[]
    tableOfContents?: {
      items?: TocItem[]
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
      rawBody: string
      fields: {
        isDefault: boolean
      }
    }
  }
  pathname: string
  type: "prose" | "tutorial" | "awesome"
}

export type PostLocales = {
  allPost: {
    nodes: {
      locale
    }[]
  }
}

const WritingView: React.FC<React.PropsWithChildren<WritingViewDataProps>> = ({ post, pathname, children, type }) => {
  const [hasShareApi, setHasShareApi] = useState(false)

  useEffect(() => {
    setHasShareApi(!!window.navigator.share)
  }, [])

  const meta = useSiteMetadata()

  const disqusConfig = {
    url: `${meta.siteUrl + pathname}`,
    identifier: post.slug,
    title: post.title,
  }

  const { colorMode } = useColorMode()

  const encoded = encodeURI(post.parent.rawBody)

  return (
    <Layout>
      <SEO title={post.title} description={post.description ? post.description : post.excerpt} image={post.image}>
        <meta name="twitter:label1" value="Time To Read" />
        <meta name="twitter:data1" value={`${post.timeToRead} Minutes`} />
        <meta name="twitter:label2" value="Category" />
        <meta name="twitter:data2" value={post.category.name} />
        <meta name="article:published_time" content={post.seoDate} />
        <meta name="article:modified_time" content={post.seoLastUpdated} />
        <script type="application/ld+json">
          {JSON.stringify(
            article({
              isGarden: false,
              post: {
                title: post.title,
                description: post.description ? post.description : post.excerpt,
                date: post.seoDate,
                lastUpdated: post.seoLastUpdated,
                year: post.yearDate,
                image: post.image,
                slug: post.slug,
              },
              category: {
                name: post.category.name,
                slug: post.category.slug,
              },
            })
          )}
        </script>
      </SEO>
      <Container variant="proseRoot">
        <SkipNavContent>
          {children}
          {type === `tutorial` && post.tableOfContents?.items ? (
            <WithSidebarWrapper items={post.tableOfContents.items}>
              <Prose as="article" flex="1 1 100%" minW="100%">
                <MDXProvider components={components}>
                  <MDXRenderer>{post.body}</MDXRenderer>
                </MDXProvider>
              </Prose>
            </WithSidebarWrapper>
          ) : (
            <Prose as="article">
              <MDXProvider components={components}>
                <MDXRenderer>{post.body}</MDXRenderer>
              </MDXProvider>
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
              {` `}-{` `}
              <ExternalLink
                fontSize={[`md`, null, null, `1.125rem`]}
                fontWeight="medium"
                href={`https://www.twitter.com/search?q=${encodeURIComponent(`https://www.alexjorgef.com${pathname}`)}`}
              >
                Discuss on Twitter
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
        <Spacer size={[16, null, null, 20]} axis="vertical" />
        <div style={{ colorScheme: `normal` }}>
          <DiscussionEmbed shortname={process.env.GATSBY_DISQUS_NAME} config={disqusConfig} fakeProp={colorMode} />
        </div>
      </Container>
    </Layout>
  )
}

export default WritingView

export const query = graphql`
  fragment WritingView on Post {
    slug
    title
    description
    excerpt
    body
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
          rawBody
          fields {
            isDefault
          }
          parent {
            ... on File {
              relativePath
              relativeDirectory
            }
          }
        }
      }
    }
  }
`

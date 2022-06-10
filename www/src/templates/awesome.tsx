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
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { RiPlantFill as PlantIcon } from "react-icons/ri"
import {
  Container,
  Text,
  Divider,
  Flex,
  Tag,
  TagLabel,
  Grid,
  Box,
  Link as ExternalLink,
  Icon,
  Stack,
} from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { Link } from "../components/link"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Prose } from "../components/typography/prose"
import { SEO } from "../components/seo"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"
import { components } from "../components/mdx"
import { article } from "../constants/json-ld"
import { ShareAnywhereButton, TwitterButton } from "../components/buttons"
import { site } from "../constants/meta"
import { TocItem, WithSidebarWrapper } from "../components/writing/toc"

type DataProps = {
  awesome: {
    title: string
    slug: string
    body: string
    icon: string
    seoLastUpdated: string
    lastUpdated: string
    seoDate: string
    yearDate: string
    tableOfContents?: {
      items?: TocItem[]
    }
    date: string
    tags: string[]
    excerpt: string
    parent: {
      parent: {
        relativePath: string
      }
    }
  }
}

const AwesomeTemplate: React.FC<PageProps<DataProps>> = ({ data: { awesome }, location: { pathname } }) => {
  const [hasShareApi, setHasShareApi] = React.useState(false)

  React.useEffect(() => {
    setHasShareApi(!!window.navigator.share)
  }, [])
  return (
    <Layout>
      <SEO title={awesome.title} description={awesome.excerpt} image="/social/digital-garden.png">
        <meta name="twitter:label1" value="Time To Read" />
        <meta name="twitter:label2" value="Category" />
        <meta name="twitter:data2" value={awesome.icon} />
        <meta name="article:published_time" content={awesome.seoDate} />
        <meta name="article:modified_time" content={awesome.seoLastUpdated} />
        <script type="application/ld+json">
          {JSON.stringify(
            article({
              isGarden: true,
              post: {
                title: awesome.title,
                description: awesome.excerpt,
                slug: awesome.slug,
                image: `/social/digital-garden.png`,
                date: awesome.seoDate,
                lastUpdated: awesome.seoLastUpdated,
                year: awesome.yearDate,
              },
              category: {
                name: `Awesome`,
                slug: `/awesomes`,
              },
            })
          )}
        </script>
      </SEO>
      <Container variant="proseRoot">
        <SkipNavContent>
          <Heading as="h1">{awesome.title}</Heading>
          <Spacer size={6} axis="vertical" />
          <Divider />
          <Spacer size={4} axis="vertical" />
          <Grid gridGap={2} gridTemplateColumns={[`1fr`, null, `1fr auto`]} fontSize={[`sm`, `md`, null, null, `lg`]}>
            <Text>
              Created {awesome.date} – Last Updated {awesome.lastUpdated}
            </Text>
            <Flex flexWrap="wrap" justifyContent={[`flex-start`, null, `flex-end`]}>
              {awesome.tags.map((tag) => (
                <Box as="span" ml={2} _first={{ ml: 0 }} key={tag}>
                  {tag}
                </Box>
              ))}
            </Flex>
            <Tag colorScheme="green" justifySelf="flex-start">
              <TagLabel>
                <Link to="/awesomes">Awesome</Link>
              </TagLabel>
            </Tag>
          </Grid>
          <Spacer size={12} axis="vertical" />
          {/* <Prose>
            <MDXProvider components={components}>
              <MDXRenderer>{awesome.body}</MDXRenderer>
            </MDXProvider>
          </Prose> */}
          {awesome.tableOfContents?.items ? (
            <WithSidebarWrapper items={awesome.tableOfContents.items}>
              <Prose as="article" flex="1 1 100%" minW="100%">
                <MDXProvider components={components}>
                  <MDXRenderer>{awesome.body}</MDXRenderer>
                </MDXProvider>
              </Prose>
            </WithSidebarWrapper>
          ) : (
            <Prose as="article">
              <MDXProvider components={components}>
                <MDXRenderer>{awesome.body}</MDXRenderer>
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
                fontSize={[`md`, null, null, `1.125rem`]}
                fontWeight="medium"
                href={`https://github.com/alexjorgef/portfolio/edit/main/www/content/awesome/${awesome.parent.parent.relativePath}`}
              >
                Edit on GitHub
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
                <ShareAnywhereButton link={`${site.url}${awesome.slug}`} message={awesome.title} />
                <TwitterButton link={`${site.url}${awesome.slug}`} message={awesome.title} variant="outline" />
              </Stack>
            ) : (
              <TwitterButton link={`${site.url}${awesome.slug}`} message={awesome.title} />
            )}
          </Stack>
          <Spacer size={12} axis="vertical" />
          <Box
            textStyle="prominent"
            bgGradient="linear(to-tr, green.800, lime.600)"
            borderRadius="xl"
            p={6}
            display="flex"
            flexDirection="row"
            alignItems="center"
            color="green.100"
            boxShadow="xl"
            textShadow="0px 2px 0px rgba(0, 0, 0, 0.35)"
          >
            <Icon
              as={PlantIcon}
              height={[6, 8, 12]}
              width={[6, 8, 12]}
              mr={6}
              color="lime.300"
              sx={{ filter: `drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.25))` }}
            />
            <Box>
              Want to learn more?{` `}
              <Link to="/awesomes" color="white">
                Browse my awesomes
              </Link>
            </Box>
          </Box>
        </SkipNavContent>
      </Container>
    </Layout>
  )
}

export default AwesomeTemplate

export const query = graphql`
  query AwesomeTemplate($id: String!) {
    awesome(id: { eq: $id }) {
      title
      body
      slug
      icon
      seoLastUpdated: lastUpdated
      lastUpdated(formatString: "MMM DD, YYYY")
      seoDate: date
      tableOfContents
      date(formatString: "MMM DD, YYYY")
      yearDate: date(formatString: "YYYY")
      tags
      excerpt
      ... on MdxAwesome {
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
  }
`

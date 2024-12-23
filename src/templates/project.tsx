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
import { MDXProvider } from "@mdx-js/react"
import { RiPlantFill as PlantIcon } from "react-icons/ri"
import { Container, Text, Divider, Flex, Tag, TagLabel, Grid, Box, Icon, Image } from "@chakra-ui/react"
import { getSrc, IGatsbyImageData } from "gatsby-plugin-image"
import { Layout } from "../components/blocks/layout"
import { Link } from "../components/link"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Prose } from "../components/typography/prose"
import { SEO } from "../components/seo"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"
import { components } from "../components/mdx"
import { article } from "../constants/json-ld"

type DataProps = {
  project: {
    title: string
    description: string
    slug: string
    icon: string
    seoLastUpdated: string
    seoDate: string
    yearDate: string
    date: string
    lastUpdated: string
    tags: Array<string>
    excerpt: string
    gallery: Array<{
      image: string
      description: string
    }>
    parent: {
      parent: {
        relativePath: string
        relativeDirectory: string
      }
    }
  }
}

const ProjectTemplate: React.FC<PageProps<DataProps>> = ({ data: { project }, children }) => {
  const [, setHasShareApi] = React.useState(false)

  React.useEffect(() => {
    setHasShareApi(!!window.navigator.share)
  }, [])
  return (
    <Layout>
      <SEO title={project.title} description={project.excerpt} image="/social/digital-garden.png">
        <meta name="twitter:label1" value="Time To Read" />
        <meta name="twitter:label2" value="Category" />
        <meta name="twitter:data2" value={project.icon} />
        <meta name="article:published_time" content={project.seoDate} />
        <meta name="article:modified_time" content={project.seoLastUpdated} />
        <script type="application/ld+json">
          {JSON.stringify(
            article({
              isGarden: true,
              post: {
                title: project.title,
                description: project.excerpt,
                slug: project.slug,
                image: `/social/digital-garden.png`,
                date: project.seoDate,
                lastUpdated: project.seoLastUpdated,
                year: project.yearDate,
              },
              category: {
                name: `Notebook`,
                slug: `/notebook`,
              },
            })
          )}
        </script>
      </SEO>
      <Container variant="proseRoot">
        <SkipNavContent>
          <Heading as="h1">{project.title}</Heading>
          <Spacer size={2} axis="vertical" />
          <Text>{project.description}</Text>
          <Spacer size={6} axis="vertical" />
          <Divider />
          <Spacer size={4} axis="vertical" />
          <Grid gridGap={2} gridTemplateColumns={[`1fr`, null, `1fr auto`]} fontSize={[`sm`, `md`, null, null, `lg`]}>
            <Text>
              Created {project.date} - Last Updated {project.lastUpdated}
            </Text>
            <Flex flexWrap="wrap" justifyContent={[`flex-start`, null, `flex-end`]}>
              {project.tags.map((tag) => (
                <Box as="span" ml={2} _first={{ ml: 0 }} key={tag}>
                  #{tag}
                </Box>
              ))}
            </Flex>
          </Grid>
          <Spacer size={12} axis="vertical" />
          <Prose>
            <MDXProvider components={components}>{children}</MDXProvider>
            <Heading as="h2">Previews</Heading>
            <Flex>
              {project.gallery.map((img) => (
                <Box p={2} key={img.description}>
                  <Link to={img.image}>
                    <Image src={img.image} alt={img.description} width="500px" objectFit="cover" />
                  </Link>
                </Box>
              ))}
            </Flex>
          </Prose>
          <Spacer size={6} axis="vertical" />
          <Box
            textStyle="prominent"
            bgGradient="linear(to-tr, blue.800, blue.400)"
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
              color="blue.200"
              sx={{ filter: `drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.25))` }}
            />
            <Box>
              Want to view more?{` `}
              <Link to="/about/portfolio" color="white">
                Browse my portfolio
              </Link>
            </Box>
          </Box>
        </SkipNavContent>
      </Container>
    </Layout>
  )
}

export default ProjectTemplate

export const query = graphql`
  query ProjectTemplate($id: String!) {
    project(id: { eq: $id }) {
      title
      description
      slug
      tags
      seoDate: date
      date(formatString: "MMM DD, YYYY")
      seoLastUpdated: lastUpdated
      lastUpdated(formatString: "MMM DD, YYYY")
      yearDate: date(formatString: "YYYY")
      image
      gallery {
        image
        description
      }
      excerpt
      ... on MdxProject {
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

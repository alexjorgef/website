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
import { PageProps, graphql, Link as GatsbyLink } from "gatsby"
import {
  Container,
  Stack,
  Text,
  Grid,
  Divider,
  GridItem,
  Image,
  Flex,
  Box,
  HStack,
  Tag,
  Heading as ChakraHeading,
  TagLabel,
  useBreakpointValue,
} from "@chakra-ui/react"
import { getSrc, IGatsbyImageData } from "gatsby-plugin-image"
import { Layout } from "../../components/blocks/layout"
import { SkipNavContent } from "../../components/a11y/skip-nav"
import { Heading } from "../../components/typography/heading"
import { space } from "../../constants/space"
import { SEO } from "../../components/seo"

type DataProps = {
  portfolio: {
    nodes: {
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
      archived: boolean
      featureImage: IGatsbyImageData
    }[]
  }
}

const Portfolio: React.FC<PageProps<DataProps>> = ({ data: { portfolio } }) => {
  const imageDisplay = useBreakpointValue({ base: `none`, md: `block` })

  return (
    <Layout>
      <SEO title="Portfolio" breadcrumbListItems={[{ name: `Portfolio`, url: `/portfolio` }]} />
      <SkipNavContent>
        <Container py={space.paddingMedium}>
          <Stack spacing="20" align="center">
            <Stack spacing="3" align="center">
              <Heading as="h1">Portfolio</Heading>
              <Text variant="prominent" maxWidth="45ch" textAlign="center">
                A compilation of my experiences
              </Text>
            </Stack>
            <Grid
              gridTemplateColumns={[`1fr`, null, `repeat(1, 1fr)`]}
              gap={8}
              width={[`100%`, null, null, `calc(100% + 3rem)`]}
            >
              {portfolio.nodes.map((project, i, portfolioMapped) => {
                const imageSrc = getSrc(project.featureImage)
                return (
                  <Container key={project.slug}>
                    <GatsbyLink to={project.slug}>
                      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(3, 1fr)" gap={8}>
                        <GridItem colSpan={2}>
                          <HStack spacing="16px" align="center" justify="left">
                            <Box>
                              <ChakraHeading as="h2" size="2xl">
                                {project.title}
                              </ChakraHeading>
                            </Box>
                            <Box>
                              {project.archived ? (
                                <Tag colorScheme="blue">
                                  <TagLabel>Archived</TagLabel>
                                </Tag>
                              ) : (
                                <Tag colorScheme="green">
                                  <TagLabel>Active</TagLabel>
                                </Tag>
                              )}
                            </Box>
                          </HStack>
                          <Text mt={4}>{project.description}</Text>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <Flex justifyContent="flex-end">
                            <Image
                              display={imageDisplay}
                              borderRadius="lg"
                              src={imageSrc}
                              alt={project.title}
                              width={`300px`}
                              height={`300px`}
                              objectFit="cover"
                            />
                          </Flex>
                        </GridItem>
                      </Grid>
                    </GatsbyLink>
                    {i + 1 !== portfolioMapped.length && <Divider mt={4} orientation="horizontal" />}
                  </Container>
                )
              })}
            </Grid>
          </Stack>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Portfolio

export const query = graphql`
  {
    portfolio: allProject(sort: { fields: date, order: DESC }) {
      nodes {
        title
        date
        archived
        slug
        description
        featureImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF], quality: 90)
          }
        }
      }
    }
  }
`

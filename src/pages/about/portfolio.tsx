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
  Badge,
  Box,
  VStack,
  Link as ChakraLink,
  // Tag,
  Heading as ChakraHeading,
  // TagLabel,
  useBreakpointValue,
} from "@chakra-ui/react"
import { Layout } from "../../components/blocks/layout"
import { SkipNavContent } from "../../components/a11y/skip-nav"
import { Heading } from "../../components/typography/heading"
import { SubtleButton } from "../../components/buttons"
import { space } from "../../constants/space"
import { GitRepoGallery } from "../../components/blocks/gitRepoGallery"
import { SEO } from "../../components/seo"

type RepositoryInfo = {
  stargazerCount: number
  description: string
  name: string
  url: string
}

type DataProps = {
  portfolio: {
    nodes: Array<{
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
      image: string
    }>
  }
  repoGh1?: {
    repository?: RepositoryInfo
  }
  repoGh2?: {
    repository?: RepositoryInfo
  }
  repoGh3?: {
    repository?: RepositoryInfo
  }
  repoGh4?: {
    repository?: RepositoryInfo
  }
  repoGh5?: {
    repository?: RepositoryInfo
  }
  repoGl1?: {
    repository?: RepositoryInfo
  }
  repoGl2?: {
    repository?: RepositoryInfo
  }
}

const openSourceRepos = [
  {
    name: `sliverbot`,
    url: `https://github.com/alexjorgef/sliverbot`,
  },
  {
    name: `invisiblespider`,
    url: `https://github.com/alexjorgef/invisiblespider`,
  },
  {
    name: `website-v3`,
    url: `https://github.com/alexjorgef/website-v3`,
  },
  {
    name: `website-v4`,
    url: `https://github.com/alexjorgef/website-v4`,
  },
  {
    name: `website-costalanparty2010`,
    url: `https://github.com/alexjorgef/website-costalanparty2010`,
  },
  {
    name: `website-costalanparty2011`,
    url: `https://github.com/alexjorgef/website-costalanparty2011`,
  },
  {
    name: `test`,
    url: `https://github.com/alexjorgef/test`,
  },
  {
    name: `alexjorgef.github.io`,
    url: `https://github.com/alexjorgef/alexjorgef.github.io`,
  },
  {
    name: `alexjorgef`,
    url: `https://github.com/alexjorgef/alexjorgef`,
  },
]

const Portfolio: React.FC<PageProps<DataProps>> = ({ data }) => {
  const imageDisplay = useBreakpointValue({ base: `none`, md: `block` }, `md`)
  const repoGh1 = data?.repoGh1?.repository ?? ({} as RepositoryInfo)
  const repoGh2 = data?.repoGh2?.repository ?? ({} as RepositoryInfo)
  const repoGh3 = data?.repoGh3?.repository ?? ({} as RepositoryInfo)
  const repoGh4 = data?.repoGh4?.repository ?? ({} as RepositoryInfo)
  const repoGh5 = data?.repoGh5?.repository ?? ({} as RepositoryInfo)
  const repoGl1 = data?.repoGl1?.repository ?? ({} as RepositoryInfo)
  const repoGl2 = data?.repoGl2?.repository ?? ({} as RepositoryInfo)
  const isReposFetched = repoGh1 && repoGh2 && repoGh3 && repoGh4 && repoGh5 && repoGl1 && repoGl2
  const reposGh = [repoGh1, repoGh2, repoGh3, repoGh4, repoGh5]
  const reposGl = [repoGl1, repoGl2]

  return (
    <Layout>
      <SEO title="Portfolio" breadcrumbListItems={[{ name: `Portfolio`, url: `/portfolio` }]} />
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Stack spacing="32" align="center">
            <Stack spacing="3" align="center">
              <Heading as="h1">Portfolio</Heading>
              <Text variant="prominent" maxWidth="45ch" textAlign="center">
                A compilation of my experiences, learnings and thoughts as a software developer
              </Text>
            </Stack>
            <Grid
              gridTemplateColumns={[`1fr`, null, `repeat(3, 1fr)`]}
              gap={8}
              width={[`100%`, null, null, `calc(100% + 3rem)`]}
            >
              {data?.portfolio.nodes.map((project, i) => (
                <Container key={project.slug}>
                  <GatsbyLink to={project.slug}>
                    <GridItem colSpan={1} colStart={i % 2 === 0 ? 0 : 1}>
                      <Flex justifyContent="flex-start" width="100%">
                        <Image
                          display={imageDisplay}
                          borderRadius="lg"
                          src={project.image}
                          alt={project.title}
                          width={`100%`}
                          height={`250px`}
                          objectFit="cover"
                        />
                      </Flex>
                      <VStack spacing="8px" align="flex-start" justify="left" marginTop={`16px`}>
                        <Box>
                          <ChakraHeading as="h2" size="2xl">
                            {project.title}
                          </ChakraHeading>
                        </Box>
                      </VStack>
                      <Divider mt={4} orientation="horizontal" />
                      <Text mt={4}>{project.description}</Text>
                    </GridItem>
                  </GatsbyLink>
                  {/* {i + 1 !== portfolioMapped.length && <Divider mt={4} orientation="horizontal" />} */}
                </Container>
              ))}
            </Grid>
          </Stack>
          <Stack spacing="32" align="center" paddingTop="32">
            <Stack spacing="3" align="center">
              <Heading as="h1">Open Source Repositories</Heading>
              <Text variant="prominent" maxWidth="40ch" textAlign="center">
                Featured repositories across GitHub and GitLab
              </Text>
            </Stack>
            {isReposFetched ? (
              <Stack direction="column" width="100%" spacing={6}>
                <Flex justifyContent="flex-end" alignItems="center">
                  <SubtleButton isExternal to="https://www.github.com/alexjorgef">
                    GitHub
                  </SubtleButton>
                </Flex>
                <GitRepoGallery repositories={reposGh} />
                <Flex justifyContent="flex-end" alignItems="center">
                  <SubtleButton isExternal to="https://www.gitlab.com/alexjorgef">
                    GitLab
                  </SubtleButton>
                </Flex>
                <GitRepoGallery repositories={reposGl} inverted />
                <Flex justifyContent="space-between" flexWrap="wrap">
                  {openSourceRepos.map((repo) => (
                    <ChakraLink key={repo.url} href={repo.url} p={2}>
                      {repo.name}
                    </ChakraLink>
                  ))}
                </Flex>
              </Stack>
            ) : (
              <Box p={2} borderRadius="lg">
                <strong>GATSBY_GITHUB_TOKEN</strong> for gatsby-source-graphql necessary.
              </Box>
            )}
          </Stack>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Portfolio

export const query = graphql`
  {
    portfolio: allProject(sort: { date: DESC }) {
      nodes {
        title
        date
        slug
        description
        image
      }
    }
    repoGh1: github {
      repository(name: "go-bittrex", owner: "alexjorgef") {
        stargazerCount
        description
        name
        url
      }
    }
    repoGh2: github {
      repository(name: "cv", owner: "alexjorgef") {
        stargazerCount
        description
        name
        url
      }
    }
    repoGh3: github {
      repository(name: "website", owner: "alexjorgef") {
        stargazerCount
        description
        name
        url
      }
    }
    repoGh4: github {
      repository(name: "signalr", owner: "alexjorgef") {
        stargazerCount
        description
        name
        url
      }
    }
    repoGh5: github {
      repository(name: "telegram-git-bot", owner: "alexjorgef") {
        stargazerCount
        description
        name
        url
      }
    }
    repoGl1: gitlab {
      repository: project(fullPath: "alexjorgef/alexjorgef.gitlab.io") {
        stargazerCount: starCount
        description
        name
        url: webUrl
      }
    }
    repoGl2: gitlab {
      repository: project(fullPath: "alexjorgef/test") {
        stargazerCount: starCount
        description
        name
        url: webUrl
      }
    }
  }
`

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
  VStack,
  Link as ChakraLink,
  Heading as ChakraHeading,
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

type RepositoryGithubInfoFethed = {
  id: string
  name: string
  stargazerCount: number
  description: string | null
  owner: {
    login: string
  }
}
type RepositoryGitlabInfoFethed = {
  id: string
  name: string
  stargazerCount: number
  description: string | null
  url: string
}

type DataProps = {
  workfolio: {
    nodes: Array<{
      title: string
      date: string
      slug: string
      subtitle: string
      description: string
      image: string
    }>
  }
  reposGhFethed?: {
    totalCount: number
    edges: {
      node: RepositoryGithubInfoFethed
    }[]
  }
  reposGlFethed?: {
    totalCount: number;
    edges: {
      node: RepositoryGitlabInfoFethed
    }[]
  }
}

const Workfolio: React.FC<PageProps<DataProps>> = ({ data }) => {
  const imageDisplay = useBreakpointValue({ base: `none`, md: `block` }, `md`)
  const reposGithub = data?.reposGhFethed ?? ({ totalCount: 0, edges: [] as { node: RepositoryGithubInfoFethed }[]})
  const reposGitLab = data?.reposGlFethed ?? ({ totalCount: 0, edges: [] as { node: RepositoryGitlabInfoFethed }[]})
  const isReposFetched = (reposGithub.totalCount > 0 || reposGitLab.totalCount > 0)

  const reposGh: RepositoryInfo[] = []
  if (reposGithub.totalCount > 0) {
    for (const repoGithubFethed of reposGithub.edges) {
      reposGh.push({
        name: repoGithubFethed.node.name,
        description: repoGithubFethed.node.description ?? "",
        url: `https://github.com/${repoGithubFethed.node.owner.login}/${repoGithubFethed.node.name}`,
        stargazerCount: repoGithubFethed.node.stargazerCount
      })
    }
  }
  const reposGl: RepositoryInfo[] = []
  if (reposGitLab.totalCount > 0) {
    for (const repoGitlabFethed of reposGitLab.edges) {
      reposGl.push({
        name: repoGitlabFethed.node.name,
        description: repoGitlabFethed.node.description ?? "",
        url: repoGitlabFethed.node.url,
        stargazerCount: repoGitlabFethed.node.stargazerCount
      })
    }
  }

  return (
    <Layout>
      <SEO title="Workfolio" breadcrumbListItems={[{ name: `Workfolio`, url: `/workfolio` }]} />
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Stack spacing="32" align="center">
            <Stack spacing="3" align="center">
              <Heading as="h1">Workfolio</Heading>
              <Text variant="prominent" maxWidth="45ch" textAlign="center">
                A compilation of my experiences and projects as a software developer
              </Text>
            </Stack>
            <Grid
              gridTemplateColumns={[`1fr`, null, `repeat(3, 1fr)`]}
              gap={8}
              width={[`100%`, null, null, `calc(100% + 3rem)`]}
            >
              {data?.workfolio.nodes.map((project, i) => (
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
                <GitRepoGallery repositories={reposGh.slice(0, 5)} />
                <Flex justifyContent="flex-end" alignItems="center">
                  <SubtleButton isExternal to="https://www.gitlab.com/alexjorgef">
                    GitLab
                  </SubtleButton>
                </Flex>
                <GitRepoGallery repositories={reposGl.slice(0, 5)} inverted />
                <Flex justifyContent="space-between" flexWrap="wrap">
                  {[...reposGh.slice(5), ...reposGl.slice(5)].map((repo) => (
                    <ChakraLink key={repo.url} href={repo.url} p={2}>
                      {repo.name}
                    </ChakraLink>
                  ))}
                </Flex>
              </Stack>
            ) : (
              <Box p={2} borderRadius="lg">
                Repositories are <strong>not</strong> fetched.
              </Box>
            )}
          </Stack>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Workfolio

export const query = graphql`
  {
    workfolio: allProject(sort: { date: DESC }) {
      nodes {
        title
        date
        slug
        description
        image
      }
    }
    reposGhFethed: allGithubRepository {
      totalCount
      edges {
        node {
          id
          name
          stargazerCount
          description
          owner {
            login
          }
        }
      }
    }
    reposGlFethed: allGitlabRepository {
      totalCount
      edges {
        node {
          id
          name
          stargazerCount
          description
          url
        }
      }
    }
  }
`

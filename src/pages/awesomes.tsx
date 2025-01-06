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
import { graphql, PageProps } from "gatsby"
import {
  Container,
  Text,
  useColorModeValue,
  usePrefersReducedMotion,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Heading as ChakraHeading,
  Stack,
  Box,
} from "@chakra-ui/react"
import { BsArrowRight } from "react-icons/bs"
import { Layout } from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { space } from "../constants/space"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"
import { SEO } from "../components/seo"
import { useQueryStringReducer } from "../hooks/use-query-string-reducer"
import { queryStringIso } from "../utils/query-string-iso"
// import { SVGIconNames } from "../components/blocks/svg-icon"
import { SVGIconNames, SVGIcon } from "../components/blocks/svg-icon"
import { Link } from "../components/link"

type DataProps = {
  awesomes: {
    group: Array<{
      title: string
    }>
    nodes: Array<{
      title: string
      slug: string
      icon: SVGIconNames
      lastUpdated: string
      tags: Array<string>
    }>
  }
}

interface IState {
  tags: Array<string>
  searchQuery: string
}

type Action =
  | { type: `ADD_TAG`; payload: string }
  | { type: `REMOVE_TAG`; payload: string }
  | { type: `SET_QUERY`; payload: string }

const initialState: IState = {
  tags: [],
  searchQuery: ``,
}

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case `ADD_TAG`:
      return { ...state, tags: state.tags.concat(action.payload) }
    case `REMOVE_TAG`:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      }
    case `SET_QUERY`:
      return {
        ...state,
        searchQuery: action.payload,
      }
    default:
      throw new Error(`Unknown action passed to filter reducer`)
  }
}

const Awesomes: React.FC<PageProps<DataProps>> = ({ data: { awesomes }, location }) => {
  const [state, dispatch] = useQueryStringReducer<IState, Action>({
    reducer,
    initialState,
    // @ts-ignore - Somehow doesn't work
    iso: queryStringIso,
    location,
  })
  const prefersReducedMotion = usePrefersReducedMotion()
  const dividerColor = useColorModeValue(`blueGray.100`, `blueGray.800`)
  const bgHoverColor = useColorModeValue(`blueGray.100`, `blueGray.800`)

  const handleInputChange = (event) => {
    dispatch({ type: `SET_QUERY`, payload: event.target.value })
  }

  return (
    <Layout>
      <SEO
        title="Awesomes"
        description="I understand my notebook as a collection of free form, interconnected & evolving ideas that grow over time. Like plants grow in a real-world garden."
        image="/social/digital-garden.png"
        breadcrumbListItems={[{ name: `Awesomes`, url: `/awesomes` }]}
      />
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Heading as="h1">Awesomes</Heading>
          <Text textStyle="prominent">
            During my research time I usually write down resources that I find useful. Here they are.
          </Text>
          <Spacer size={6} axis="vertical" />
          <Wrap>
            {awesomes.group.map((tag) => {
              const isActive = state.tags.includes(tag.title)

              return (
                <WrapItem
                  as="button"
                  onClick={() => {
                    if (state.tags.includes(tag.title)) {
                      dispatch({ type: `REMOVE_TAG`, payload: tag.title })
                    } else {
                      dispatch({ type: `ADD_TAG`, payload: tag.title })
                    }
                  }}
                  borderRadius="md"
                  _hover={{
                    cursor: `pointer`,
                  }}
                  _focus={{
                    boxShadow: `outline`,
                    outline: `none`,
                  }}
                  key={`${tag.title}-${isActive}`}
                >
                  <Tag colorScheme={isActive ? `blue` : `gray`} size="lg">
                    <TagLabel>{tag.title}</TagLabel>
                    {isActive && <TagCloseButton as="span" aria-hidden aria-label="" />}
                  </Tag>
                </WrapItem>
              )
            })}
          </Wrap>
          <Input onChange={handleInputChange} width={350} mt={6} id="filter" placeholder="Type to filter awesomes..." />
          <Spacer size={20} axis="vertical" />
          <Stack
            spacing={0}
            divider={<Spacer axis="horizontal" size="100%" bg={dividerColor} border="none" />}
            mx={[`-2`, null, null, `-6`]}
          >
            {awesomes.nodes
              .filter(({ tags = [], slug, title }) => {
                if (state.tags.length === 0 && state.searchQuery === ``) {
                  return true
                }
                if (state.tags.length === 0 && state.searchQuery !== ``) {
                  return (
                    slug.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                    title.toLowerCase().includes(state.searchQuery.toLowerCase())
                  )
                }
                return state.tags.some(
                  (tag) =>
                    tags.includes(tag) &&
                    (slug.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                      title.toLowerCase().includes(state.searchQuery.toLowerCase()))
                )
              })
              .map((awesome) => (
                <Link
                  to={awesome.slug}
                  key={awesome.slug}
                  display="grid"
                  gridTemplateColumns={[`25px 1fr 20px`, `35px 1fr 20px`, null, `50px 1fr 24px`]}
                  alignItems="center"
                  gridGap={6}
                  px={[2, null, null, 6]}
                  py={[2, null, null, 6]}
                  borderRadius="lg"
                  _hover={{
                    textDecoration: `none`,
                    backgroundColor: bgHoverColor,
                  }}
                  sx={{
                    span: {
                      transform: `translate3d(0px, 0px, 0px)`,
                      transition: `transform .3s cubic-bezier(.73,.26,.42,1.24)`,
                    },
                    "&:hover": {
                      span: {
                        transform: prefersReducedMotion ? undefined : `translate3d(6px, 0px, 0px)`,
                      },
                    },
                  }}
                >
                  <Box width={[25, 35, null, 50]} height={[25, 35, null, 50]}>
                    <SVGIcon id={awesome.icon} width="100%" height="100%" />
                  </Box>
                  <Box>
                    <ChakraHeading as="h2" variant="gardenItem">
                      {awesome.title}
                    </ChakraHeading>
                    <Text fontSize={[`14px`, null, null, `1rem`]}>{awesome.lastUpdated}</Text>
                  </Box>
                  <span>
                    <BsArrowRight />
                  </span>
                </Link>
              ))}
          </Stack>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Awesomes

export const query = graphql`
  {
    awesomes: allAwesome(sort: { lastUpdated: DESC }) {
      group(field: { tags: SELECT }) {
        title: fieldValue
      }
      nodes {
        title
        slug
        icon
        lastUpdated(formatString: "MMM DD, YYYY")
        tags
      }
    }
  }
`

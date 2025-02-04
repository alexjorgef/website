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
import { BsArrowRight } from "react-icons/bs"
import {
  Container,
  // Tag,
  // TagLabel,
  // TagCloseButton,
  // Wrap,
  // WrapItem,
  Heading as ChakraHeading,
  Stack,
  Text,
  Box,
  useColorModeValue,
  usePrefersReducedMotion,
} from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { Link } from "../components/link"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { space } from "../constants/space"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"
import { SEO } from "../components/seo"
// import { useQueryStringReducer } from "../hooks/use-query-string-reducer"
// import { queryStringIso } from "../utils/query-string-iso"
import { SVGIconNames, SVGIcon } from "../components/blocks/svg-icon"
// import { initialState, reducer, TagAction, TagGroup, TagGroupItem, ITagState } from "../components/blocks/tag-group"

type DataProps = {
  garden: {
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

// interface IState {
//   tags: Array<string>
// }

// type Action = { type: `ADD_TAG`; payload: string } | { type: `REMOVE_TAG`; payload: string }

// const initialState: IState = {
//   tags: [],
// }

// const reducer = (state: IState, action: Action) => {
//   switch (action.type) {
//     case `ADD_TAG`:
//       return { ...state, tags: state.tags.concat(action.payload) }
//     case `REMOVE_TAG`:
//       return {
//         ...state,
//         tags: state.tags.filter((tag) => tag !== action.payload),
//       }
//     default:
//       throw new Error(`Unknown action passed to filter reducer`)
//   }
// }

const Garden: React.FC<PageProps<DataProps>> = ({ data: { garden }, location }) => {
  // const [isMounted, setIsMounted] = React.useState(false)
  // React.useEffect(() => {
  //   setIsMounted(true)
  // }, [])
  // const [state, dispatch] = useQueryStringReducer<IState, Action>({
  //   initialState,
  //   location,
  //   reducer,
  //   iso: queryStringIso,
  // })
  const prefersReducedMotion = usePrefersReducedMotion()
  const dividerColor = useColorModeValue(`blueGray.100`, `blueGray.800`)
  const bgHoverColor = useColorModeValue(`blueGray.100`, `blueGray.800`)

  return (
    <Layout>
      <SEO
        title="Digital Garden"
        description="I understand my notebook as a collection of free form, interconnected & evolving ideas that grow over time. Like plants grow in a real-world garden."
        image="/social/digital-garden.png"
        breadcrumbListItems={[{ name: `Notebook`, url: `/notebook` }]}
      />
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Heading as="h1">Notebook</Heading>
          <Text textStyle="prominent">
            Here I will discuss problems, bugs and other quick informations that I think relevant.
          </Text>
          {/* <Spacer size={6} axis="vertical" />
          <Wrap>
            {garden.group.map(({ title: name }) => {
              const isActive = state.tags.includes(name) && isMounted

              return (
                <WrapItem
                  as="button"
                  onClick={() => {
                    if (state.tags.includes(name)) {
                      dispatch({ type: `REMOVE_TAG`, payload: name })
                    } else {
                      dispatch({ type: `ADD_TAG`, payload: name })
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
                  key={`${name}-${isActive}`}
                >
                  <Tag colorScheme={isActive ? `blue` : `gray`} size="lg">
                    <TagLabel>{name}</TagLabel>
                    {isActive && <TagCloseButton as="span" aria-hidden aria-label="" />}
                  </Tag>
                </WrapItem>
              )
            })}
          </Wrap> */}
          <Spacer size={20} axis="vertical" />
          <Stack
            spacing={0}
            divider={<Spacer axis="horizontal" size="100%" bg={dividerColor} border="none" />}
            mx={[`-2`, null, null, `-6`]}
          >
            {garden.nodes
              // .filter(({ tags = [] }) => {
              //   if (!isMounted) return true
              //   if (state.tags.length === 0) {
              //     return true
              //   }
              //   return state.tags.some((tag) => tags.includes(tag))
              // })
              .map((post) => (
                <Link
                  to={post.slug}
                  key={post.slug}
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
                    <SVGIcon id={post.icon} width="100%" height="100%" />
                  </Box>
                  <Box>
                    <ChakraHeading as="h2" variant="gardenItem">
                      {post.title}
                    </ChakraHeading>
                    <Text fontSize={[`14px`, null, null, `1rem`]}>{post.lastUpdated}</Text>
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

export default Garden

export const query = graphql`
  {
    garden: allGarden(sort: { lastUpdated: DESC }) {
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

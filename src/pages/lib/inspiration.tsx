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
import { PageProps } from "gatsby"
import { Container, Stack, Text, Grid, Link as ExternalLink, Image } from "@chakra-ui/react"
import { Layout } from "../../components/blocks/layout"
import { SkipNavContent } from "../../components/a11y/skip-nav"
import { Heading } from "../../components/typography/heading"
import { space } from "../../constants/space"
import { SEO } from "../../components/seo"

type DataProps = {
  wishlist: {
    nodes: Array<{
      id: string
      title: string
      artist: string
      url: string
      img: string
    }>
  }
  userLists: {
    nodes: Array<{
      id: string
      image_url: string
      name: string
      uri: string
      items: Array<{
        id: string
        display_title: string
        image_url: string
        uri: string
      }>
    }>
  }
}

const MusicPage: React.FC<PageProps<DataProps>> = ({ data: { wishlist, userLists } }) => (
  <Layout>
    <SEO title="Music" breadcrumbListItems={[{ name: `Music`, url: `/lib/music` }]} />
    <SkipNavContent>
      <Container py={space.paddingMedium}>
        <Stack spacing="20" align="center">
          <Stack spacing="3" align="center">
            <Heading as="h1">Wishlist</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              This is part of my music wishlist. Feel free to visit my
              {` `}
              <ExternalLink href="https://bandcamp.com/alexjorgef" isExternal>
                profile
              </ExternalLink>
              {` `}
              and check more.
            </Text>
          </Stack>
          <Grid
            gridTemplateColumns={[`1fr`, null, `repeat(3, 1fr)`]}
            gap={8}
            width={[`100%`, null, null, `calc(100% + 3rem)`]}
          >
            {wishlist.nodes.map((wishlistAlbum) => (
              <Container key={wishlistAlbum.id}>
                <ExternalLink href={wishlistAlbum.url} isExternal>
                  <Image
                    borderRadius="lg"
                    src={wishlistAlbum.img}
                    alt={wishlistAlbum.title}
                    boxSize="300px"
                    objectFit="cover"
                  />
                </ExternalLink>
              </Container>
            ))}
          </Grid>
        </Stack>
        <Stack spacing="20" align="center" mt="20">
          <Stack spacing="3" align="center">
            <Heading as="h1">Weekly Mood</Heading>
            <Text variant="prominent" maxWidth="45ch" textAlign="center">
              This is my weekly mood of albums/eps. Feel free to check the entire
              {` `}
              <ExternalLink href={userLists.nodes[0].uri} isExternal>
                list
              </ExternalLink>
              {` `}.
            </Text>
          </Stack>
          <Grid
            gridTemplateColumns={[`1fr`, null, `repeat(3, 1fr)`]}
            gap={8}
            width={[`100%`, null, null, `calc(100% + 3rem)`]}
          >
            {userLists.nodes.map((userList) => (
              <>
                {userList.items.map((item) => (
                  <Container key={item.id}>
                    <ExternalLink href={item.uri} isExternal>
                      <Image
                        borderRadius="lg"
                        src={item.image_url}
                        alt={item.display_title}
                        boxSize="300px"
                        objectFit="cover"
                      />
                    </ExternalLink>
                  </Container>
                ))}
              </>
            ))}
          </Grid>
        </Stack>
      </Container>
    </SkipNavContent>
  </Layout>
)

export default MusicPage

// export const query = graphql`
//   {
//     wishlist: allBandcamp {
//       nodes {
//         id
//         title
//         artist
//         url
//         img
//       }
//     }
//     userLists: allDiscogsUserLists {
//       nodes {
//         id
//         name
//         image_url
//         uri
//         items {
//           id
//           image_url
//           display_title
//           uri
//         }
//       }
//     }
//   }
// `

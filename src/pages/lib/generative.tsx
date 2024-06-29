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
import { Container, Stack, Text, Grid } from "@chakra-ui/react"
import { Layout } from "../../components/blocks/layout"
import { SkipNavContent } from "../../components/a11y/skip-nav"
import { Heading } from "../../components/typography/heading"
import { space } from "../../constants/space"
import { SEO } from "../../components/seo"

const Generative: React.FC<PageProps> = () => {
  const youtubeVideos = [`6mbea681zLg`, `vI4N5yNXO1g`]

  return (
    <Layout>
      <SEO title="Generative Designs" breadcrumbListItems={[{ name: `Generative Designs`, url: `/lib/generative` }]} />
      <SkipNavContent>
        <Container py={space.paddingMedium}>
          <Stack spacing="20" align="center">
            <Stack spacing="3" align="center">
              <Heading as="h1">Generative Designs</Heading>
              <Text variant="prominent" maxWidth="45ch" textAlign="center">
                Some of the experiments I'm doing.
              </Text>
            </Stack>
            <Grid
              gridTemplateColumns={[`1fr`, null, `repeat(2, 1fr)`]}
              gap={8}
              width={[`100%`, null, null, `calc(100% + 3rem)`]}
            >
              {youtubeVideos.map((video) => (
                <Container key={video}>
                  <iframe
                    width="400"
                    height="400"
                    src={`https://www.youtube-nocookie.com/embed/${video}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </Container>
              ))}
            </Grid>
          </Stack>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Generative

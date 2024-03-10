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
import { Box, Container, Flex, Text, Grid } from "@chakra-ui/react"
import { BackgroundProps } from "@chakra-ui/system"
import { space } from "../../constants/space"
import { Heading } from "../typography/heading"

type CategoryHeroProps = {
  bgGradient: BackgroundProps["bgGradient"]
  title: string
  description: React.ReactNode
  image?: React.ReactNode
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ bgGradient, title, description, image = undefined }) => (
  <Box mt="-navigationWithSubHeight" bgGradient={bgGradient} pt="navigationWithSubHeight">
    <Container py={space.paddingSmall}>
      <Grid templateColumns="auto" gap={12}>
        <Flex direction="column">
          <Heading as="h1" color="white">
            {title}
          </Heading>
          <Text textStyle="prominent" color="gray.100" maxWidth="65ch">
            {description}
          </Text>
        </Flex>
        {image}
      </Grid>
    </Container>
  </Box>
)

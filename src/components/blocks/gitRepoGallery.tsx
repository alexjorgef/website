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
import { FaStar } from "react-icons/fa"
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Link as ChakraLink,
  useColorModeValue,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
} from "@chakra-ui/react"

type RepositoryInfo = {
  stargazerCount: number
  description: string
  name: string
  url: string
}

type GitRepoGalleryProps = {
  repositories?: Array<RepositoryInfo>
  inverted?: boolean
}

export const GitRepoGallery: React.FC<GitRepoGalleryProps> = ({ inverted = false, repositories = undefined }) => {
  const secondaryRepoBg = useColorModeValue(`blueGray.100`, `blueGray.800`)
  return (
    <Grid gridTemplateColumns={[`1fr`, null, null, `repeat(3, 1fr)`]} gap={4} width={[`100%`]}>
      {repositories.map((repository, i) => {
        const rowIndex = i % 2 === 0 ? i / 2 : (i - 1) / 2
        const rowIndexEven = inverted ? (rowIndex + 1) % 2 === 0 : rowIndex % 2 === 0
        const indexEven = i % 2 === 0
        const colSpanDefault = indexEven ? 2 : 1
        const colSpanInverted = indexEven ? 1 : 2
        const colSpan = rowIndexEven ? colSpanDefault : colSpanInverted
        const colStartDefault = indexEven ? 1 : 3
        const colStartInverted = indexEven ? 1 : 2
        const colStart = rowIndexEven ? colStartDefault : colStartInverted
        const boxBackgroundDefault = indexEven ? secondaryRepoBg : `primaryBg`
        const boxBackgroundInverted = indexEven ? `primaryBg` : secondaryRepoBg
        const boxBackground = rowIndexEven ? boxBackgroundDefault : boxBackgroundInverted
        const boxColorDefault = indexEven ? {} : `#e7f1ff`
        const boxColorInverted = indexEven ? `#e7f1ff` : {}
        const boxColor = rowIndexEven ? boxColorDefault : boxColorInverted
        const tagColorDefault = indexEven ? `gray` : `blue`
        const tagColorInverted = indexEven ? `gray` : `blue`
        const tagColor = rowIndexEven ? tagColorDefault : tagColorInverted
        const linkColorDefault = indexEven ? {} : `white`
        const linkColorInverted = indexEven ? {} : `white`
        const linkColor = rowIndexEven ? linkColorDefault : linkColorInverted
        return (
          <GridItem colSpan={colSpan} colStart={colStart}>
            <Box bg={boxBackground} p={4} borderRadius="lg" height="100%" color={boxColor}>
              <Flex flexDirection="row" justifyContent="flex-start" mb={2}>
                <ChakraLink
                  fontSize={[`lg`, null, null, null, `1.3125rem`]}
                  color={linkColor}
                  fontWeight="bold"
                  href={repository.url}
                  textOverflow={"clip"}
                >
                  <Box overflow={"hidden"} maxWidth="100%">
                    {repository.name}
                  </Box>
                  {/* <Text noOfLines={1}>

                  </Text> */}
                </ChakraLink>
              </Flex>
              <Flex flexDirection="row" justifyContent="flex-start" mb={6}>
                <Tag variant="subtle" colorScheme={tagColor} height="100%" padding={2}>
                  <TagLeftIcon as={FaStar} />
                  <TagLabel>{repository.stargazerCount}</TagLabel>
                </Tag>
              </Flex>
              <Text noOfLines={2}>{repository.description}</Text>
            </Box>
          </GridItem>
        )
      })}
    </Grid>
  )
}

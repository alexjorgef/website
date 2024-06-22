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

import { extendTheme } from "@chakra-ui/react"

// Global style overrides
import { styles } from "./styles"

// Foundational style overrides
import { colors } from "./foundations/colors"
import { fontWeights, fonts, fontSizes, lineHeights, textStyles } from "./foundations/typography"
import { sizes } from "./foundations/sizes"
import { semanticTokens } from "./foundations/semantic-tokens"

// Components overrides & custom
import { Container } from "./components/container"
import { FullWidthContainer } from "./components/full-width-container"
import { Heading } from "./components/heading"
import { Prose } from "./components/prose"
import { Text } from "./components/text"
import { Badge } from "./components/badge"
import { Button } from "./components/button"

// Custom breakpoints
const breakpoints = {
  sm: `640px`,
  md: `768px`,
  lg: `1024px`,
  xl: `1280px`,
  "2xl": `1536px`,
}

export const theme = {
  styles,
  colors,
  sizes,
  space: sizes,
  fontWeights,
  fonts,
  fontSizes,
  lineHeights,
  textStyles,
  semanticTokens,
  components: {
    Container,
    FullWidthContainer,
    Heading,
    Prose,
    Text,
    Badge,
    Button,
  },
  breakpoints,
  config: {
    initialColorMode: `system`,
    useSystemColorMode: true,
  },
}

export const extendedTheme = extendTheme(theme)

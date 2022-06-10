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

import { transparentize } from "@chakra-ui/theme-tools"
import { colorPalette, colors } from "./colors"

const navBgTransparency = 0.85

const semanticTokens = {
  colors: {
    primary: {
      default: `blue.600`,
      _dark: `orange.600`,
    },
    primaryAlpha: {
      default: transparentize(`blueGray.400`, 0.25)(colorPalette),
      _dark: transparentize(`blueGray.400`, 0.25)(colorPalette),
    },
    primaryBg: {
      default: `blue.600`,
      _dark: `blue.900`,
    },
    primaryHover: {
      default: `blue.700`,
      _dark: `orange.700`,
    },
    text: {
      default: `blueGray.800`,
      _dark: `blueGray.300`,
    },
    textMuted: {
      default: `blueGray.700`,
      _dark: `blueGray.400`,
    },
    textEmphasized: {
      default: `blue.600`,
      _dark: `orange.500`,
    },
    proseText: {
      default: `gray.700`,
      _dark: `gray.300`,
    },
    proseLink: {
      default: `gray.900`,
      _dark: `gray.100`,
    },
    proseLinkDecoration: {
      default: `gray.300`,
      _dark: `gray.500`,
    },
    blueLinkDecoration: {
      default: `blue.300`,
      _dark: `blue.500`,
    },
    orangeLinkDecoration: {
      default: `orange.300`,
      _dark: `orange.400`,
    },
    greenLinkDecoration: {
      default: `green.400`,
      _dark: `green.500`,
    },
    redLinkDecoration: {
      default: `red.300`,
      _dark: `red.500`,
    },
    heading: {
      default: `black`,
      _dark: `white`,
    },
    bg: {
      default: colors.brand.bg,
      _dark: colors.brand.dark.bg,
    },
    bgAlpha: {
      default: transparentize(`white`, navBgTransparency)(colorPalette),
      _dark: transparentize(`blueGray.900`, navBgTransparency)(colorPalette),
    },
    cardBg: {
      default: `white`,
      _dark: `blueGray.800`,
    },
    cardHeadingColor: {
      default: `black`,
      _dark: `white`,
    },
    cardSubheading: {
      default: `blueGray.700`,
      _dark: `blueGray.400`,
    },
  },
}

export default semanticTokens

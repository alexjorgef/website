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

import { mode } from "@chakra-ui/theme-tools"
import { colors } from "../foundations/colors"
import InnerContainerStyles from "./container"

export const FullWidthContainer = {
  parts: [`outer`, `inner`],
  baseStyle: {
    outer: {
      w: `100%`,
      margin: 0,
    },
    inner: {
      ...InnerContainerStyles.baseStyle,
    },
  },
  variants: {
    default: {
      outer: {
        bg: `bg`,
      },
    },
    hero: ({ colorMode }) => {
      const isDarkMode = colorMode === `dark`
      const topColor = `var(--chakra-colors-bg)`
      const bottomColor = isDarkMode ? colors.blueGray[`950`] : colors.brand.bg

      return {
        outer: {
          bg: `linear-gradient(0deg, ${bottomColor} 0%, ${topColor} 100%)`,
        },
      }
    },
    light: ({ colorMode }) => {
      const isDarkMode = colorMode === `dark`
      const topColor = isDarkMode ? colors.blueGray[`800`] : colors.blueGray[`50`]
      const bottomColor = isDarkMode ? colors.brand.dark.bg : colors.blueGray[`50`]

      return {
        outer: {
          bg: `linear-gradient(0deg, ${bottomColor} 0%, ${topColor} 100%)`,
        },
      }
    },
    dark: ({ colorMode }) => {
      const isDarkMode = colorMode === `dark`
      const topColor = isDarkMode ? colors.blueGray[`950`] : colors.blueGray[`700`]
      const bottomColor = isDarkMode ? colors.blueGray[`900`] : colors.blueGray[`700`]

      return {
        outer: {
          bg: `linear-gradient(0deg, ${bottomColor} 0%, ${topColor} 100%)`,
        },
        inner: {
          color: `blueGray.300`,
        },
      }
    },
    navigation: (props) => ({
      outer: {
        bg: `bgAlpha`,
        backdropFilter: `blur(8px)`,
        position: `fixed`,
        display: `flex`,
        zIndex: `sticky`,
      },
      inner: {
        header: {
          color: mode(`black`, `white`)(props),
        },
      },
    }),
    navigationWithSub: (props) => ({
      outer: {
        bg: `bgAlpha`,
        backdropFilter: `blur(8px)`,
        position: `fixed`,
        display: `flex`,
        zIndex: `sticky`,
      },
      inner: {
        header: {
          color: mode(`black`, `white`)(props),
        },
      },
    }),
    fullBleed: {
      outer: {
        bg: `transparent`,
        color: `white`,
        display: `flex`,
        zIndex: `sticky`,
      },
      inner: {
        button: {
          color: `gray.100`,
          _hover: {
            color: `white`,
          },
        },
        "[data-name='subnavigation']": {
          color: `gray.100`,
        },
      },
    },
  },
}

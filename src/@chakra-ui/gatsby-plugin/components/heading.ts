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

import { headingBaseStyles } from "../custom/typography"

export const Heading = {
  defaultProps: {},
  baseStyle: {
    fontFamily: `heading`,
    fontWeight: `bold`,
    color: `heading`,
  },
  sizes: {
    "4xl": {
      fontSize: `4xl`,
      lineHeight: `4xl`,
    },
    "3xl": {
      fontSize: `3xl`,
      lineHeight: `3xl`,
    },
    "2xl": {
      fontSize: `2xl`,
      lineHeight: `2xl`,
    },
    xl: {
      fontSize: `xl`,
      lineHeight: `xl`,
    },
    lg: {
      fontSize: `lg`,
      lineHeight: `lg`,
    },
    md: {
      fontSize: `md`,
      lineHeight: `md`,
    },
    sm: {
      fontSize: `sm`,
      lineHeight: `sm`,
    },
  },
  variants: {
    h1: {
      ...headingBaseStyles.h1,
    },
    h2: {
      ...headingBaseStyles.h2,
    },
    h3: {
      ...headingBaseStyles.h3,
    },
    h4: {
      ...headingBaseStyles.h4,
    },
    gardenItem: {
      fontSize: [`md`, null, null, `1.125rem`, `1.3125rem`],
      fontFamily: `body`,
      fontWeight: `medium`,
    },
  },
}

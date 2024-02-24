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

const baseStyles = {
  fontSize: [`xs`, null, null, `sm`],
  fontWeight: `medium`,
  letterSpacing: `widest`,
}

const Badge = {
  defaultProps: {
    variant: `default`,
  },
  variants: {
    default: {
      ...baseStyles,
      bg: `bg`,
    },
    light: (props) => ({
      ...baseStyles,
      bg: `bg`,
      color: mode(`blueGray.500`, `blueGray.400`)(props),
      px: `1rem`,
      py: `4px`,
      borderRadius: `xl`,
    }),
    dark: (props) => ({
      ...baseStyles,
      bg: mode(`blueGray.50`, `blueGray.800`)(props),
      color: mode(`blueGray.600`, `blueGray.400`)(props),
      px: `1rem`,
      py: `4px`,
      borderRadius: `xl`,
    }),
  },
}

export default Badge

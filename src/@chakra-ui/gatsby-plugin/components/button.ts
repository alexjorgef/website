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

export const Button = {
  baseStyle: {
    fontWeight: `normal`,
  },
  defaultProps: {
    size: `brand`,
  },
  sizes: {
    brand: {
      h: 8,
      minW: 10,
      fontSize: `md`,
      px: 4,
    },
  },
  variants: {
    primary: {
      bg: `primary`,
      color: `white`,
      _hover: {
        bg: `primaryHover`,
        _disabled: {
          bg: `primary`,
        },
      },
      _active: { bg: `primaryHover` },
    },
    outline: (props) => ({
      color: mode(`text`, `white`)(props),
      bg: `transparent`,
      borderStyle: `solid`,
      borderColor: `primary`,
      borderWidth: `1px`,
      _hover: {
        color: `white`,
        bg: `primary`,
      },
    }),
  },
}

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
import { textStyles as foundationTextStyles } from "../foundations/typography"

const Text = {
  variants: {
    heading: (props) => ({
      color: mode(`black`, `white`)(props),
    }),
    prominent: (props) => ({
      ...foundationTextStyles.prominent,
      strong: {
        ...foundationTextStyles.prominent.strong,
        color: mode(`blueGray.900`, `blueGray.100`)(props),
      },
      a: {
        ...foundationTextStyles.prominent.a,
        color: mode(`blueGray.900`, `blueGray.100`)(props),
      },
    }),
    lightContainer: (props) => ({
      color: mode(`blueGray.700`, `blueGray.200`)(props),
    }),
  },
}

export default Text

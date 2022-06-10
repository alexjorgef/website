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
import sizes from "./foundations/sizes"

const styles = {
  global: (props) => ({
    html: {
      scrollPaddingTop: `calc(${sizes.navigationHeight} + 1rem)`,
    },
    body: {
      bg: `bg`,
      color: `text`,
      scrollbarWidth: `thin`,
      scrollbarColor: mode(`blueGray.400 blueGray.200`, `blueGray.400 blueGray.700`)(props),
      "::-webkit-scrollbar": {
        width: `14px`,
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: mode(`blueGray.200`, `blueGray.700`)(props),
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: mode(`blueGray.400`, `blueGray.400`)(props),
        borderRadius: `8px`,
        borderWidth: `3px`,
        borderStyle: `solid`,
        borderColor: mode(`blueGray.200`, `blueGray.700`)(props),
      },
    },
    "[data-skip-to-content]": {
      clip: `rect(0 0 0 0)`,
      "&:focus": {
        clip: `auto`,
      },
    }
  }),
}

export default styles

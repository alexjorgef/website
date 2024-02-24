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

const Container = {
  baseStyle: {
    w: `100%`,
    mx: `auto`,
    maxW: `1024px`,
    px: [`1rem`, `1.5rem`],
  },
  defaultProps: {
    size: `lg`,
  },
  variants: {
    proseRoot: {
      pt: 16,
      pb: [20, null, null, 24],
    },
  },
}

export default Container

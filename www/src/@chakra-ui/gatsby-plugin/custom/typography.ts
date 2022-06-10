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

const headingBaseStyles = {
  h1: {
    fontWeight: 700,
    fontSize: [`2xl`, `3xl`, null, `4xl`, `5xl`],
    letterSpacing: `wide`,
    fontFamily: `heading`,
    lineHeight: `4xl`,
    marginTop: 0,
    marginBottom: 4,
  },
  h2: {
    fontWeight: 700,
    fontSize: [`xl`, `2xl`, null, `3xl`, `4xl`],
    fontFamily: `heading`,
    lineHeight: `3xl`,
    marginBottom: 6,
  },
  h3: {
    fontWeight: 600,
    fontSize: [`lg`, `xl`, null, `2xl`, `3xl`],
    fontFamily: `heading`,
    lineHeight: `2xl`,
    marginBottom: 3,
  },
  h4: {
    fontWeight: 600,
    fontSize: [`lg`, null, null, `xl`, `2xl`],
    fontFamily: `heading`,
    lineHeight: `xl`,
    marginBottom: 2,
  },
}

export { headingBaseStyles }

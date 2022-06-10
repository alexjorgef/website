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

import { slugify, capitalize, shuffle } from "../index"

describe(`utils`, () => {
  describe(`slugify`, () => {
    it(`returns with slash if no title, slug, and prefix is given`, () => {
      expect(slugify({})).toBe(`/`)
    })
    it(`returns with prefix is no title & slug is given`, () => {
      expect(slugify({}, `category`)).toBe(`/category`)
    })
    it(`slug can override slugified title`, () => {
      expect(slugify({ slug: `custom-slug` })).toBe(`/custom-slug`)
    })
    it(`title gets slugified`, () => {
      expect(slugify({ title: `My Custom Title` })).toBe(`/my-custom-title`)
    })
    it(`prefix and double slashes no problem`, () => {
      expect(slugify({ slug: `/custom-slug` }, `/prefix`)).toBe(`/prefix/custom-slug`)
    })
  })
  describe(`shuffle`, () => {
    it(`seed makes it consistent`, () => {
      expect(shuffle([`one`, `two`, `three`], 1)).toStrictEqual([`three`, `one`])
    })
    it(`count option`, () => {
      expect(shuffle([`one`, `two`, `three`, `four`, `five`], 1, 3)).toStrictEqual([`four`, `five`, `three`])
    })
  })
  it(`capitalize`, () => {
    expect(capitalize(`small`)).toBe(`Small`)
    expect(capitalize(`sMall`)).toBe(`SMall`)
  })
})

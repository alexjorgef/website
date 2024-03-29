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

import { breadcrumbList, article } from "../json-ld"

const category = {
  name: `Series`,
  slug: `/series`,
}

const post = {
  title: `The Expanse`,
  description: `Sci-Fi`,
  slug: `/the-expanse`,
  date: `2021-07-17`,
  lastUpdated: `2021-07-17`,
  year: `2021`,
  image: `/path-to-image.png`,
}

describe(`json-ld`, () => {
  it(`breadcrumbList`, () => {
    expect(
      breadcrumbList([
        { name: `James`, url: `/james` },
        { name: `Naomi`, url: `/naomi` },
      ])
    ).toMatchSnapshot()
  })
  describe(`article`, () => {
    it(`basic output`, () => {
      const result = article({ category, post, isGarden: true })
      expect(result[`@graph`][2]).toMatchSnapshot()
    })
    it(`isGarden: true`, () => {
      const result = article({ category, post, isGarden: true })
      expect(result[`@graph`]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "@type": `Article`,
            articleSection: `Digital Garden`,
          }),
        ])
      )
    })
    it(`isGarden: false`, () => {
      const result = article({ category, post, isGarden: false })
      expect(result[`@graph`]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "@type": `Article`,
            articleSection: `Writing`,
          }),
        ])
      )
    })
  })
})

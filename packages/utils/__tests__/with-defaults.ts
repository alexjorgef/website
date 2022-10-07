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

import { withDefaults, defaults } from "../with-defaults"

describe(`withDefaults`, () => {
  it(`returns default values without any parameters`, () => {
    expect(withDefaults({ plugins: [] })).toStrictEqual(defaults)
  })
  it(`returns mix of defaults and custom value with parameters`, () => {
    expect(withDefaults({ plugins: [], writingSource: `expanse` })).toStrictEqual({
      writingSource: `expanse`,
      gardenSource: defaults.gardenSource,
      dataSource: defaults.dataSource,
      awesomeSource: defaults.awesomeSource,
      portfolioSource: defaults.portfolioSource,
      locales: defaults.locales,
      localeInitial: defaults.localeInitial,
    })
  })
})

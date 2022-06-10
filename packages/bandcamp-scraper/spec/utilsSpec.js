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

/* eslint-env jasmine */

const utils = require('./../lib/utils.js')

describe('utils', function () {
  describe('generateSearchUrl', function () {
    it('throws an Error without params', function () {
      expect(function () {
        utils.generateSearchUrl()
      }).toThrowError(Error, 'Expect params to be an object.')
    })

    it('throws an Error without param.query', function () {
      expect(function () {
        utils.generateSearchUrl({})
      }).toThrowError(Error, 'Expect params to have string property named query.')
    })

    it('throws an Error with invalid param.query', function () {
      expect(function () {
        utils.generateSearchUrl({ query: null })
      }).toThrowError(Error, 'Expect params to have string property named query.')
    })

    it('does not throw an Error without param.page', function () {
      expect(function () {
        utils.generateSearchUrl({ query: 'mac demarco' })
      }).not.toThrowError()
    })

    it('throws an Error with invalid param.page', function () {
      expect(function () {
        utils.generateSearchUrl({ query: 'mac demarco', page: null })
      }).toThrowError(Error, 'Expect params named page to be type number.')
    })

    it('generate url without params.page', function () {
      expect(utils.generateSearchUrl({ query: 'mac demarco' }))
        .toEqual('https://bandcamp.com/search?q=mac%20demarco&page=1')
    })

    it('generates url with all params', function () {
      expect(utils.generateSearchUrl({ query: 'mac demarco', page: 1 }))
        .toEqual('https://bandcamp.com/search?q=mac%20demarco&page=1')
    })
  })
})

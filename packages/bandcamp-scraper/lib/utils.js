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

function createQueryString (params) {
  return Object.keys(params).map(function (name) {
    return name + '=' + encodeURIComponent(params[name])
  }).join('&')
}

exports.generateSearchUrl = function (params) {
  if (!params || typeof params !== 'object') {
    throw new Error('Expect params to be an object.')
  }
  // required
  if (!Object.prototype.hasOwnProperty.call(params, 'query') || typeof params.query !== 'string') {
    throw new Error('Expect params to have string property named query.')
  }
  // optional
  if (Object.prototype.hasOwnProperty.call(params, 'page') && typeof params.page !== 'number') {
    throw new Error('Expect params named page to be type number.')
  }
  params = {
    q: params.query,
    page: params.page || 1
  }
  return 'https://bandcamp.com/search?' + createQueryString(params)
}

exports.generateTagUrl = function (params) {
  if (!params || typeof params !== 'object') {
    throw new Error('Expect params to be an object.')
  }
  // required
  if (!Object.prototype.hasOwnProperty.call(params, 'tag') || typeof params.tag !== 'string') {
    throw new Error('Expect params to have string property named tag.')
  }
  // optional
  if (Object.prototype.hasOwnProperty.call(params, 'page') && typeof params.page !== 'number') {
    throw new Error('Expect params named page to be type number.')
  }
  const tag = params.tag
  params = {
    page: params.page || 1
  }
  return 'https://bandcamp.com/tag/' + encodeURIComponent(tag) + '?' + createQueryString(params)
}

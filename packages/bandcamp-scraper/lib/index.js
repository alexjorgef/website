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

const req = require('tinyreq')
const urlHelper = require('url')
const htmlParser = require('./htmlParser.js')
const utils = require('./utils.js')

exports.search = function (params, cb) {
  const url = utils.generateSearchUrl(params)
  req(url, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const searchResults = htmlParser.parseSearchResults(html)
      cb(null, searchResults)
    }
  })
}

exports.getProfileFollows = function (username, cb) {
  profileUrl = new urlHelper.URL(`/${username}`, "https://bandcamp.com").toString()
  req(profileUrl, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const followsUrls = htmlParser.parseFollowsUrls(html, profileUrl)
      cb(null, followsUrls)
    }
  })
}

exports.getAlbumsWithTag = function (params, cb) {
  const url = utils.generateTagUrl(params)
  req(url, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const tagResults = htmlParser.parseTagResults(html)
      cb(null, tagResults)
    }
  })
}

exports.getAlbumUrls = function (artistUrl, cb) {
  artistUrl = new urlHelper.URL('/music', artistUrl).toString()
  req(artistUrl, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const albumUrls = htmlParser.parseAlbumUrls(html, artistUrl)
      cb(null, albumUrls)
    }
  })
}

exports.getAlbumInfo = function (albumUrl, cb) {
  req(albumUrl, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const albumInfo = htmlParser.parseAlbumInfo(html, albumUrl)
      cb(null, albumInfo)
    }
  })
}

exports.getAlbumProducts = function (albumUrl, cb) {
  req(albumUrl, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const products = htmlParser.parseAlbumProducts(html, albumUrl)
      cb(null, products)
    }
  })
}

exports.getArtistUrls = function (labelUrl, cb) {
  labelUrl = new urlHelper.URL('/artists', labelUrl).toString()
  req(labelUrl, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const artistUrls = htmlParser.parseArtistUrls(html, labelUrl)
      cb(null, artistUrls)
    }
  })
}

exports.getArtistInfo = function (artistUrl, cb) {
  req(artistUrl, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const artistInfo = htmlParser.parseArtistInfo(html, artistUrl)
      cb(null, artistInfo)
    }
  })
}

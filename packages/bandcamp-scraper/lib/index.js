const req = require(`tinyreq`)
const urlHelper = require(`url`)
const htmlParser = require(`./htmlParser.js`)
const utils = require(`./utils.js`)

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
  const profileUrl = new urlHelper.URL(`/${username}`, `https://bandcamp.com`).toString()
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
  const artistUrlParsed = new urlHelper.URL(`/music`, artistUrl).toString()
  req(artistUrlParsed, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const albumUrls = htmlParser.parseAlbumUrls(html, artistUrlParsed)
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
  const labelUrlParsed = new urlHelper.URL(`/artists`, labelUrl).toString()
  req(labelUrlParsed, function (error, html) {
    if (error) {
      cb(error, null)
    } else {
      const artistUrls = htmlParser.parseArtistUrls(html, labelUrlParsed)
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

const bandcamp = require('../lib/index')

const username = 'alexjorgef'
bandcamp.getProfileFollows(username, function (error, followsUrls) {
  if (error) {
    console.log(error)
  } else {
    console.log(followsUrls)
  }
})

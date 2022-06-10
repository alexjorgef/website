const bandcamp = require(`bandcamp-scraper`)
const util = require(`util`)

const BANDCAMP_NODE_TYPE = `Bandcamp`

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }, configOptions) => {
  const { createNode } = actions

  const getProfileFollows = util.promisify(bandcamp.getProfileFollows)
  const follows = await getProfileFollows(configOptions.username)

  follows.profileFollows.forEach((follow) => {
    createNode({
      ...follow,
      id: createNodeId(`${BANDCAMP_NODE_TYPE}-${follow.title}`),
      parent: null,
      children: [],
      internal: {
        type: BANDCAMP_NODE_TYPE,
        content: JSON.stringify(follow),
        contentDigest: createContentDigest(follow),
      },
    })
  })
}

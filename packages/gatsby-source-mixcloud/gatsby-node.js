const Mixjar = require(`mixjar`)

const MIXCLOUD_NODE_TYPE = `Mixcloud`

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }, configOptions) => {
  const { createNode } = actions

  const mixcloud = new Mixjar.Mixcloud()

  const cloudcasts = await mixcloud.user_cloudcasts(configOptions.username).asPromise()
  cloudcasts.data.forEach((cloudcast) => {
    createNode({
      ...cloudcast,
      id: createNodeId(`${MIXCLOUD_NODE_TYPE}-${cloudcast.slug}`),
      parent: null,
      children: [],
      internal: {
        type: MIXCLOUD_NODE_TYPE,
        content: JSON.stringify(cloudcast),
        contentDigest: createContentDigest(cloudcast),
      },
    })
  })
}

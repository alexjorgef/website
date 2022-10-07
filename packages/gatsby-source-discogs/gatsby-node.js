const Discogs = require(`disconnect`).Client
const util = require(`util`)

const NODE_TYPE_BASE = `Discogs`
const NODE_TYPE_USER_LISTS = `${NODE_TYPE_BASE}UserLists`

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }, configOptions) => {
  const { createNode } = actions
  let auth = {}
  if (configOptions.token !== undefined) {
    auth = { userToken: configOptions.token }
  }
  const user = new Discogs(auth).user()
  const userLists = util.promisify(user.getLists)
  const userListsRes = await userLists(configOptions.username)
  await Promise.all(
    userListsRes.lists.map(async (userList) => {
      const list = util.promisify(user.list().getItems)
      const listRes = await list(userList.id)
      await createNode({
        ...listRes,
        id: createNodeId(`${NODE_TYPE_USER_LISTS}-${listRes.id.toString()}`),
        parent: null,
        children: [],
        internal: {
          type: NODE_TYPE_USER_LISTS,
          content: JSON.stringify(listRes),
          contentDigest: createContentDigest(listRes),
        },
      })
    })
  )
}

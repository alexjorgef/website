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

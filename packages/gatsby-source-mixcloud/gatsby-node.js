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

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

import smartypants from "retext-smartypants"

const retext = require(`retext`)
const visit = require(`unist-util-visit`)

const remarkSmartypants = (options) => {
  const processor = retext().use(smartypants, options)
  return (tree) => {
    visit(tree, `text`, (node) => {
      node.value = String(processor.processSync(node.value))
    })
  }
}

module.exports = remarkSmartypants

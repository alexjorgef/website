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

import * as React from "react"
import { HelmetProvider } from "react-helmet-async"

HelmetProvider.canUseDOM = false

const ReactHelmetAsyncContextSerializer: jest.SnapshotSerializerPlugin = {
  test(value: any) {
    return Boolean(
      // Does the value exist?
      value &&
        value.base &&
        value.base.toComponent &&
        value.bodyAttributes &&
        value.bodyAttributes.toComponent &&
        value.htmlAttributes &&
        value.htmlAttributes.toComponent &&
        value.link &&
        value.link.toComponent &&
        value.meta &&
        value.meta.toComponent &&
        value.noscript &&
        value.noscript.toComponent &&
        value.script &&
        value.script.toComponent &&
        value.style &&
        value.style.toComponent &&
        value.title &&
        value.title.toComponent
    )
  },

  print(value: any, serialize) {
    // Recreate head from Helmet data
    const head = serialize(
      // eslint-disable-next-line jsx-a11y/html-has-lang
      <html {...value.htmlAttributes.toComponent()}>
        <head>
          {value.base.toComponent()}
          {value.link.toComponent()}
          {value.meta.toComponent()}
          {value.noscript.toComponent()}
          {value.script.toComponent()}
          {value.style.toComponent()}
          {value.title.toComponent()}
        </head>
        <body {...value.bodyAttributes.toComponent()} />
      </html>
    )

    // Return recreated head
    return head
  },
}

export default ReactHelmetAsyncContextSerializer

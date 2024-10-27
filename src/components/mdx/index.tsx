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
import type { Components } from "@mdx-js/react/lib/index"
import { headings } from "./heading"
import { Code } from "./code"
import { Alert } from "./alert"
import { Collapsible } from "./collapsible"
import { preToCodeBlock } from "../../utils/code"
import { MarkdownLink } from "./link"

// @ts-ignore
export const components: Components = {
  pre: (preProps) => {
    // @ts-ignore
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />
  },
  // @ts-ignore
  a: (props) => <MarkdownLink {...props} />,
  Alert,
  Collapsible,
  wrapper: ({ children }) => children,
  ...headings,
}

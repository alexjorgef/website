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
import { chakra } from "@chakra-ui/react"

const defaultId = `skip-to-content`

const SkipNavLink: React.FC<React.PropsWithChildren<{ contentId?: string }>> = ({
  children = `Skip to content`,
  contentId,
  ...props
}) => {
  const id = contentId || defaultId

  return (
    <chakra.a
      {...props}
      border={0}
      height="1px"
      width="1px"
      margin="-1px"
      padding={0}
      overflow="hidden"
      position="absolute"
      _focus={{
        padding: `1rem`,
        position: `fixed`,
        top: `10px`,
        left: `10px`,
        background: `bg`,
        zIndex: `skipLink`,
        width: `auto`,
        height: `auto`,
      }}
      href={`#${id}`}
      data-skip-to-content
    >
      {children}
    </chakra.a>
  )
}

/**
 * Wrap the main content of a page with this, thus also the <main> tag
 */
const SkipNavContent: React.FC<React.PropsWithChildren<{ id?: string }>> = ({ children, id: idProp, ...props }) => {
  const id = idProp || defaultId

  return (
    <main {...props} id={id}>
      {children}
    </main>
  )
}

export { SkipNavLink, SkipNavContent }

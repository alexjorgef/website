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
import { navigate } from "gatsby"
import { WindowLocation } from "@reach/router"
import { ITagState } from "../components/blocks/tag-group"

export interface IIsomorphism<State, QueryString> {
  from: (v: QueryString) => State
  to: (t: State) => QueryString
}

export function useQueryString<State extends ITagState>(opts: {
  initialState: State
  iso: IIsomorphism<State, string>
  location: WindowLocation
}): [State, (v: State) => void] {
  const { initialState, iso, location } = opts

  const [desiredState, setDesiredState] = React.useState(() => {
    if (location.search.length === 0) {
      return initialState
    }

    const parsed = iso.from(location.search.slice(1))

    if (parsed) {
      return parsed
    }

    return initialState
  })

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (desiredState.tags && desiredState.tags.length === 0) {
        navigate(`${location.pathname}`, { replace: true })
      } else {
        navigate(`${location.pathname}?${iso.to(desiredState)}`, { replace: true })
      }
    }, 10)

    return () => clearTimeout(handler)
  }, [desiredState, iso, location.pathname])

  return [desiredState, setDesiredState]
}

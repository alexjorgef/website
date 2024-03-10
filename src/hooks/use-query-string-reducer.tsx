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
import { WindowLocation } from "@reach/router"
import { useQueryString, IIsomorphism } from "./use-query-string"
import { ITagState } from "../components/blocks/tag-group"

export function useQueryStringReducer<State extends ITagState, Action>(opts: {
  reducer: React.Reducer<State, Action>
  initialState: State
  iso: IIsomorphism<State, string>
  location: WindowLocation
}): [State, React.Dispatch<Action>] {
  const { reducer, initialState, iso, location } = opts

  const [state, setState] = useQueryString<State>({
    initialState,
    iso,
    location,
  })

  const dispatch = React.useCallback((action: Action) => setState(reducer(state, action)), [reducer, state, setState])

  return [state, dispatch]
}

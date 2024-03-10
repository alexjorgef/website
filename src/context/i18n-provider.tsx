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

import React, { useContext, useState, useMemo } from "react"

const defaultState = {
  data: `en`,
}
const I8nContext = React.createContext(defaultState)

export const I8nProvider = ({ children }) => {
  const [data, setData] = useState(defaultState)
  const updateState = (_data) => setData(_data)

  const contextValues = useMemo(() => ({ data, updateState }), [data])

  return <I8nContext.Provider value={contextValues}>{children}</I8nContext.Provider>
}

export const useI18nContext = () => {
  const context = useContext(I8nContext)
  if (context === undefined || context === null) {
    throw new Error(`useI18nContext must be called within I8nProvider`)
  }
  return context
}

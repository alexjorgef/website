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
import type { GatsbyBrowser } from "gatsby"
import { I8nProvider } from "./src/context/i18n-provider"

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => <I8nProvider>{element}</I8nProvider>

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  if (process.env.NODE_ENV === `production` && typeof window.panelbear !== `undefined`) {
    window.panelbear(`track`, document.location.pathname)
  }
}

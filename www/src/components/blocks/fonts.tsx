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
import { Global } from "@emotion/react"
// @ts-ignore
import interVariableWoff2 from "../../assets/fonts/Inter-roman.var.woff2"
// @ts-ignore
import crimsonProVariableWoff2 from "../../assets/fonts/Crimson-Pro.var.woff2"

export const Fonts = () => (
  <Global
    styles={`
    /* Inter UI */

    @font-face {
      font-family: 'Inter';
      font-weight: 400 700;
      font-display: swap;
      font-style: normal;
      font-named-instance: 'Regular';
      src: url(${interVariableWoff2}) format("woff2");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* Crimson Pro */

    @font-face {
      font-family: 'Crimson Pro';
      font-style: normal;
      font-weight: 600 800;
      font-display: swap;
      src: url(${crimsonProVariableWoff2}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  `}
  />
)

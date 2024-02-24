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
import type { GatsbySSR } from "gatsby"
import { getSandpackCssText } from "@codesandbox/sandpack-react"
import { site } from "./src/constants/meta.mjs"
import { ThemeProvider } from "./src/styles/theme-provider"

// @ts-ignore
import interVariableWoff2 from "./src/assets/fonts/Inter-roman.var.woff2"
// @ts-ignore
import crimsonProVariableWoff2 from "./src/assets/fonts/Crimson-Pro.var.woff2"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en-US` })

  setHeadComponents([
    <link rel="preload" href="/icons.svg" as="image" type="image/svg+xml" key="svgIcons" />,
    <link
      rel="preload"
      href={interVariableWoff2}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="interFont"
    />,
    <link
      rel="preload"
      href={crimsonProVariableWoff2}
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="crimsonFont"
    />,
    <style
      id="sandpack"
      key="sandpack-css"
      dangerouslySetInnerHTML={{
        __html: getSandpackCssText(),
      }}
    />,
  ])

  if (process.env.NODE_ENV === `production`) {
    const scriptProps = {
      "data-domain": site.dataDomain,
      src: `/js/script.js`,
    }

    setHeadComponents([
      <script key="test-a">a</script>,
    ])
  }
}

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => <ThemeProvider>{element}</ThemeProvider>

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
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"
import { SkipNavLink } from "../a11y/skip-nav"
import { SEO } from "../seo"
import { Fonts } from "./fonts"
import { Footer } from "./footer"
import { Header } from "./header"

export const LocaleContext = React.createContext(``)

export const Layout: React.FC<React.PropsWithChildren<{ subnavigation?: React.ReactNode }>> = ({
  children,
  subnavigation = undefined,
}) => (
  <>
    <Fonts />
    <SkipNavLink />
    <SEO />
    <Header subnavigation={subnavigation} />
    <Alert status="error" className="only-no-js" display="none">
      <AlertIcon />
      <AlertTitle>Your browser does not support JavaScript, make sure you have enabled it!</AlertTitle>
      <AlertDescription>Your experience may be degraded and some functionalities may not work.</AlertDescription>
    </Alert>
    {children}
    <Footer />
  </>
)

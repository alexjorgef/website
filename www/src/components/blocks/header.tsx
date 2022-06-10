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
import { Flex } from "@chakra-ui/react"
import { useLocation } from "@reach/router"
import { useDistinctCategories } from "../../hooks/use-distinct-categories"
import { Link } from "../link"
import { Navigation } from "./navigation"
import { FullWidthContainer } from "./full-width-container"
import { Spacer } from "./spacer"
import { SVGIcon } from "./svg-icon"

const Logo: React.FC = () => (
  <Link to="/" transform="scale(1)" _hover={{ transform: `scale(1.15)` }} aria-label="alexjorgef.com, Back to homepage">
    <SVGIcon id="logo" width="35" height="35" viewBox="0 0 150 150" aria-hidden="true" focusable="false" />
  </Link>
)

type HeaderProps = {
  subnavigation?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ subnavigation = undefined }) => {
  const categorySlugs = useDistinctCategories()
  const location = useLocation()
  const isCategoryPage = categorySlugs.includes(location.pathname)
  const variant = subnavigation ? `navigationWithSub` : `navigation`
  const height = subnavigation ? `navigationWithSubHeight` : `navigationHeight`

  return (
    <>
      <FullWidthContainer variant={isCategoryPage ? `fullBleed` : variant} height={height}>
        <Flex as="header" alignItems="center" justifyContent="space-between" py="13px">
          <Logo />
          <Navigation />
        </Flex>
        {subnavigation}
      </FullWidthContainer>
      {!isCategoryPage && <Spacer size={height} axis="vertical" />}
    </>
  )
}

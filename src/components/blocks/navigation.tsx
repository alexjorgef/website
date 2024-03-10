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
import { HStack } from "@chakra-ui/react"
import { usePrimaryNavigation } from "../../hooks/use-primary-navigation"
import { Link } from "../link"

/**
 * Navigation component containing the primary links + Darkmode toggle
 */
export const Navigation: React.FC = () => {
  const primaryNavigation = usePrimaryNavigation()
  return (
    <HStack spacing={[`2`, `4`]}>
      <nav aria-label="Primary navigation">
        <HStack as="ul" listStyleType="none" spacing={[`2`, `4`]}>
          {primaryNavigation.map((item) => (
            <li key={item.link}>
              <Link to={item.link} fontSize={[`md`, null, null, `lg`]} p="2" activeClassName="active">
                {item.name}
              </Link>
            </li>
          ))}
        </HStack>
      </nav>
    </HStack>
  )
}

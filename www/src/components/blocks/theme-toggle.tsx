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
import { IconButton, useColorMode } from "@chakra-ui/react"
import { FaMoon as MoonIcon } from "react-icons/fa"
import { MdWbSunny as SunIcon } from "react-icons/md"

export const Toggle: React.FC<React.PropsWithChildren<any>> = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isLight = colorMode === `light`
  return (
    <IconButton
      {...props}
      aria-label={isLight ? `Activate Dark Mode` : `Activate Light Mode`}
      _hover={{ color: `white`, borderColor: `white` }}
      variant="outline"
      color={`whiteAlpha.600`}
      borderColor={`whiteAlpha.600`}
      icon={isLight ? <MoonIcon /> : <SunIcon fontSize="1.25rem" />}
      onClick={toggleColorMode}
      borderRadius="md"
    />
  )
}

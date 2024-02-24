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
import { Box, BoxProps, usePrefersReducedMotion } from "@chakra-ui/react"
import { transforms } from "../../constants/motion"

export const MotionBox: React.FC<React.PropsWithChildren<BoxProps>> = ({ children, ...rest }) => {
  const shouldReduceMotion = usePrefersReducedMotion()

  return (
    <Box
      transition={transforms.beforeHover.transition}
      transform={transforms.beforeHover.transform}
      _hover={
        shouldReduceMotion ? {} : { transform: transforms.onHover.transform, boxShadow: transforms.onHover.boxShadow }
      }
      {...rest}
    >
      {children}
    </Box>
  )
}

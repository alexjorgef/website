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
import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps } from "@chakra-ui/react"

interface IHeadingProps extends ChakraHeadingProps {
  as: "h1" | "h2" | "h3" | "h4"
}

/**
 * Heading component accepting heading levels
 * Wraps the Heading component from Chakra
 */
export const Heading: React.FC<React.PropsWithChildren<IHeadingProps>> = ({ as, children, ...rest }) => (
  <ChakraHeading as={as} variant={as} {...rest}>
    {children}
  </ChakraHeading>
)

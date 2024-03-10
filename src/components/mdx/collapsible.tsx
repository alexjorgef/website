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
import { Box, useColorModeValue } from "@chakra-ui/react"

export const Collapsible: React.FC<React.PropsWithChildren<{ summary: React.ReactNode }>> = ({ summary, children }) => {
  const bgColor = useColorModeValue(`blue.50`, `blueGray.800`)

  return (
    <Box as="details" bgColor={bgColor} px={[4, null, 6]} py={4} borderRadius="lg">
      <Box
        as="summary"
        display="list-item"
        textStyle="prominent"
        cursor="pointer"
        sx={{ ">:first-of-type": { display: `inline` } }}
      >
        {summary}
      </Box>
      {children}
    </Box>
  )
}

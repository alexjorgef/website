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
import { Box, VisuallyHidden } from "@chakra-ui/react"

type HeadingProps = {
  id: string
  children: React.ReactNode
}

/* eslint-disable */
const heading =
  (Tag) =>
    ({ id, children }: HeadingProps) => {
      if (Tag === 'h2' && children === `Introduction`) {
        return (
          <VisuallyHidden>
            <Box as={Tag} id={id} sx={{ my: '0 !important' }}>{children}</Box>
          </VisuallyHidden>
        )
      }

      return (
        <Box as={Tag} id={id} position="relative" _hover={{ a: { visibility: `visible` } }}>
          <Box
            as="a"
            href={`#${id}`}
            aria-label={`${children} permalink`}
            display="inline-block"
            position="absolute"
            left={-10}
            fontFamily="body"
            transition="all 0.3s ease-in-out"
            visibility="hidden"
            sx={{
              textDecoration: `none !important`,
              opacity: 0.3,
            }}
            _hover={{
              opacity: 1,
            }}
          >
            #
          </Box>
          {children}
        </Box>
      )
    }
/* eslint-enable */

export const headings = {
  h1: heading(`h1`),
  h2: heading(`h2`),
  h3: heading(`h3`),
  h4: heading(`h4`),
  h5: heading(`h5`),
  h6: heading(`h6`),
}

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
import { useStyleConfig, Box, BoxProps } from "@chakra-ui/react"

interface IProseProps extends BoxProps {
  variant?: "default" | "sm" | "md" | "lg" | "xl"
}

/**
 * Implementation of https://github.com/tailwindlabs/tailwindcss-typography.
 * Use the variant to choose from the different options (default, sm, md, lg, xl)
 * "default" is [`sm`, `md`, `md`, `lg`, `xl`] as included CSS media queries
 */
export const Prose: React.FC<React.PropsWithChildren<IProseProps>> = ({ variant = `default`, children, ...rest }) => {
  const styles = useStyleConfig(`Prose`, { variant })

  return (
    <Box sx={styles} {...rest}>
      {children}
    </Box>
  )
}

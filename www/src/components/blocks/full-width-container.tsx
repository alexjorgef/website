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
import { useMultiStyleConfig, Box, Container, BoxProps } from "@chakra-ui/react"

interface IFullWidthContainerProps extends BoxProps {
  variant?: "default" | "hero" | "light" | "dark" | "navigation" | "navigationWithSub" | "fullBleed" | undefined
}

export const FullWidthContainer: React.FC<React.PropsWithChildren<IFullWidthContainerProps>> = ({
  variant = undefined,
  children,
  ...rest
}) => {
  const styles = useMultiStyleConfig(`FullWidthContainer`, { variant })

  return (
    <Box data-name="full-width-container-outer" sx={{ ...styles.outer }} {...rest}>
      <Container data-name="full-width-container-inner" sx={{ ...styles.inner }}>
        {children}
      </Container>
    </Box>
  )
}

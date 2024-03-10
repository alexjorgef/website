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
import { Alert as ChakraAlert, AlertTitle, AlertIcon, AlertStatus, Box } from "@chakra-ui/react"

export const Alert: React.FC<React.PropsWithChildren<{ title: string; status: AlertStatus }>> = ({
  title,
  status,
  children,
}) => (
  <ChakraAlert
    status={status}
    flexDirection="column"
    alignItems="flex-start"
    borderRadius="lg"
    my={[6, null, null, 12]}
    mx={[0, null, null, -4]}
    width="auto"
    data-status={status}
  >
    <Box display="flex" flexDirection="row" alignItems="center" mb={4}>
      <AlertIcon boxSize={[`20px`, null, `30px`]} />
      <AlertTitle>{title}</AlertTitle>
    </Box>
    {children}
  </ChakraAlert>
)

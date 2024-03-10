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
import { PageProps } from "gatsby"
import { Container } from "@chakra-ui/react"
import { Prose } from "../typography/prose"
import { Layout } from "./layout"
import { SkipNavContent } from "../a11y/skip-nav"

export const MDXLayout: React.FC<React.PropsWithChildren<PageProps>> = ({ children }) => (
  <Layout>
    <Container variant="proseRoot">
      <SkipNavContent>
        <Prose>{children}</Prose>
      </SkipNavContent>
    </Container>
  </Layout>
)

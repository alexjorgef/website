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
import { Container, Text } from "@chakra-ui/react"
import { Layout } from "../components/blocks/layout"
import { SEO } from "../components/seo"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { space } from "../constants/space"
import { Heading } from "../components/typography/heading"
import { Link } from "../components/link"

const NotFound: React.FC<PageProps> = () => {
  React.useEffect(() => {
    window.panelbear(`track`, document.location.pathname)
  }, [])

  return (
    <Layout>
      <SEO title="404 - Not Found" description="Sorry, there is nothing at this URL." />
      <SkipNavContent>
        <Container py={space.paddingSmall}>
          <Heading as="h1">Not Found</Heading>
          <Text textStyle="prominent">Sorry, there is nothing at this URL.</Text>
          <Link textStyle="prominent" textDecoration="underline" to="/">
            Go back home.
          </Link>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default NotFound

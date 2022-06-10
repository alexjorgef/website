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
import { graphql } from "gatsby"
import { Text } from "@chakra-ui/react"
import { MotionBox } from "../blocks/motion-box"
import { Link } from "../link"

type CardProps = {
  slug: string
  title: string
  subtitle?: string
  description: string
}

export const Card: React.FC<CardProps> = ({ slug, title, subtitle, description }) => (
  <MotionBox p={6} borderRadius="lg" boxShadow="lg" bg="cardBg" key={slug} _focusWithin={{ boxShadow: `outline` }}>
    <Link
      to={slug}
      _focus={{ boxShadow: `none`, h2: { color: `primary` } }}
      _hover={{ textDecoration: `none`, h2: { color: `primary` } }}
    >
      <Text as="h2" fontSize="1.3125rem" fontWeight="bold" color="cardHeadingColor" transition="color 0.3s ease-in-out">
        {title}
      </Text>
      {subtitle && (
        <Text as="h3" fontSize="1.125rem" fontWeight="medium" color="cardSubheading">
          {subtitle}
        </Text>
      )}
      <Text mt={6}>{description}</Text>
    </Link>
  </MotionBox>
)

export const query = graphql`
  fragment CardPostInformation on Post {
    title
    date
    slug
    subtitle
    description
    locale
    locales
  }
`

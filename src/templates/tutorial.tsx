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
import { PageProps, graphql } from "gatsby"
import { Divider, Text, Flex, Tag, TagLabel } from "@chakra-ui/react"
import { WritingViewDataProps, WritingView } from "../components/writing/writing-view"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"
import { Link } from "../components/link"
import { useI18nContext } from "../context/i18n-provider"
import { useLocales } from "../hooks/use-locales"

const tagColorSwitch = (name) => {
  switch (name) {
    case `JavaScript`:
      return `yellow`
    case `Environment`:
      return `green`
    case `Artificial Intelligence`:
      return `green`
    case `Mathematics`:
      return `green`
    default:
      return `gray`
  }
}

const TutorialTemplate: React.FC<PageProps<WritingViewDataProps>> = ({
  data: { post },
  location: { pathname },
  children: mdxContent,
}) => {
  const { updateState } = useI18nContext()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ data: event.target.text })
  }
  const [defaultLocale] = useLocales()
  return (
    <WritingView post={post} mdxContent={mdxContent as unknown as string} pathname={pathname} type="tutorial">
      <Heading as="h1">{post.title}</Heading>
      <Spacer size={6} axis="vertical" />
      <Divider />
      <Spacer size={4} axis="vertical" />
      <Flex justifyContent="space-between" flexDirection={[`column`, null, null, `row`]}>
        <Text mb={2}>
          Created {post.date} – Last Updated {post.lastUpdated}
        </Text>
        <Tag alignSelf="flex-start" mb={2} colorScheme={tagColorSwitch(post.category.name)}>
          <TagLabel>{post.category.name}</TagLabel>
        </Tag>
      </Flex>
      <Flex justifyContent="flex-start" flexDirection={[`column`, null, null, `row`]}>
        <Text
          color="textMuted"
          fontWeight={500}
          textAlign="center"
          fontSize={[`md`, null, null, `1.125rem`, `1.3125rem`]}
          casing="uppercase"
        >
          {post.locales.length > 0 && (
            <>
              <Text color="text" as="u" fontWeight={800}>
                {post.locale}
              </Text>
              {` `}/{` `}
              {post.locales.map((locale, index) => {
                const link = locale === defaultLocale ? `${post.slug}` : `/${locale}${post.slug}`
                return post.locales.length - 1 !== index ? (
                  <>
                    <Link to={`/${locale}${post.slug}`} onClick={handleChange}>
                      {locale}
                    </Link>
                    {` `}/{` `}
                  </>
                ) : (
                  <Link to={link} onClick={handleChange}>
                    {locale}
                  </Link>
                )
              })}
            </>
          )}
        </Text>
      </Flex>
      <Spacer size={10} axis="vertical" />
    </WritingView>
  )
}

export default TutorialTemplate

export const query = graphql`
  query ($id: String!) {
    post(id: { eq: $id }) {
      ...WritingView
      tableOfContents
    }
  }
`

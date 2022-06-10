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
import { Text } from "@chakra-ui/react"
import WritingView, {
  WritingViewDataProps,
} from "../components/writing/writing-view"
import { Heading } from "../components/typography/heading"
import { Spacer } from "../components/blocks/spacer"
import { Link } from "../components/link"
import { useI18nContext } from "../context/i18n-provider"
import { useLocales } from "../hooks/use-locales"

const ProseTemplate: React.FC<PageProps<WritingViewDataProps>> = ({
  data: { post },
  location: { pathname },
}) => {
  const { updateState, data: language } = useI18nContext()
  const [locales, defaultLocale] = useLocales()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ data: event.target.text })
  }
  return (
    <WritingView post={post} pathname={pathname} type="prose">
      <Text
        color="textEmphasized"
        fontWeight={500}
        textAlign="center"
        fontSize={[`md`, null, null, `1.125rem`, `1.3125rem`]}
      >
        {post.category.name}
      </Text>
      <Spacer size={6} axis="vertical" />
      <Heading as="h1" textAlign="center">
        {post.title}
      </Heading>
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
            </Text>{" "}
            /{" "}
            {post.locales.map((locale, index) => {
              console.log('defaultLocale', defaultLocale)
              console.log('locale', locale)

              const link = locale === defaultLocale ? `${post.slug}` : `/${locale}${post.slug}`
              return post.locales.length - 1 !== index ? (
                <>
                  <Link to={link} onClick={handleChange}>
                    {locale}
                  </Link>{" "}
                  /{" "}
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
      <Spacer size={[16, null, null, 20]} axis="vertical" />
    </WritingView>
  )
}

export default ProseTemplate

export const query = graphql`
  query ProseTemplate($id: String!) {
    post(id: { eq: $id }) {
      ...WritingView
    }
  }
`

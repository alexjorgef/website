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

import { graphql, useStaticQuery } from "gatsby"

type Props = {
  site: {
    siteMetadata: {
      siteTitle: string
      siteTitleDefault: string
      siteAuthorName: string
      siteAuthorSurname: string
      siteAuthorNickname: string
      siteAuthorLabel: string
      siteAuthorEmail: string
      siteAuthorAddress: string
      siteAuthorAddressCity: string
      siteAuthorAddressZip: string
      siteAuthorAddressProvince: string
      siteAuthorAddressCountry: string
      siteUrl: string
      siteDescription: string
      siteImage: string
      linkedin: string
      github: string
      gitlab: string
      instagram: string
      twitter: string
      stackoverflow: string
      telegram: string
      wakatime: string
    }
  }
}

export const useSiteMetadata = () => {
  const data = useStaticQuery<Props>(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleDefault
          siteAuthorName
          siteAuthorSurname
          siteAuthorNickname
          siteAuthorLabel
          siteAuthorEmail
          siteAuthorAddress
          siteAuthorAddressCity
          siteAuthorAddressZip
          siteAuthorAddressProvince
          siteAuthorAddressCountry
          siteUrl
          siteDescription
          siteImage
          linkedin
          github
          gitlab
          instagram
          twitter
          stackoverflow
          telegram
          wakatime
        }
      }
    }
  `)

  return data.site.siteMetadata
}

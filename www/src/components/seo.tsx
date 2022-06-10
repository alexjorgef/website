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
import { Helmet } from "react-helmet-async"
import { useLocation } from "@reach/router"
import { breadcrumbList, BreadcrumbListItem } from "../constants/json-ld"
import { useSiteMetadata } from "../hooks/use-site-metadata"

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  noIndex?: boolean
  breadcrumbListItems?: BreadcrumbListItem[]
}

/* istanbul ignore next */
const faviconSrc =
  process.env.NODE_ENV === `production`
    ? `/favicon.svg`
    : `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔥</text></svg>`

export const SEO: React.FC<React.PropsWithChildren<SEOProps>> = ({
  title,
  description,
  pathname,
  image,
  noIndex = false,
  breadcrumbListItems = [],
  children,
}) => {
  const { href } = useLocation()
  const { siteTitle, siteTitleDefault, siteUrl, siteDescription, siteImage, twitter } = useSiteMetadata()

  const seo = {
    title: title || siteTitleDefault,
    description: description || siteDescription,
    url: pathname ? `${siteUrl}${pathname}` : href,
    image: `${siteUrl}${image || siteImage}`,
  }

  return (
    <Helmet title={title} defaultTitle={siteTitleDefault} titleTemplate={`%s | ${siteTitle}`} key={seo.url}>
      <html lang="en-US" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:see_also" content="https://github.com/alexjorgef" />
      <meta property="og:see_also" content="https://www.behance.net/alexjorgef" />
      <meta property="og:see_also" content="https://dribbble.com/alexjorgef" />
      <meta property="og:see_also" content="https://youtube.com/AlexandreFerreiraJorge" />
      <meta property="og:see_also" content="https://twitter.com/alexandrejorgef" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="creator" content="Alexandre Ferreira" />
      <link rel="icon" type="image/svg+xml" href={faviconSrc} />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {breadcrumbListItems.length >= 1 && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbList(breadcrumbListItems))}</script>
      )}
      {children}
    </Helmet>
  )
}

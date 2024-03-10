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

import { site } from "./meta"

export const identity = {
  "@id": `${site.url}/#identity`,
  "@type": `Organization`,
  alternateName: `Alex Ferreira`,
  description: site.description,
  email: `hello@alexjorgef.com`,
  founder: `Alexandre Ferreira`,
  foundingDate: `2017-12-08`,
  image: {
    "@type": `ImageObject`,
    height: `1024`,
    url: `${site.url}/social/logo-1024w.png`,
    width: `1024`,
  },
  logo: {
    "@type": `ImageObject`,
    height: `60`,
    url: `${site.url}/social/logo-60w.png`,
    width: `60`,
  },
  name: site.titleDefault,
  sameAs: [
    `https://twitter.com/alexandrejorgef`,
    `https://www.youtube.com/c/AlexandreFerreiraJorge`,
    `https://github.com/alexjorgef`,
    `https://gitlab.com/alexjorgef`,
    `https://dribbble.com/alexjorgef`,
    `https://www.behance.net/alexjorgef`,
  ],
  url: site.url,
}

export const creator = {
  "@id": `${site.url}/#creator`,
  "@type": `Organization`,
  alternateName: `Alex Ferreira`,
  description: site.description,
  email: `hello@alexjorgef.com`,
  founder: `Alexandre Ferreira`,
  foundingDate: `2017-12-08`,
  image: {
    "@type": `ImageObject`,
    height: `1024`,
    url: `${site.url}/social/logo-1024w.png`,
    width: `1024`,
  },
  logo: {
    "@type": `ImageObject`,
    height: `60`,
    url: `${site.url}/social/logo-60w.png`,
    width: `60`,
  },
  name: site.titleDefault,
  url: site.url,
}

export type BreadcrumbListItem = {
  url: string
  name: string
}

export const breadcrumbList = (items: Array<BreadcrumbListItem>) => {
  const homeLevel = {
    "@type": `ListItem`,
    item: {
      "@id": site.url,
      name: `Homepage`,
    },
    position: 1,
  }
  const nestedLevels = items.map((item, index) => ({
    "@type": `ListItem`,
    item: {
      "@id": `${site.url}${item.url}`,
      name: item.name,
    },
    position: index + 2,
  }))
  return {
    "@context": `https://schema.org`,
    "@type": `BreadcrumbList`,
    description: `Breadcrumbs list`,
    itemListElement: [homeLevel, ...nestedLevels],
    name: `Breadcrumbs`,
  }
}

type ArticleProps = {
  category: {
    name: string
    slug: string
  }
  post: {
    title: string
    description: string
    slug: string
    date: string
    lastUpdated: string
    year: string
    image: string
  }
  isGarden: boolean
}

export const article = ({ category, post, isGarden }: ArticleProps) => ({
  "@context": `https://schema.org`,
  "@graph": [
    identity,
    creator,
    {
      "@type": `Article`,
      articleSection: isGarden ? `Digital Garden` : `Writing`,
      author: { "@id": `${site.url}/#identity` },
      copyrightHolder: { "@id": `${site.url}/#identity` },
      copyrightYear: post.year,
      creator: { "@id": `${site.url}/#creator` },
      dateModified: post.lastUpdated,
      datePublished: post.date,
      description: post.description,
      genre: category.name,
      headline: post.title,
      image: {
        "@type": `ImageObject`,
        url: `${site.url}${post.image}`,
      },
      inLanguage: `en-US`,
      mainEntityOfPage: `${site.url}${post.slug}`,
      name: post.title,
      publisher: { "@id": `${site.url}/#creator` },
      url: `${site.url}${post.slug}`,
    },
    breadcrumbList([
      { name: category.name, url: category.slug },
      { name: post.title, url: post.slug },
    ]),
  ],
})

export const homepage = {
  "@context": `https://schema.org`,
  "@graph": [
    identity,
    creator,
    {
      "@type": `WebPage`,
      author: { "@id": `${site.url}/#identity` },
      copyrightHolder: { "@id": `${site.url}/#identity` },
      copyrightYear: `2017`,
      creator: { "@id": `${site.url}/#creator` },
      datePublished: `2017-12-08T23:33:12-05:00`,
      description: site.description,
      headline: site.titleDefault,
      image: {
        "@type": `ImageObject`,
        url: `${site.url}${site.image}`,
      },
      inLanguage: `en-US`,
      mainEntityOfPage: site.url,
      name: site.titleDefault,
      publisher: { "@id": `${site.url}/#creator` },
      url: site.url,
    },
    breadcrumbList([]),
  ],
}

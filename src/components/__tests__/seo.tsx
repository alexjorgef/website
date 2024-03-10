/*
 * @jest-environment jsdom
 *
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
import * as Gatsby from "gatsby"
import { render } from "@testing-library/react"
import { vi } from "vitest"
import { SEO } from "../seo"

const useStaticQuery = vi.spyOn(Gatsby, `useStaticQuery`)
const mockUseStaticQuery = {
  site: {
    siteMetadata: {
      siteTitle: `Harry Potter`,
      siteTitleDefault: `Harry Potter - Wizard`,
      siteUrl: `https://www.dev.cool`,
      siteDescription: `Hogwarts is magical`,
      siteImage: `/social/harry-potter.png`,
      twitter: `@cool`,
    },
  },
}

describe(`SEO component`, () => {
  beforeAll(() => {
    useStaticQuery.mockImplementation(() => mockUseStaticQuery)
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it(`should have sensible defaults`, () => {
    const result = render(<SEO />, { container: document.head }).baseElement.parentElement?.firstChild

    expect(result).toMatchInlineSnapshot(
      `
      <html
        lang="en-US"
      >
        <head>
          <link
            data-rh={true}
            href="https://www.dev.cool"
            rel="canonical"
          />
          <link
            data-rh={true}
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔥</text></svg>"
            rel="icon"
            type="image/svg+xml"
          />
          <link
            data-rh={true}
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
          />
          <meta
            content="Hogwarts is magical"
            data-rh={true}
            name="description"
          />
          <meta
            content="https://www.dev.cool/social/harry-potter.png"
            data-rh={true}
            name="image"
          />
          <meta
            content="Harry Potter - Wizard"
            data-rh={true}
            property="og:title"
          />
          <meta
            content="https://www.dev.cool"
            data-rh={true}
            property="og:url"
          />
          <meta
            content="Hogwarts is magical"
            data-rh={true}
            property="og:description"
          />
          <meta
            content="https://www.dev.cool/social/harry-potter.png"
            data-rh={true}
            property="og:image"
          />
          <meta
            content="website"
            data-rh={true}
            property="og:type"
          />
          <meta
            content="https://github.com/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://www.behance.net/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://dribbble.com/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://youtube.com/AlexandreFerreiraJorge"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://twitter.com/alexandrejorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="summary_large_image"
            data-rh={true}
            name="twitter:card"
          />
          <meta
            content="Harry Potter - Wizard"
            data-rh={true}
            name="twitter:title"
          />
          <meta
            content="https://www.dev.cool"
            data-rh={true}
            name="twitter:url"
          />
          <meta
            content="Hogwarts is magical"
            data-rh={true}
            name="twitter:description"
          />
          <meta
            content="https://www.dev.cool/social/harry-potter.png"
            data-rh={true}
            name="twitter:image"
          />
          <meta
            content="@cool"
            data-rh={true}
            name="twitter:creator"
          />
          <meta
            content="Alexandre Ferreira"
            data-rh={true}
            name="creator"
          />
          <meta
            content="#0f172a"
            data-rh={true}
            name="msapplication-TileColor"
          />
          <title
            data-rh={true}
          >
            Harry Potter - Wizard
          </title>
        </head>
        <body />
      </html>
    `
    )
  })
  it(`should accept all common props`, () => {
    const result = render(
      <SEO
        title="Custom Title"
        image="/path/to/image.png"
        description="Custom Description"
        pathname="/custom-path"
        breadcrumbListItems={[{ name: `Hermione`, url: `/granger` }]}
      />,
      { container: document.head }
    ).baseElement.parentElement?.firstChild

    expect(result).toMatchInlineSnapshot(`
      <html
        lang="en-US"
      >
        <head>
          <link
            data-rh={true}
            href="https://www.dev.cool/custom-path"
            rel="canonical"
          />
          <link
            data-rh={true}
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔥</text></svg>"
            rel="icon"
            type="image/svg+xml"
          />
          <link
            data-rh={true}
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
          />
          <meta
            content="Custom Description"
            data-rh={true}
            name="description"
          />
          <meta
            content="https://www.dev.cool/path/to/image.png"
            data-rh={true}
            name="image"
          />
          <meta
            content="Custom Title"
            data-rh={true}
            property="og:title"
          />
          <meta
            content="https://www.dev.cool/custom-path"
            data-rh={true}
            property="og:url"
          />
          <meta
            content="Custom Description"
            data-rh={true}
            property="og:description"
          />
          <meta
            content="https://www.dev.cool/path/to/image.png"
            data-rh={true}
            property="og:image"
          />
          <meta
            content="website"
            data-rh={true}
            property="og:type"
          />
          <meta
            content="https://github.com/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://www.behance.net/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://dribbble.com/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://youtube.com/AlexandreFerreiraJorge"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://twitter.com/alexandrejorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="summary_large_image"
            data-rh={true}
            name="twitter:card"
          />
          <meta
            content="Custom Title"
            data-rh={true}
            name="twitter:title"
          />
          <meta
            content="https://www.dev.cool/custom-path"
            data-rh={true}
            name="twitter:url"
          />
          <meta
            content="Custom Description"
            data-rh={true}
            name="twitter:description"
          />
          <meta
            content="https://www.dev.cool/path/to/image.png"
            data-rh={true}
            name="twitter:image"
          />
          <meta
            content="@cool"
            data-rh={true}
            name="twitter:creator"
          />
          <meta
            content="Alexandre Ferreira"
            data-rh={true}
            name="creator"
          />
          <meta
            content="#0f172a"
            data-rh={true}
            name="msapplication-TileColor"
          />
          <script
            dangerouslySetInnerHTML={
              Object {
                "__html": "{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"BreadcrumbList\\",\\"description\\":\\"Breadcrumbs list\\",\\"itemListElement\\":[{\\"@type\\":\\"ListItem\\",\\"item\\":{\\"@id\\":\\"https://www.alexjorgef.com\\",\\"name\\":\\"Homepage\\"},\\"position\\":1},{\\"@type\\":\\"ListItem\\",\\"item\\":{\\"@id\\":\\"https://www.alexjorgef.com/granger\\",\\"name\\":\\"Hermione\\"},\\"position\\":2}],\\"name\\":\\"Breadcrumbs\\"}",
              }
            }
            data-rh={true}
            type="application/ld+json"
          />
          <title
            data-rh={true}
          >
            Custom Title | Harry Potter
          </title>
        </head>
        <body />
      </html>
    `)
  })
  it(`should hide with noIndex`, () => {
    const result = render(<SEO noIndex />, { container: document.head }).baseElement.parentElement?.firstChild

    expect(result).toMatchInlineSnapshot(`
      <html
        lang="en-US"
      >
        <head>
          <link
            data-rh={true}
            href="https://www.dev.cool"
            rel="canonical"
          />
          <link
            data-rh={true}
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔥</text></svg>"
            rel="icon"
            type="image/svg+xml"
          />
          <link
            data-rh={true}
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
          />
          <meta
            content="Hogwarts is magical"
            data-rh={true}
            name="description"
          />
          <meta
            content="https://www.dev.cool/social/harry-potter.png"
            data-rh={true}
            name="image"
          />
          <meta
            content="Harry Potter - Wizard"
            data-rh={true}
            property="og:title"
          />
          <meta
            content="https://www.dev.cool"
            data-rh={true}
            property="og:url"
          />
          <meta
            content="Hogwarts is magical"
            data-rh={true}
            property="og:description"
          />
          <meta
            content="https://www.dev.cool/social/harry-potter.png"
            data-rh={true}
            property="og:image"
          />
          <meta
            content="website"
            data-rh={true}
            property="og:type"
          />
          <meta
            content="https://github.com/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://www.behance.net/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://dribbble.com/alexjorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://youtube.com/AlexandreFerreiraJorge"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="https://twitter.com/alexandrejorgef"
            data-rh={true}
            property="og:see_also"
          />
          <meta
            content="summary_large_image"
            data-rh={true}
            name="twitter:card"
          />
          <meta
            content="Harry Potter - Wizard"
            data-rh={true}
            name="twitter:title"
          />
          <meta
            content="https://www.dev.cool"
            data-rh={true}
            name="twitter:url"
          />
          <meta
            content="Hogwarts is magical"
            data-rh={true}
            name="twitter:description"
          />
          <meta
            content="https://www.dev.cool/social/harry-potter.png"
            data-rh={true}
            name="twitter:image"
          />
          <meta
            content="@cool"
            data-rh={true}
            name="twitter:creator"
          />
          <meta
            content="Alexandre Ferreira"
            data-rh={true}
            name="creator"
          />
          <meta
            content="#0f172a"
            data-rh={true}
            name="msapplication-TileColor"
          />
          <meta
            content="noindex, nofollow"
            data-rh={true}
            name="robots"
          />
          <title
            data-rh={true}
          >
            Harry Potter - Wizard
          </title>
        </head>
        <body />
      </html>
    `)
  })
})

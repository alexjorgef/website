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

/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { test, expect } from "@playwright/test"
import { site } from "../src/constants/meta"

const metaTagAssertions = [
  {
    name: `Index Page`,
    url: `/`,
    title: site.titleDefault,
    metaTags: [
      {
        key: `og:title`,
        value: site.titleDefault,
      },
      {
        key: `og:description`,
        value: site.description,
      },
      {
        key: `og:image`,
        value: `https://www.alexjorgef.com/social/default-og-image.png`,
      },
    ],
  },
  {
    name: `Blog Post`,
    url: `/javascript/demo-tutorial-1`,
    title: `Demo tutorial 1 | ${site.title}`,
    metaTags: [
      {
        key: `og:title`,
        value: `Demo tutorial 1`,
      },
      {
        key: `og:description`,
        value: `Demo tutorial article.`,
      },
      {
        key: `og:image`,
        value: `https://www.alexjorgef.com/og-images/dsg-analytics.png`,
      },
    ],
  },
  {
    name: `Notebook Post`,
    url: `/garden/demo-1`,
    title: `Demo 1 | ${site.title}`,
    metaTags: [
      {
        key: `og:title`,
        value: `Demo 1`,
      },
      {
        key: `og:description`,
        value: `This is MDX markdown`,
      },
      {
        key: `og:image`,
        value: `https://www.alexjorgef.com/social/digital-garden.png`,
      },
    ],
  },
]

const noIndexPages = [
  {
    name: `Legal Notice`,
    url: `/legal-notice`,
  },
  {
    name: `Privacy Policy`,
    url: `/privacy-policy`,
  },
  {
    name: `About`,
    url: `/about`,
  },
]

test.describe(`Meta Tags`, () => {
  for (const assertion of metaTagAssertions) {
    test(`${assertion.name} should have correct information`, async ({ page }) => {
      await page.goto(assertion.url)
      await expect(page).toHaveTitle(assertion.title)
      for (const tag of assertion.metaTags) {
        const content = await page.locator(`meta[property="${tag.key}"]`).getAttribute(`content`)
        await expect(content).toContain(tag.value)
      }
    })
  }
  for (const assertion of noIndexPages) {
    test(`${assertion.name} should have noindex meta tag`, async ({ page }) => {
      await page.goto(assertion.url)
      const content = await page.locator(`meta[name="robots"]`).getAttribute(`content`)
      await expect(content).toStrictEqual(`noindex, nofollow`)
    })
  }
})

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

import { test, expect } from "@playwright/test"

test.describe(`Kitchen Sink`, () => {
  test(`visiting primary navigation`, async ({ page }) => {
    await page.goto(`/`)

    await page.locator(`[aria-label="Primary navigation"] >> text=Workfolio`).click()
    await expect(page).toHaveURL(`/about/workfolio`)

    await page.locator(`[aria-label="Primary navigation"] >> text=Writing`).click()
    await expect(page).toHaveURL(`/writing`)

    await page.locator(`[aria-label="Primary navigation"] >> text=Contact`).click()
    await expect(page).toHaveURL(`/contact`)

    await page.locator(`[aria-label="alexjorgef\\.com\\, Back to homepage"] svg`).click()
    await expect(page).toHaveURL(`/`)
  })
  // test(`visiting writing subnavigation`, async ({ page }) => {
  //   await page.goto(`/writing`)

  //   await page.locator(`text=Tutorials`).first().click()
  //   await expect(page).toHaveURL(`/tutorials`)

  //   await page.locator(`text=JavaScript`).first().click()
  //   await expect(page).toHaveURL(`/javascript`)

  //   await page.locator(`text=Environment`).first().click()
  //   await expect(page).toHaveURL(`/environment`)
  // })
  test(`footer navigation`, async ({ page }) => {
    await page.goto(`/`)

    await page.locator(`footer[role="contentinfo"] >> text=Privacy Policy`).click()
    await expect(page).toHaveURL(`/privacy-policy`)

    await page.locator(`footer[role="contentinfo"] >> text=Legal Notice`).click()
    await expect(page).toHaveURL(`/legal-notice`)
  })
  test(`content pages`, async ({ page }) => {
    await page.goto(`/javascript/demo-tutorial-1`)
    await page.goto(`/javascript/demo-tutorial-2`)
    await page.goto(`/javascript/demo-prose`)
  })
})

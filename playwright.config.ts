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

import type { PlaywrightTestConfig } from "@playwright/test"
import { devices } from "@playwright/test"

const config: PlaywrightTestConfig = {
  testDir: `./playwright`,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? `github` : `list`,
  webServer: {
    command: process.env.IS_BUILD ? `yarn serve` : `yarn develop`,
    port: process.env.IS_BUILD ? 9000 : 8000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    actionTimeout: 0,
    trace: `on-first-retry`,
  },
  projects: [
    {
      name: `website`,
      use: {
        ...devices[`Desktop Chrome`],
      },
    },
  ],
  outputDir: `./playwright/test-results`,
}

export default config

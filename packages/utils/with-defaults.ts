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

import { PluginOptions } from "gatsby"

export const defaults = {
  writingSource: `content/writing`,
  gardenSource: `content/garden`,
  awesomeSource: `content/awesome`,
  portfolioSource: `content/portfolio`,
  dataSource: `src/data`,
  locales: {
    en: {
      default: true,
      path: `en`,
      locale: `en-US`,
      dateFormat: `DD/MM/YYYY`,
      siteLanguage: `en`,
      ogLanguage: `en_US`,
    },
    pt: {
      default: false,
      path: `pt`,
      locale: `pt-PT`,
      dateFormat: `DD-MM-YYYY`,
      siteLanguage: `pt`,
      ogLanguage: `pt_PT`,
    },
  },
}

/**
 * Set default values for all theme options
 * @param themeOptions - Incoming options
 * @returns Default values unless options are specified
 */
export const withDefaults = (themeOptions: PluginOptions) => {
  const writingSource = (themeOptions.writingSource as string) || defaults.writingSource
  const gardenSource = (themeOptions.gardenSource as string) || defaults.gardenSource
  const awesomeSource = (themeOptions.awesomeSource as string) || defaults.awesomeSource
  const portfolioSource = (themeOptions.portfolioSource as string) || defaults.portfolioSource
  const dataSource = (themeOptions.dataSource as string) || defaults.dataSource
  const locales = (themeOptions.locales as string) || defaults.locales

  return {
    writingSource,
    gardenSource,
    awesomeSource,
    portfolioSource,
    dataSource,
    locales,
  }
}

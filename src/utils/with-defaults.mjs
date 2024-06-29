export const defaults = {
  writingSource: `content/writing`,
  gardenSource: `content/garden`,
  awesomeSource: `content/awesome`,
  portfolioSource: `content/portfolio`,
  dataSource: `src/data`,
  localeInitial: `en`,
  locales: {
    en: {
      path: `en`,
      locale: `en-US`,
      dateFormat: `DD/MM/YYYY`,
      siteLanguage: `en`,
      ogLanguage: `en_US`,
    },
    pt: {
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
 * @param {IPluginOptions} themeOptions - Incoming options
 * @returns {{ writingSource: string; gardenSource: string; dataSource: string; }} Default values unless options are specified
 */
export const withDefaults = (themeOptions) => {
  const writingSource = themeOptions.writingSource || defaults.writingSource
  const gardenSource = themeOptions.gardenSource || defaults.gardenSource
  const dataSource = themeOptions.dataSource || defaults.dataSource
  const awesomeSource = themeOptions.awesomeSource || defaults.awesomeSource
  const portfolioSource = themeOptions.portfolioSource || defaults.portfolioSource
  const locales = themeOptions.locales || defaults.locales
  const localeInitial = themeOptions.localeInitial || defaults.localeInitial

  return {
    writingSource,
    gardenSource,
    awesomeSource,
    portfolioSource,
    dataSource,
    locales,
    localeInitial,
  }
}

/** @typedef {Object} IPluginOptions
 * @property {string} [writingSource]
 * @property {string} [gardenSource]
 * @property {string} [awesomeSource]
 * @property {string} [portfolioSource]
 * @property {string} [dataSource]
 */

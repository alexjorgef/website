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

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: `ts-jest`,
  verbose: true,
  globals: {
    __PATH_PREFIX__: ``,
    __BASE_PATH__: ``,
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2322],
      },
    },
  },
  transform: {
    "^.+\\.[jt]sx?$": `<rootDir>/jest/jest-preprocess.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`, `playwright`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script)/)`],
  setupFiles: [`<rootDir>/jest/jest-setup.js`],
  moduleNameMapper: {
    "^@reach/router(.*)": `<rootDir>/node_modules/@gatsbyjs/reach-router$1`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/jest/__mocks__/file-mock.js`,
  },
}

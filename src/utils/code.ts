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

/**
 * Get the language and optional parameters back
 * @param {string} className
 * @returns {string} The language
 * @example
 * getLanguage('language-js')
 */
export const getLanguage = (className = ``): string => className.split(`language-`).pop()

export const preToCodeBlock = (preProps) => {
  if (preProps?.children?.props?.mdxType === `code`) {
    const { children: codeString, className = ``, ...props } = preProps.children.props

    const match = className.match(/language-([\0-\uFFFF]*)/)
    return {
      codeString: codeString.trim(),
      className,
      language: match !== null ? match[1] : ``,
      ...props,
    }
  }

  return undefined
}

const RE = /{([\d,-]+)}/

/**
 * Get the lines to highlight in a code block
 * @param meta
 * @returns A function that returns a boolean depending on if the index should be highlighted or not (zero-indexed)
 * @example
 * calculateLinesToHighlight('title=gatsby-config.js {3-6}')
 * calculateLinesToHighlight('title=gatsby-config.js {3}')
 * calculateLinesToHighlight('title=gatsby-config.js {3-6,8}')
 */
export const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)![1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  return (index: number) => {
    const lineNumber = index + 1
    return lineNumbers.some(([start, end]) => (end ? lineNumber >= start && lineNumber <= end : lineNumber === start))
  }
}

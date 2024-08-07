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
import Highlight, { defaultProps, Language } from "prism-react-renderer"
import lightTheme from "prism-react-renderer/themes/nightOwlLight"
import darkTheme from "prism-react-renderer/themes/nightOwl"
import { Stack, Box, useColorMode } from "@chakra-ui/react"
import { Copy } from "./copy"
import { calculateLinesToHighlight, getLanguage } from "../../utils/code"

type CodeProps = {
  codeString: string
  language: string
  withLineNumbers?: boolean
  metastring?: string
  [key: string]: unknown
}

export const Code = ({
  codeString,
  withLineNumbers = false,
  title = undefined,
  className: blockClassName,
  metastring = ``,
}: CodeProps) => {
  const { colorMode } = useColorMode()
  const language = getLanguage(blockClassName)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)
  const hasLineNumbers = withLineNumbers && language !== `withLineNumbers`

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language as Language}
      theme={colorMode === `light` ? lightTheme : darkTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="code-block-wrapper">
          {(title || language) && (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
              className="gatsby-highlight-header"
            >
              {title && (
                <Box flexGrow={1} className="code-title">
                  {title}
                </Box>
              )}
              {language && (
                <Box
                  textTransform="uppercase"
                  display="inline-flex"
                  alignItems="center"
                  className="language-display"
                  data-lang={language}
                >
                  {language}
                </Box>
              )}
              <Copy content={codeString} fileName={title} />
            </Stack>
          )}
          <div className="gatsby-highlight" data-prism-renderer="true" data-has-line-numbers={hasLineNumbers}>
            <pre className={className} style={style}>
              <code className={`language-${language}`}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} highlight-line`
                  }

                  return (
                    <div {...lineProps}>
                      {hasLineNumbers && <span className="line-number-style">{i + 1}</span>}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  )
                })}
              </code>
            </pre>
          </div>
        </div>
      )}
    </Highlight>
  )
}

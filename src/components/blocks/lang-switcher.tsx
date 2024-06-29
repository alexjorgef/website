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
import { Select, useColorMode } from "@chakra-ui/react"
import { MdLanguage as LanguageIcon } from "react-icons/md"
import { useI18nContext } from "../../context/i18n-provider"
import { useLocales } from "../../hooks/use-locales"

export const LangSwitcher: React.FC<React.PropsWithChildren<unknown>> = ({ ...props }) => {
  const [locales] = useLocales()
  const { updateState, data: language } = useI18nContext()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ data: event.target.value })
  }
  const { colorMode } = useColorMode()
  const isLight = colorMode === `light`
  return (
    <Select
      {...props}
      value={language.data}
      onChange={handleChange}
      icon={<LanguageIcon />}
      variant="outline"
      size="sm"
      maxWidth="75"
      _hover={{ color: `white`, borderColor: `white` }}
      borderColor={`whiteAlpha.600`}
      color={`whiteAlpha.600`}
      borderRadius="md"
    >
      {locales.map((locale) => (
        <option key={locale.name} value={locale.name} style={{ color: isLight ? `black` : `white` }}>
          {locale.name.toUpperCase()}
        </option>
      ))}
    </Select>
  )
}

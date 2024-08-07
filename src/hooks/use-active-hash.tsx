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

export const useActiveHash = (
  itemIds: Array<string>,
  options: {
    root?: HTMLElement | null
    rootMargin?: string
    thresholds?: ReadonlyArray<number>
  } = {}
) => {
  const [activeHash, setActiveHash] = React.useState(``)

  React.useEffect(() => {
    if (typeof window === `undefined`) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%`, ...options }
    )

    const existingElements = itemIds.map((id) => document.getElementById(id)).filter(Boolean)

    existingElements.forEach((el) => {
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      existingElements.forEach((el) => {
        if (el) {
          observer.unobserve(el)
        }
      })
    }
  }, [itemIds, options])

  return activeHash
}

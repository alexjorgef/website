/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
// Copied from https://github.com/chakra-ui/chakra-ui/blob/ff0dfb2b735a047c7a811f65b20fb81fa3db6f4a/packages/utils/src/object.ts

/**
 * Get value from a deeply nested object using a string path.
 * Memorizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param fallback  - the fallback value
 */
export function get(obj: Record<string, any>, path: string | number, fallback?: any, index?: number) {
  const key = typeof path === `string` ? path.split(`.`) : [path]

  for (index = 0; index < key.length; index += 1) {
    if (!obj) break
    obj = obj[key[index]]
  }

  return obj === undefined ? fallback : obj
}

type Get = (obj: Readonly<Record<string, unknown>>, path: string | number, fallback?: any, index?: number) => any

export const memoize = (fn: Get) => {
  const cache = new WeakMap()

  const memoizedFn: Get = (obj, path, fallback, index) => {
    if (typeof obj === `undefined`) {
      return fn(obj, path, fallback)
    }

    if (!cache.has(obj)) {
      cache.set(obj, new Map())
    }

    const map = cache.get(obj)

    if (map.has(path)) {
      return map.get(path)
    }

    const value = fn(obj, path, fallback, index)

    map.set(path, value)

    return value
  }

  return memoizedFn
}

export const memoizedGet = memoize(get)

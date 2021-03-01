type debounce = (func: (...args: any[]) => void, delay: number) => (args: any[]) => void

export const debounce: debounce = (func, delay) => {
  let timer: NodeJS.Timeout
  function fn(...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(func, args)
      clearTimeout(timer)
    }, delay)
  }
  return fn
}

export function deepCopy(target: { [propName: string]: any }) {
  if (typeof target === 'object') {
    const result: any = Array.isArray(target) ? [] : {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key in target) {
      if (typeof target[key] === 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }
    return result
  }
  return target
}

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

export function Defer<T>() {
  let resolve!: (value: T | Promise<T>) => void
  let reject!: (reason?: any) => void

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })

  return { promise, resolve, reject }
}

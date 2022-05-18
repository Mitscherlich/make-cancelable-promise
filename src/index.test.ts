import { isAbortError, makeCancelablePromise } from './index'

describe('should', () => {
  test('cancel a promise throw `AbortError`', async () => {
    const { promise, cancel } = makeCancelablePromise(new Promise((resolve) => {
      setTimeout(resolve, 100)
    }))

    try {
      cancel()
      await promise
    }
    catch (e) {
      expect(isAbortError(e)).toBe(true)
    }
  })

  test('cancel a promise with AbortSignal', async () => {
    const abort = new AbortController()

    const { promise } = makeCancelablePromise(new Promise((resolve) => {
      setTimeout(resolve, 100)
    }), abort.signal)

    try {
      abort.abort()
      await promise
    }
    catch (e) {
      expect(isAbortError(e)).toBe(true)
    }
  })
})

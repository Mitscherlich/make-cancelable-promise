import { AbortError } from './AbortError'
import { Defer } from './defer'

export interface CancelablePromise<T> {
  promise: Promise<T>

  cancel(reason?: any): void
}

/**
 * Creates a promise that can be canceled.
 */
export function makeCancelablePromise<T>(promise: Promise<T>): CancelablePromise<T>
/**
 * Use with native `AbortSignal` to cancel a promise.
 */
export function makeCancelablePromise<T>(promise: Promise<T>, signal: AbortSignal): CancelablePromise<T>

export function makeCancelablePromise<T>(promise: Promise<T>, signal?: AbortSignal): CancelablePromise<T> {
  const defer = Defer<T>()

  const cancel = (reason?: any) => {
    defer.reject(new AbortError(reason))
  }

  const wrappedPromise = Promise.race([
    promise,
    defer.promise,
  ])

  if (signal)
    signal.addEventListener('abort', cancel)

  return { promise: wrappedPromise, cancel }
}

export { isAbortError } from './AbortError'

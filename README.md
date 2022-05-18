# @m9ch/make-cancelable-promise

[![npm version](https://badgen.net/npm/v/@m9ch/make-cancelable-promise)](https://npm.im/@m9ch/make-cancelable-promise) [![npm downloads](https://badgen.net/npm/dm/@m9ch/make-cancelable-promise)](https://npm.im/@m9ch/make-cancelable-promise)

Make any promise cancelable.

## Install

via `pnpm`, `yarn` or `npm`:

```bash
pnpm add @m9ch/make-cancelable-promise
# or
yarn add @m9ch/make-cancelable-promise
# or
npm i -S @m9ch/make-cancelable-promise
```

## Usage

```javascript
import { makeCancelablePromise } from '@m9ch/make-cancelable-promise'

const abort = new AbortController()

const cancelable = makeCancelablePromise(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done')
    }, 1000)
  }),
  abort.signal
)

setTimeout(() => {
  cancelable.cancel('The operation was aborted')
}, 500)

// or with abort signal
abort.abort()

cancelable.promise
  .then(console.log)    // => undefined
  .catch(console.error) // => AbortError: The operation was aborted
```

## License

MIT &copy; [Mitscherlich](https://mitscherlich.me)

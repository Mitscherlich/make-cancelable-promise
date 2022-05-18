export class AbortError extends Error {
  constructor(public message: string = 'abort') {
    super()

    this.name = 'AbortError'
  }
}

export const isAbortError = (error: any) => error instanceof AbortError

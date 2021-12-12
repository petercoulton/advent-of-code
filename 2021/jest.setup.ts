import { diff, printExpected, printReceived } from 'jest-matcher-utils'
import strip from 'ts-dedent'

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Used when you want to check that something is cool.
       *
       */
      toBeCool(): R
    }
  }
}

expect.extend({
  toBeCool(received: any) {
    const options = {
      isNot: this.isNot,
      promise: this.promise,
    }

    const hint = this.utils.matcherHint(`toBeCool`, undefined, undefined, options)

    const itsCool = received === `cool`

    const passMessage = () => strip`
      ${ hint }
      
      Expected: not ${ printExpected(`cool`) }
      Received: ${ printReceived(received) }`

    const failMessage = () => {
      const difference = diff(`cool`, received, { expand: this.expand })

      const comparison =
        difference && difference.includes('- Expect')
        ? `Difference:\n\n${ difference }`
        : `Expected: ${ printExpected(`cool`) }\n` +
          `Received: ${ printReceived(received) }`

      return strip`
        ${ hint }
        
        ${ comparison }
      `
    }

    return {
      message: itsCool ? passMessage : failMessage,
      pass: itsCool,
    }
  },
})

export {}

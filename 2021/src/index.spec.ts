import fc from 'fast-check'
import { rollingWindow } from './index'

describe('windows', () => {
  it('should groups values in runs', async () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 5 }),
        fc.array(fc.nat()),
        (size, values) => {
          const numWindows = values.length < size ? 0 : values.length - size + 1
          expect(values.flatMap(rollingWindow(size)).length).toBe(numWindows)
        },
      ),
    )
  })
})



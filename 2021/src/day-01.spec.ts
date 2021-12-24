import fc from 'fast-check'

import { dayOneExampleInput, dayOneInput } from './input'
import { countDepthIncreases, parseInput, rollingWindow } from './day-01'

describe.only('Day 1: Sonar Sweep', () => {
  describe('part one', () => {
    describe('example', () => {
      it('should count the number of depth measurement increases', async () => {
        const values = parseInput(dayOneExampleInput())
        expect(countDepthIncreases(values)).toBe(7)
      })
    })

    describe('answer', () => {
      it('should count the number of depth measurement increases', async () => {
        const values = parseInput(dayOneInput())
        expect(countDepthIncreases(values)).toBe(1527)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      it('should count the number of depth measurement increases', async () => {
        const values = parseInput(dayOneExampleInput())
        expect(countDepthIncreases(values, 3)).toBe(5)
      })
    })

    describe('answer', () => {
      it('should count the number of depth measurement increases', async () => {
        const values = parseInput(dayOneInput())
        expect(countDepthIncreases(values, 3)).toBe(1575)
      })
    })
  })
})

describe('rollingWindow', () => {
  it('should groups values in runs', async () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 5 }),
        fc.array(fc.nat()),
        (size, values) => {
          const numWindows = values.length < size ? 0 : values.length - size + 1
          expect(values.flatMap(rollingWindow(size)).length).toBe(numWindows)
        }
      )
    )
  })
})

describe('given a depth report', () => {
  describe('with no measurement window', () => {
    it('should count the number of times a depth measurement increases', async () => {
      const values = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
      expect(countDepthIncreases(values)).toBe(7)
    })

    it('should return 0 for less than 2 values', async () => {
      fc.assert(
        fc.property(
          fc.array(fc.nat(), { minLength: 0, maxLength: 1 }),
          values => expect(countDepthIncreases(values)).toBe(0)
        )
      )
    })

    it('should return n-1 for n monotonically increasing depth values', async () => {
      const values = fc
        .tuple(fc.nat(), fc.nat(2_000))
        .chain(([start, count]) => {
          const values = new Array(count).fill(1).map((n, i) => start + i)
          return fc.constant(values)
        })

      fc.assert(
        fc.property(values, values => {
          fc.pre(values.length > 0)
          expect(countDepthIncreases(values)).toBe(values.length - 1)
        })
      )
    })
  })

  describe('with a measurement window', () => {
    describe('of 3', () => {
      it('should count number of times a depth measurement window increases', async () => {
        const values = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
        expect(countDepthIncreases(values, 3)).toBe(5)
      })
    })
  })
})

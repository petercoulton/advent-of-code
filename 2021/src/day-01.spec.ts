import fs from 'fs'
import path from 'path'
import fc from 'fast-check'

import { countDepthIncreases } from './index'

describe('given a depth report', () => {

  describe('with no measurement window', () => {

    it('should count the number of times a depth measurement increases', async () => {
      const values = [ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ]
      expect(countDepthIncreases(values)).toBe(7)
    })

    it('should return 0 for less than 2 values', async () => {
      fc.assert(
        fc.property(
          fc.array(fc.nat(), { minLength: 0, maxLength: 1 }),
          (values) => expect(countDepthIncreases(values)).toBe(0),
        ),
      )
    })

    it('should return n-1 for n monotonically increasing depth values', async () => {
      const values =
        fc.tuple(fc.nat(), fc.nat(2_000))
          .chain(([ start, count ]) => {
            const values = new Array(count).fill(1).map((n, i) => start + i)
            return fc.constant(values)
          })

      fc.assert(
        fc.property(values, (values) => {
            fc.pre(values.length > 0)
            expect(countDepthIncreases(values)).toBe(values.length - 1)
          },
        ),
      )
    })
  })

  describe('with a measurement window', () => {

    describe('of 3', () => {

      it('should count number of times a depth measurement window increases', async () => {
        const values = [ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ]
        expect(countDepthIncreases(values, 3)).toBe(5)
      })
    })
  })
})

const readInputfile = (filename: string) => {
  const input = fs.readFileSync(path.join(__dirname, '__input__', filename), 'utf-8')
  return input.split('\n').map(n => Number.parseInt(n))
}

describe('day one', () => {
  const values = readInputfile('day-01.txt')

  describe('part one, single values', () => {
    it('should count the number of increasing depth values', async () => {
      expect(countDepthIncreases(values)).toBe(1527)
    })
  })
  describe('part two, three value average', () => {
    it('should count the number of increasing depth values', async () => {
      expect(countDepthIncreases(values, 3)).toBe(1575)
    })
  })
})

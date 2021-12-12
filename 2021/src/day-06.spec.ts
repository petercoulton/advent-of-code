import { daySixExample, daySixInput } from './input'
import { parseInput, simulateDays } from './day-06'

describe('Day 6: Lanternfish', () => {
  describe('part one', () => {
    describe('example', () => {
      it('should simulate the lanternfish population', async () => {
        const input = daySixExample()
        const initialPopulation = parseInput(input)
        const population = simulateDays(initialPopulation, 80)

        expect(population.length).toEqual(5934)
      })
    })

    describe('answer', () => {
      it('should simulate the lanternfish population', async () => {
        const input = daySixInput()
        const initialPopulation = parseInput(input)
        const population = simulateDays(initialPopulation, 80)

        expect(population.length).toEqual(391671)
      })
    })
  })

  xdescribe('part two', () => {
    describe('example', () => {
      it('should simulate the lanternfish population', async () => {
        const input = daySixExample()
        const initialPopulation = parseInput(input)
        const population = simulateDays(initialPopulation, 256)

        expect(population.length).toEqual(26984457539)
      })
    })

    describe('answer', () => {})
  })
})

describe('simulating lanternfish', () => {
  it.each([
    [1, 1, [8], [7]],
    [8, 1, [8], [0]],
    [9, 2, [8], [6, 8]],
    [10, 2, [8], [5, 7]],
    [15, 2, [8], [0, 2]],
    [16, 3, [8], [6, 1, 8]],
    [17, 3, [8], [5, 0, 7]],
    [18, 4, [8], [4, 6, 6, 8]],
    [
      18,
      26,
      [3, 4, 3, 1, 2],
      [
        6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8,
        8, 8,
      ],
    ],
  ])(
    'after %i days there should be %i fish',
    (days, count, initialPopulation, expected) => {
      const actualPopulation = simulateDays(initialPopulation, days)
      expect(actualPopulation.length).toEqual(expected.length)
      expect(actualPopulation).toEqual(expected)
    }
  )
})

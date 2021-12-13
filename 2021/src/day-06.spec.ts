import { daySixExample, daySixInput } from './input'
import { parseInput, simulateDays } from './day-06'

describe('Day 6: Lanternfish', () => {
  describe('part one', () => {
    describe('example', () => {
      it('should simulate the lanternfish population', async () => {
        const input = daySixExample()
        const initialPopulation = parseInput(input)
        const population = simulateDays(initialPopulation, 80)

        expect(population).toEqual(5934)
      })
    })

    describe('answer', () => {
      it('should simulate the lanternfish population', async () => {
        const input = daySixInput()
        const initialPopulation = parseInput(input)
        const population = simulateDays(initialPopulation, 80)

        expect(population).toEqual(391671)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      it('should simulate the lanternfish population', async () => {
        const input = daySixExample()
        const initialPopulation = parseInput(input)
        const population = simulateDays(initialPopulation, 256)

        expect(population).toEqual(26984457539)
      })
    })

    describe('answer', () => {
      it('should simulate the lanternfish population', async () => {
        const input = daySixInput()
        const initialPopulation = parseInput(input)
        const population = simulateDays(initialPopulation, 256)

        expect(population).toEqual(1754000560399)
      })
    })
  })
})

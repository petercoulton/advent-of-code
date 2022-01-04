import { realInput } from '../input'
import { parseInput, simulateDays } from '../day-06'

const exampleInput = `3,4,3,1,2`

describe('Day 6: Lanternfish', () => {
  describe('part one', () => {
    describe('example', () => {
      it('should simulate the lanternfish population', async () => {
        const initialPopulation = parseInput(exampleInput)
        const population = simulateDays(initialPopulation, 80)

        expect(population).toEqual(5934)
      })
    })

    describe('answer', () => {
      it('should simulate the lanternfish population', async () => {
        const initialPopulation = parseInput(realInput(6))
        const population = simulateDays(initialPopulation, 80)

        expect(population).toEqual(391671)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      it('should simulate the lanternfish population', async () => {
        const initialPopulation = parseInput(exampleInput)
        const population = simulateDays(initialPopulation, 256)

        expect(population).toEqual(26984457539)
      })
    })

    describe('answer', () => {
      it('should simulate the lanternfish population', async () => {
        const initialPopulation = parseInput(realInput(6))
        const population = simulateDays(initialPopulation, 256)

        expect(population).toEqual(1754000560399)
      })
    })
  })
})

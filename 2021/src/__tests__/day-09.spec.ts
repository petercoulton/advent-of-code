import dedent from 'ts-dedent'

import { buildFloorMap, calculateRiskLevel, calculateRiskLevels, findBasin, findBasins, findLowPoints, findNeighbours, parseInput } from '../day-09'
import { realInput } from '../input'

const exampleInput = dedent`
    2199943210
    3987894921
    9856789892
    8767896789
    9899965678
    `

describe.only('Day 9: Smoke Basin', () => {
  describe('part one', () => {
    describe('example', () => {
      const heightmap = parseInput(exampleInput)

      it('should find the neighbours for each point', async () => {
        expect(findNeighbours(heightmap, 0, 0)).toEqual([ 1, 3 ])
        expect(findNeighbours(heightmap, 1, 0)).toEqual([ 2, 9, 9 ])
        expect(findNeighbours(heightmap, 2, 2)).toEqual([ 8, 8, 6, 6 ])
        expect(findNeighbours(heightmap, 9, 0)).toEqual([ 1, 1 ])
        expect(findNeighbours(parseInput(`21\n90`), 1, 0)).toEqual([ 2, 0 ])
      })

      it('should identify the lowest points', async () => {
        expect(findLowPoints(heightmap)).toEqual([1,0,5,5])
      })

      it('should calculate the risk levels', async () => {
        expect(calculateRiskLevels(heightmap)).toEqual([2,1,6,6])
      })

      it('should calculate the overall risk level', async () => {
        expect(calculateRiskLevel(heightmap)).toEqual(15)
      })
    })

    describe('answer', () => {
      it('should calculate the overall risk level', async () => {
        expect(calculateRiskLevel(parseInput(realInput(9)))).toEqual(425)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      it('should find basins', async () => {
        expect(findBasins(buildFloorMap(parseInput(`12349`))).length).toEqual(1)
        expect(findBasins(buildFloorMap(parseInput(`1\n2\n3\n4\n9`))).length).toEqual(1)
        expect(findBasins(buildFloorMap(parseInput(exampleInput))).length).toEqual(4)
      })

      it('should find the 3 largest basins', async () => {
        const basins = findBasins(buildFloorMap(parseInput(exampleInput)))

        console.log(basins)

        const largestBasins =
          basins
            .map(basin => basin.length)

        expect(largestBasins).toEqual([9, 14, 9])
      })

    })
    describe('answer', () => {})
  })
})


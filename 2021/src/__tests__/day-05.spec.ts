import dedent from 'ts-dedent'

import { realInput } from '../input'
import { countOverlappingPoints, drawDiagram, parseInput, plotOceanFloor } from '../day-05'

const exampleInput =
  dedent(`0,9 -> 5,9
          8,0 -> 0,8
          9,4 -> 3,4
          2,2 -> 2,1
          7,0 -> 7,4
          6,4 -> 2,0
          0,9 -> 2,9
          3,4 -> 1,4
          0,0 -> 8,8
          5,5 -> 8,2`)

describe.only('Day 5: Hydrothermal Venture', () => {
  describe('part one', () => {
    describe('example', () => {
      const lines = parseInput(exampleInput)
      const straightLines = lines.filter(
        ([x1, y1, x2, y2]) => x1 == x2 || y1 == y2
      )
      const oceanFloor = plotOceanFloor(straightLines, 10, 10)

      it('should draw the sea floor diagram', async () => {
        const output = drawDiagram(oceanFloor, 10, 10)

        expect(output).toEqual(dedent`
           .......1..
           ..1....1..
           ..1....1..
           .......1..
           .112111211
           ..........
           ..........
           ..........
           ..........
           222111....
        `)
      })

      it('should identify the number of overlapping points', async () => {
        const overlappingPoints = countOverlappingPoints(oceanFloor)

        expect(overlappingPoints).toEqual(5)
      })
    })

    describe('answer', () => {
      it('should identify the number of overlapping points', async () => {
        const lines = parseInput(realInput(5))
        const straightLines = lines.filter(
          ([x1, y1, x2, y2]) => x1 == x2 || y1 == y2
        )
        const oceanFloor = plotOceanFloor(straightLines)
        const overlappingPoints = countOverlappingPoints(oceanFloor)

        expect(overlappingPoints).toEqual(5084)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      const lines = parseInput(exampleInput)
      const oceanFloor = plotOceanFloor(lines, 10, 10)

      it('should draw the sea floor diagram', async () => {
        const output = drawDiagram(oceanFloor, 10, 10)

        expect(output).toEqual(dedent`
           1.1....11.
           .111...2..
           ..2.1.111.
           ...1.2.2..
           .112313211
           ...1.2....
           ..1...1...
           .1.....1..
           1.......1.
           222111....
        `)
      })

      it('should identify the number of overlapping lines', async () => {
        const overlappingPoints = countOverlappingPoints(oceanFloor)

        expect(overlappingPoints).toEqual(12)
      })
    })

    describe('answer', () => {
      it('should identify the number of overlapping points', async () => {
        const lines = parseInput(realInput(5))
        const oceanFloor = plotOceanFloor(lines)
        const overlappingPoints = countOverlappingPoints(oceanFloor)

        expect(overlappingPoints).toEqual(17882)
      })
    })
  })
})

it('should have a repl', async () => {
  const lines = parseInput(exampleInput)
  const straightLines = lines.filter(([x1, y1, x2, y2]) => x1 == x2 || y1 == y2)

  const part1OceanFloor = plotOceanFloor(straightLines, 10, 10)
  const part2OceanFloor = plotOceanFloor(lines, 10, 10)

  const part1Output = drawDiagram(part1OceanFloor, 10, 10).split('\n')
  const part2Output = drawDiagram(part2OceanFloor, 10, 10).split('\n')

  const part1expected = dedent`
           .......1..
           ..1....1..
           ..1....1..
           .......1..
           .112111211
           ..........
           ..........
           ..........
           ..........
           222111....
        `.split('\n')
  const part2expected = dedent`
           1.1....11.
           .111...2..
           ..2.1.111.
           ...1.2.2..
           .112313211
           ...1.2....
           ..1...1...
           .1.....1..
           1.......1.
           222111....
        `.split('\n')

  const sideBySide = part1expected
    .map((line, i) =>
      [line, part1Output[i], part2expected[i], part2Output[i]].join(`  `)
    )
    .join('\n')

  console.log(sideBySide)
})

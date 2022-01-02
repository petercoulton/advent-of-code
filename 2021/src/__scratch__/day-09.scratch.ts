import { scratch, xscratch } from '../lib/scratch'
import dedent from 'ts-dedent'
import { displayBasins, displayLowPoints, parseInput } from '../day-09'


xscratch(`low points`, () => {
  scratch(`corner case`, () => {
    const example = dedent`
      21
      90
      `
    displayLowPoints(parseInput(example))
  })

  scratch(`part 1 example`, () => {
    const example = dedent`
      2199943210
      3987894921
      9856789892
      8767896789
      9899965678
      `
    displayLowPoints(parseInput(example))
  })
})

scratch(`basins`, () => {
  scratch(`1D basin`, () => {
    const example = dedent
      `12349`

    displayBasins(parseInput(example))
    console.log()
  })

  scratch(`top-left basin`, () => {
    const example = dedent
      `219
       398
       988`

    displayBasins(parseInput(example))
    console.log()
  })

  scratch(`top-right basin`, () => {
    const example = dedent
      `943210
       894921
       889892
       897789`

    displayBasins(parseInput(example))
    console.log()
  })

  scratch(`full example`, () => {
    const example = dedent
      `2199943210
       3987894921
       9856789892
       8767896789
       9899965678`

    displayBasins(parseInput(example))
    console.log()
  })
})

import dedent from 'ts-dedent'
import { displayBasins, displayLowPoints, parseInput } from './day-09'
import { realInput } from './input'
import colors from 'colors'

const scratch = (title: string, fn: () => void) => {
  console.log(colors.white(title), `\n`)
  fn()
  console.log()
}

const xscratch = (title: string, fn: () => void) => {}

console.clear()
console.log()

xscratch(`low points`, () => {
  const example1 = dedent`
      21
      90
      `

  displayLowPoints(parseInput(example1))
  console.log()

  const example2 = dedent`
      2199943210
      3987894921
      9856789892
      8767896789
      9899965678
      `

  displayLowPoints(parseInput(example2))
  console.log()

  displayLowPoints(parseInput(realInput(9)))
  console.log()
})

scratch(`basins`, () => {
  const example3 = dedent`
    2199943210
    3987894921
    9856789892
    8767896789
    9899965678
    `

  displayBasins(parseInput(example3))
  console.log()
})




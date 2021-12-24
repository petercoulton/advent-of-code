import { realInput } from '../input'
import { cost, fuelRequired, parseInput } from '../day-07'

const exampleInput = `16,1,2,0,4,2,7,1,2,14`

describe.only('Day 7: The Treachery of Whales', () => {
  describe('part one', () => {
    describe('example', () => {
      it('should calculate the cheapest way to align', async () => {
        const crabs = parseInput(exampleInput)

        let fuel
        for (let target = 0; target < 50; target++) {
          fuel = fuelRequired(crabs, target)
          const next = fuelRequired(crabs, target + 1)
          if (next > fuel) {
            break
          }
        }

        expect(fuel).toEqual(37)
      })
    })
    describe('answer', () => {
      it('should calculate the cheapest way to align', async () => {
        const crabs = parseInput(realInput(7))

        let fuel
        for (let target = 0; target < 1000; target++) {
          fuel = fuelRequired(crabs, target)
          let nextFuel = fuelRequired(crabs, target + 1)

          if (nextFuel > fuel) {
            break
          }
        }
        expect(fuel).toEqual(340987)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      it('should calculate the cheapest way to align', async () => {
        const crabs = parseInput(exampleInput)

        let fuel
        for (let target = 0; target < 10; target++) {
          fuel = fuelRequired(crabs, target, 1)
          const next = fuelRequired(crabs, target + 1, 1)
          if (next > fuel) {
            break
          }
        }

        expect(fuel).toEqual(168)
      })
    })
    describe('answer', () => {
      it('should calculate the cheapest way to align', async () => {
        const crabs = parseInput(realInput(7))

        let fuel
        for (let target = 0; target < 1000; target++) {
          fuel = fuelRequired(crabs, target, 1)
          let nextFuel = fuelRequired(crabs, target + 1, 1)

          if (nextFuel > fuel) {
            break
          }
        }
        expect(fuel).toEqual(96987874)
      })
    })
  })
})

describe('calculating fuel requirements', () => {
  const crabs = parseInput(exampleInput)
  it.each([
    [1, 41],
    [2, 37],
    [3, 39],
    [10, 71],
  ])('', (target, expectedFuel) => {
    const fuel = fuelRequired(crabs, target)
    expect(fuel).toEqual(expectedFuel)
  })

  it.each([
    [1, 41],
    [2, 37],
    [3, 39],
    [10, 71],
  ])('', (target, expectedFuel) => {
    const fuel = fuelRequired(crabs, target)
    expect(fuel).toEqual(expectedFuel)
  })

  it.each([
    [16, 2, 14],
    [1, 2, 1],
    [2, 2, 0],
    [0, 2, 2],
    [4, 2, 2],
    [2, 2, 0],
    [7, 2, 5],
    [1, 2, 1],
    [2, 2, 0],
    [14, 2, 12],
  ])('Move from %i to %i: %i fuel', (start, stop, expectedFuel) => {
    const fuel = cost(Math.abs(start - stop), 0)
    expect(fuel).toEqual(expectedFuel)
  })

  it.each([
    [16, 5, 66],
    [1, 5, 10],
    [2, 5, 6],
    [0, 5, 15],
    [4, 5, 1],
    [2, 5, 6],
    [7, 5, 3],
    [1, 5, 10],
    [2, 5, 6],
    [14, 5, 45],
  ])('Move from %i to %i: %i fuel', (start, stop, expectedFuel) => {
    const fuel = cost(Math.abs(start - stop), 1)
    expect(fuel).toEqual(expectedFuel)
  })

  it('should keep calculating until fuel consumption increases', async () => {
    const crabs = parseInput(realInput(7))
    let fuel
    for (let target = 0; target < 1000; target++) {
      fuel = fuelRequired(crabs, target)
      let nextFuel = fuelRequired(crabs, target + 1)

      if (nextFuel > fuel) {
        break
      }
    }
    expect(fuel).toEqual(37)
  })
})

it('should have a repl', async () => {
  const output = Array(10)
    .fill(1)
    .map((n, i) => n * (i + 1))

  console.log(output)
})

type Crabs = number[]

export const min = (crabs: Crabs) => Math.min.apply(Math, crabs)
export const max = (crabs: Crabs) => Math.max.apply(Math, crabs)
export const sum = (
  crabs: Crabs,
  expr: (sum: number, value: number) => number = (sum, value) => sum + value
) => crabs.reduce(expr, 0)

export const cost = (steps: number, rate: number): number =>
  rate == 0
    ? steps
    : sum(
        Array(steps)
          .fill(rate)
          .map((n, i) => n * (i + 1))
      )

export const fuelRequired = (
  crabs: Crabs,
  target: number,
  fuelRate: number = 0
) => sum(crabs, (fuel, pos) => fuel + cost(Math.abs(target - pos), fuelRate))

export const parseInput = (input: string): Crabs => input.split(',').map(Number)

export const minFuelAlignment = (positions: Crabs) => {
  return positions
}

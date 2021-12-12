export const parseInput = (input: string) => input.split(',').map(Number)

type Fish = number
type Population = Fish[]

const simulateDay = (population: Population): Population =>
  population.flatMap(fishAge => (fishAge == 0 ? [6, 8] : [fishAge - 1]))

export const simulateDays = (
  population: Population,
  days: number
): Population => {
  let currentPopulation: Population = population
  for (let i = 0; i < days; i++) {
    currentPopulation = simulateDay(currentPopulation)
  }
  return currentPopulation
}

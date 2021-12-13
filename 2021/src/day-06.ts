type FishAge = number
type Population = Record<FishAge, number>

const count = (obj: Record<any, number>): number =>
  Object.values(obj).reduce((sum, n) => sum + n, 0)

export const parseInput = (input: string) =>
  input
    .split(',')
    .map(Number)
    .reduce((pop, fish) => {
      pop[fish] = (pop[fish] ?? 0) + 1
      return pop
    }, {} as Population)

const simulateDay = (population: Population): Population =>
  Object.entries(population)
    .map(([age, count]) => [Number(age), count])
    .reduce((pop, [age, count]) => {
      if (age == 0) {
        pop[6] = count
        pop[8] = count
      } else {
        pop[age - 1] = (pop[age - 1] ?? 0) + count
      }
      return pop
    }, {} as Population)

export const simulateDays = (
  initialPopulation: Population,
  days: number
): number => {
  let population = initialPopulation
  for (let i = 0; i < days; i++) {
    population = simulateDay(population)
  }
  return count(population)
}

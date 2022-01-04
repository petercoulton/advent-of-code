export const parseInput = (input: string) =>
  input.split('\n').map(n => Number.parseInt(n))

export const rollingWindow =
  (size: number) => (n: number, i: number, values: number[]) =>
    i + size > values.length ? [] : [values.slice(i, i + size)]

export const sumWindow = (window: number[]) => window.reduce((s, v) => s + v, 0)

export const countIncreases = (
  increaseCount: number,
  depth: number,
  i: number,
  values: number[]
) => (i > 0 && depth > values[i - 1] ? increaseCount + 1 : increaseCount)

export const countDepthIncreases = (values: number[], windowSize: number = 1) =>
  windowSize > values.length
    ? 0
    : values
        .flatMap(rollingWindow(windowSize))
        .map(sumWindow)
        .reduce(countIncreases, 0)

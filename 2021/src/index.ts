//
//

export const rollingWindow = (size: number) => (n: number, i: number, values: number[]) => {
  return i + size > values.length ? [] : [ values.slice(i, i + size) ]
}

export const sumWindow = (window: number[]) => window.reduce((s, v) => s + v, 0)

export const countIncreases = (increaseCount: number, depth: number, i: number, values: number[]) =>
  i > 0 && depth > values[i - 1]
  ? increaseCount + 1
  : increaseCount


export const countDepthIncreases = (values: number[], windowSize: number = 1) => {
  if (windowSize > values.length) {
    return 0
  }

  return values.flatMap(rollingWindow(windowSize))
               .map(sumWindow)
               .reduce(countIncreases, 0)
}


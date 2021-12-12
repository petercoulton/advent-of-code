type Digit = 0 | 1

export const digitise = (report: string): Array<Digit[]> => {
  return report
    .split('\n')
    .map(line => line.split('').map(c => (c == '1' ? 1 : 0)))
}

export const groupDigits = (report: Array<Digit[]>) => {
  const numDigits = report.reduce((acc, line) => Math.max(acc, line.length), 0)

  return report.reduce(
    (acc, digits) => acc.map((digitGroup, i) => [...digitGroup, digits[i]]),
    new Array<number[]>(numDigits).fill([])
  )
}

export const mostCommonDigits = (values: Array<number[]>) =>
  values.map(digits =>
    digits.filter(d => d == 1).length >= digits.length / 2 ? 1 : 0
  )

export const leastCommonDigits = (values: Array<number[]>) =>
  values.map(digits =>
    digits.filter(d => d == 0).length <= digits.length / 2 ? 0 : 1
  )

export const calcGammaRate = (
  groupedDigits: Array<number[]>
): [number, string] => {
  const gammaRate = groupedDigits
    .map(digits =>
      digits.filter(d => d == 0).length > digits.length / 2 ? 0 : 1
    )
    .join('')
  return [Number.parseInt(gammaRate, 2), gammaRate]
}

export const calcEpsilonRate = (
  groupedDigits: Array<number[]>
): [number, string] => {
  const epsilonRate = groupedDigits
    .map(digits =>
      digits.filter(d => d == 0).length <= digits.length / 2 ? 0 : 1
    )
    .join('')
  return [Number.parseInt(epsilonRate, 2), epsilonRate]
}

export const calcPowerConsumption = (
  report: string
): [number, number, number] => {
  const groupedDigits = groupDigits(digitise(report))
  const [gammaRate] = calcGammaRate(groupedDigits)
  const [epsilonRate] = calcEpsilonRate(groupedDigits)

  return [gammaRate, epsilonRate, gammaRate * epsilonRate]
}

export const filterByBitCriteria = (
  values: Array<Digit[]>,
  criteria: (values: Array<number[]>) => number[],
  bitStats?: number[],
  pos: number = 0
): Digit[] => {
  if (!bitStats) {
    return filterByBitCriteria(
      values,
      criteria,
      criteria(groupDigits(values)),
      pos
    )
  }

  if (values.length == 1) {
    return values[0]
  }

  const filteredValues = values.filter(value => value[pos] == bitStats[pos])
  const newBitStats = criteria(groupDigits(filteredValues))
  return filterByBitCriteria(filteredValues, criteria, newBitStats, pos + 1)
}

export const calcLifeSupportRating = (
  report: string
): [number, number, number] => {
  const reportDigits = digitise(report)

  const oxygenGeneratorRating = Number.parseInt(
    filterByBitCriteria(reportDigits, mostCommonDigits).join(''),
    2
  )
  const co2ScrubberRating = Number.parseInt(
    filterByBitCriteria(reportDigits, leastCommonDigits).join(''),
    2
  )

  return [
    oxygenGeneratorRating,
    co2ScrubberRating,
    oxygenGeneratorRating * co2ScrubberRating,
  ]
}

import dedent from 'ts-dedent'
import { dayThreeInput } from './input'

type Digit = 0 | 1

const digitise = (report: string): Array<Digit[]> => {
  return report.split('\n').map(line => line.split('').map(c => c == '1' ? 1 : 0))
}

const groupDigits = (report: Array<Digit[]>) => {
  const numDigits = report.reduce((acc, line) => Math.max(acc, line.length), 0)

  return report.reduce((acc, digits) => acc.map((digitGroup, i) => [
    ...digitGroup,
    digits[i],
  ]), new Array<number[]>(numDigits).fill([]))
}

const mostCommonDigits = (values: Array<number[]>) =>
  values.map(digits => digits.filter(d => d == 1).length >= digits.length / 2
                       ? 1
                       : 0)

const leastCommonDigits = (values: Array<number[]>) =>
  values.map(digits => digits.filter(d => d == 0).length <= digits.length / 2
                       ? 0
                       : 1)

const calcGammaRate = (groupedDigits: Array<number[]>): [ number, string ] => {
  const gammaRate =
    groupedDigits.map(digits => digits.filter(d => d == 0).length > digits.length / 2 ? 0 : 1)
                 .join('')
  return [ Number.parseInt(gammaRate, 2), gammaRate ]
}

const calcEpsilonRate = (groupedDigits: Array<number[]>): [ number, string ] => {
  const epsilonRate = groupedDigits
    .map(digits => digits.filter(d => d == 0).length <= digits.length / 2 ? 0 : 1)
    .join('')
  return [ Number.parseInt(epsilonRate, 2), epsilonRate ]
}

const calcPowerConsumption = (report: string): [ number, number, number ] => {
  const groupedDigits = groupDigits(digitise(report))
  const [ gammaRate ] = calcGammaRate(groupedDigits)
  const [ epsilonRate ] = calcEpsilonRate(groupedDigits)

  return [
    gammaRate,
    epsilonRate,
    gammaRate * epsilonRate,
  ]
}

const filterByBitCriteria = (values: Array<Digit[]>, criteria: (values: Array<number[]>) => number[], bitStats?: number[], pos: number = 0): Digit[] => {
  if (!bitStats) {
    return filterByBitCriteria(values, criteria, criteria(groupDigits(values)), pos)
  }

  if (values.length == 1) {
    return values[0]
  }

  const filteredValues = values.filter(value => value[pos] == bitStats[pos])
  const newBitStats = criteria(groupDigits(filteredValues))
  return filterByBitCriteria(filteredValues, criteria, newBitStats, pos + 1)
}

const calcLifeSupportRating = (report: string): [ number, number, number ] => {
  const reportDigits = digitise(report)

  const oxygenGeneratorRating = Number.parseInt(filterByBitCriteria(reportDigits, mostCommonDigits).join(''), 2)
  const co2ScrubberRating = Number.parseInt(filterByBitCriteria(reportDigits, leastCommonDigits).join(''), 2)

  return [
    oxygenGeneratorRating,
    co2ScrubberRating,
    oxygenGeneratorRating * co2ScrubberRating,
  ]
}

describe('day two, Binary Diagnostic', () => {
  const exampleInput = dedent(`
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010
      `)
  const realInput = dayThreeInput()

  describe('part one, power consumption', () => {

    it('should group digits', async () => {
      expect(groupDigits(digitise('11111\n00000'))).toEqual([ [ 1, 0 ], [ 1, 0 ], [ 1, 0 ], [ 1, 0 ], [ 1, 0 ] ])
    })

    describe('first example', () => {

      it('should calculate the example power consumption', async () => {
        const groupedDigits = groupDigits(digitise(exampleInput))
        const [ gammaRate, gammaRateDigits ] = calcGammaRate(groupedDigits)
        const [ epsilonRate, epsilonRateDigits ] = calcEpsilonRate(groupedDigits)
        const powerConsumption = gammaRate * epsilonRate

        expect(gammaRateDigits).toEqual('10110')
        expect(epsilonRateDigits).toEqual('01001')
        expect(gammaRate).toEqual(22)
        expect(epsilonRate).toEqual(9)
        expect(powerConsumption).toEqual(198)
      })
    })

    it('should calculate the real power consumption', async () => {
      const [ gammaRate, epsilonRate, powerConsumption ] = calcPowerConsumption(realInput)

      expect(gammaRate).toEqual(2576)
      expect(epsilonRate).toEqual(1519)
      expect(powerConsumption).toEqual(3912944)
    })
  })

  describe('part two, life support', () => {
    describe('second example', () => {
      const reportDigits = digitise(exampleInput)

      describe('calculating common digits', () => {
        describe('when calculating the most common values', () => {
          it('should use 1 when there are equally common', async () => {
            expect(mostCommonDigits(groupDigits(digitise('11111\n00000')))).toEqual([ 1, 1, 1, 1, 1 ])
          })
        })

        describe('when calculating the least common values', () => {
          it('should use 0 when there are equally common', async () => {
            expect(leastCommonDigits(groupDigits(digitise('11111\n00000')))).toEqual([ 0, 0, 0, 0, 0 ])
          })
        })

        it('should find the least and most common digits', async () => {
          expect(mostCommonDigits(groupDigits(digitise(exampleInput)))).toEqual([ 1, 0, 1, 1, 0 ])
          expect(leastCommonDigits(groupDigits(digitise(exampleInput)))).toEqual([ 0, 1, 0, 0, 1 ])
        })
      })

      const oxygenGeneratorRating = filterByBitCriteria(reportDigits, mostCommonDigits).join('')
      const oxygenGeneratorRatingInt = Number.parseInt(oxygenGeneratorRating, 2)
      const co2ScrubberRating = filterByBitCriteria(reportDigits, leastCommonDigits).join('')
      const co2ScrubberRatingInt = Number.parseInt(co2ScrubberRating, 2)

      it('should calculate the oxygen generator rating', async () => {
        expect(oxygenGeneratorRating).toEqual('10111')
        expect(oxygenGeneratorRatingInt).toEqual(23)
      })

      it('should calculate the CO2 scrubber rating', async () => {
        expect(co2ScrubberRating).toEqual('01010')
        expect(co2ScrubberRatingInt).toEqual(10)
      })

      it('should calculate life support rating', async () => {
        expect(oxygenGeneratorRatingInt * co2ScrubberRatingInt).toEqual(230)
      })
    })

    it('should calculate the life support rating of the submarine?', async () => {
      const [ oxygenGeneratorRating, co2ScrubberRating, lifeSupportRating ] = calcLifeSupportRating(realInput)

      expect(oxygenGeneratorRating).toEqual(3597)
      expect(co2ScrubberRating).toEqual(1389)
      expect(lifeSupportRating).toEqual(4996233)
    })
  })
})

export {}

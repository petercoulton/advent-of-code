import { dayThreeExampleInput, dayThreeInput } from './input'

import {
  calcEpsilonRate,
  calcGammaRate,
  calcLifeSupportRating,
  calcPowerConsumption,
  digitise,
  filterByBitCriteria,
  groupDigits,
  leastCommonDigits,
  mostCommonDigits,
} from './day-03'

describe.only('Day 3: Binary Diagnostic', () => {
  describe('part one', () => {
    describe('example', () => {
      it('should calculate power consumption', async () => {
        const input = dayThreeExampleInput()
        const groupedDigits = groupDigits(digitise(input))
        const [gammaRate, gammaRateDigits] = calcGammaRate(groupedDigits)
        const [epsilonRate, epsilonRateDigits] = calcEpsilonRate(groupedDigits)
        const powerConsumption = gammaRate * epsilonRate

        expect(gammaRateDigits).toEqual('10110')
        expect(epsilonRateDigits).toEqual('01001')
        expect(gammaRate).toEqual(22)
        expect(epsilonRate).toEqual(9)
        expect(powerConsumption).toEqual(198)
      })
    })

    describe('answer', () => {
      it('should calculate power consumption', async () => {
        const input = dayThreeInput()
        const [gammaRate, epsilonRate, powerConsumption] =
          calcPowerConsumption(input)

        expect(gammaRate).toEqual(2576)
        expect(epsilonRate).toEqual(1519)
        expect(powerConsumption).toEqual(3912944)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      const exampleInput = dayThreeExampleInput()
      const reportDigits = digitise(exampleInput)
      const oxygenGeneratorRating = filterByBitCriteria(
        reportDigits,
        mostCommonDigits
      ).join('')
      const oxygenGeneratorRatingInt = Number.parseInt(oxygenGeneratorRating, 2)
      const co2ScrubberRating = filterByBitCriteria(
        reportDigits,
        leastCommonDigits
      ).join('')
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

    describe('answer', () => {
      const input = dayThreeInput()
      const [oxygenGeneratorRating, co2ScrubberRating, lifeSupportRating] =
        calcLifeSupportRating(input)

      it('should calculate the oxygen generator rating', async () => {
        expect(oxygenGeneratorRating).toEqual(3597)
      })

      it('should calculate the CO2 scrubber rating', async () => {
        expect(co2ScrubberRating).toEqual(1389)
      })

      it('should calculate life support rating', async () => {
        expect(lifeSupportRating).toEqual(4996233)
      })
    })
  })
})

describe('day two, Binary Diagnostic', () => {
  const exampleInput = dayThreeExampleInput()
  const realInput = dayThreeInput()

  describe('part one, power consumption', () => {
    it('should group digits', async () => {
      expect(groupDigits(digitise('11111\n00000'))).toEqual([
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
        [1, 0],
      ])
    })

    describe('first example', () => {
      it('should calculate the example power consumption', async () => {
        const groupedDigits = groupDigits(digitise(exampleInput))
        const [gammaRate, gammaRateDigits] = calcGammaRate(groupedDigits)
        const [epsilonRate, epsilonRateDigits] = calcEpsilonRate(groupedDigits)
        const powerConsumption = gammaRate * epsilonRate

        expect(gammaRateDigits).toEqual('10110')
        expect(epsilonRateDigits).toEqual('01001')
        expect(gammaRate).toEqual(22)
        expect(epsilonRate).toEqual(9)
        expect(powerConsumption).toEqual(198)
      })
    })

    it('should calculate the real power consumption', async () => {
      const [gammaRate, epsilonRate, powerConsumption] =
        calcPowerConsumption(realInput)

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
            expect(
              mostCommonDigits(groupDigits(digitise('11111\n00000')))
            ).toEqual([1, 1, 1, 1, 1])
          })
        })

        describe('when calculating the least common values', () => {
          it('should use 0 when there are equally common', async () => {
            expect(
              leastCommonDigits(groupDigits(digitise('11111\n00000')))
            ).toEqual([0, 0, 0, 0, 0])
          })
        })

        it('should find the least and most common digits', async () => {
          expect(mostCommonDigits(groupDigits(digitise(exampleInput)))).toEqual(
            [1, 0, 1, 1, 0]
          )
          expect(
            leastCommonDigits(groupDigits(digitise(exampleInput)))
          ).toEqual([0, 1, 0, 0, 1])
        })
      })

      const oxygenGeneratorRating = filterByBitCriteria(
        reportDigits,
        mostCommonDigits
      ).join('')
      const oxygenGeneratorRatingInt = Number.parseInt(oxygenGeneratorRating, 2)
      const co2ScrubberRating = filterByBitCriteria(
        reportDigits,
        leastCommonDigits
      ).join('')
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
      const [oxygenGeneratorRating, co2ScrubberRating, lifeSupportRating] =
        calcLifeSupportRating(realInput)

      expect(oxygenGeneratorRating).toEqual(3597)
      expect(co2ScrubberRating).toEqual(1389)
      expect(lifeSupportRating).toEqual(4996233)
    })
  })
})

export {}

// noinspection SpellCheckingInspection

import dedent from 'ts-dedent'
import {
  countOutputDigits,
  parseInput,
  solve,
  sumOutputNumbers,
  unSolved,
} from '../day-08'
import { realInput } from '../input'

const exampleInput = dedent`
    be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
    edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
    fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
    fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
    aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
    fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
    dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
    bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
    egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
    gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
  `


describe.only('Day 8: Seven Segment Search', () => {
  describe('part one', () => {
    describe('example', () => {
      it('should count the number 1, 4, 7, and 8s', async () => {
        const result = countOutputDigits(exampleInput)
        expect(result).toEqual(26)
      })
    })

    describe('answer', () => {
      it('should count the number 1, 4, 7, and 8s', async () => {
        const result = countOutputDigits(realInput(8))
        expect(result).toEqual(310)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      const lines = parseInput(exampleInput).map(line => solve(line))

      it('should solve every line', async () => {
        expect(lines.filter(unSolved).length).toEqual(0)
      })

      it('should sum the output numbers', async () => {
        expect(sumOutputNumbers(lines)).toEqual(61229)
      })
    })

    describe('answer', () => {
      const lines = parseInput(realInput(8)).map(line => solve(line))

      it('should solve every line', async () => {
        expect(lines.filter(unSolved).length).toEqual(0)
      })

      it('should sum the output numbers', async () => {
        expect(sumOutputNumbers(lines)).toEqual(915941)
      })
    })
  })
})


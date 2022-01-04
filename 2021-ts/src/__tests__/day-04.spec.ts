import dedent from 'ts-dedent'

import { realInput } from '../input'
import { makeSquare, parseInput, play } from '../day-04'

const exampleInput =
  dedent(`
    7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1
    
    22 13 17 11  0
     8  2 23  4 24
    21  9 14 16  7
     6 10  3 18  5
     1 12 20 15 19
    
     3 15  0  2 22
     9 18 13 17  5
    19  8  7 25 23
    20 11 10 24  4
    14 21 16 12  6
    
    14 21 17 24  4
    10 16 15  9 19
    18  8 23 26 20
    22 11 13  6  5
     2  0 12  3  7
    
    `)

describe.only('Day 4: Giant Squid', () => {
  describe('part one', () => {
    describe('example', () => {
      it('should score the example game correctly', async () => {
        const game = parseInput(exampleInput)

        const {
          results: [first],
        } = play(game)

        expect(first.score).toEqual(4512)
      })
    })

    describe('answer', () => {
      it('should score the real game correctly', async () => {
        const game = parseInput(realInput(4))

        const {
          results: [first],
        } = play(game)

        expect(first.score).toEqual(82440)
      })
    })
  })

  describe('part two', () => {
    describe('example', () => {
      it('should determine which board wins', async () => {
        const game = parseInput(exampleInput)

        const { results } = play(game)

        expect(results).toEqual([
          {
            board: 3,
            number: 24,
            score: 4512,
          },
          {
            board: 1,
            number: 16,
            score: 2192,
          },
          {
            board: 2,
            number: 13,
            score: 1924,
          },
        ])
      })
    })

    describe('answer', () => {
      it('should determine which board wins', async () => {
        const game = parseInput(realInput(4))

        const { results } = play(game)

        expect(results.slice(-1)).toEqual([
          {
            board: 85,
            number: 94,
            score: 20774,
          },
        ])
      })
    })
  })
})

describe('parsing input', () => {
  it('should parse', async () => {
    expect(parseInput(`1,2,3,4\n\n 1  2\n 3  4\n`)).toEqual({
      numbers: [1, 2, 3, 4],
      boards: [
        [
          [
            { value: 1, marked: false },
            { value: 2, marked: false },
          ],
          [
            { value: 3, marked: false },
            { value: 4, marked: false },
          ],
        ],
      ],
    })
  })

  it('should extract the drawn numbers', async () => {
    const { numbers } = parseInput(exampleInput)
    expect(numbers).toEqual([
      7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22,
      18, 20, 8, 19, 3, 26, 1,
    ])
  })

  it('should should extract the bingo boards', async () => {
    const { boards } = parseInput(exampleInput)
    expect(boards).toEqual([
      [
        [22, 13, 17, 11, 0].map(makeSquare),
        [8, 2, 23, 4, 24].map(makeSquare),
        [21, 9, 14, 16, 7].map(makeSquare),
        [6, 10, 3, 18, 5].map(makeSquare),
        [1, 12, 20, 15, 19].map(makeSquare),
      ],
      [
        [3, 15, 0, 2, 22].map(makeSquare),
        [9, 18, 13, 17, 5].map(makeSquare),
        [19, 8, 7, 25, 23].map(makeSquare),
        [20, 11, 10, 24, 4].map(makeSquare),
        [14, 21, 16, 12, 6].map(makeSquare),
      ],
      [
        [14, 21, 17, 24, 4].map(makeSquare),
        [10, 16, 15, 9, 19].map(makeSquare),
        [18, 8, 23, 26, 20].map(makeSquare),
        [22, 11, 13, 6, 5].map(makeSquare),
        [2, 0, 12, 3, 7].map(makeSquare),
      ],
    ])
  })
})

describe('bingo!', () => {
  it('should score the example game correctly', async () => {
    const game = parseInput(exampleInput)

    const {
      results: [first],
    } = play(game)

    expect(first.score).toEqual(4512)
  })
})

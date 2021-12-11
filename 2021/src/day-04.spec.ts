import { dayFourExampleInput, dayFourRealInput } from './input'

type DrawnNumbers = number[]

type Square = {
  value: number,
  marked: boolean
}

type Board = Square[][]

type Game = {
  numbers: DrawnNumbers,
  boards: Board[]
}

type Result = {
  board: number,
  number: number,
  score: number
}

type NumberedBoard = { board: Board, num: number }

const makeSquare = (n: number | string): Square => ({
  value: typeof n == 'string' ? parseInt(n) : n,
  marked: false,
})

const parseBoard = (rawBoard: string) =>
  rawBoard.trim().split('\n')
          .map(rawLine => rawLine.trim().split(/\s+/)
                                 .map(makeSquare))

const parseInput = (input: string): Game => {
  const [ rawNumbers, ...rawBoards ] = input.split('\n\n')
  const numbers = rawNumbers.trim().split(',').map(n => parseInt(n))
  const boards = rawBoards.map(parseBoard)

  return {
    numbers: numbers,
    boards: boards,
  }
}

const boardColumns = (board: Board): Square[][] =>
  board.map((_, i) => board.flatMap(line => line.slice(i, i + 1)))

const hasWinningLines = (board: Board) =>
  board.some(line => line.every(({ marked }) => marked))

const hasWinningColumns = (board: Board) =>
  boardColumns(board).some(column => column.every(({ marked }) => marked))

const isWinner = (board: Board) => hasWinningLines(board) || hasWinningColumns(board)

const sumUnmarkedSquares = (board: Board) =>
  board.flat()
       .filter(square => !square.marked)
       .reduce((sum, square) => sum + square.value, 0)

const calculateScore = (board: Board, number: number): number =>
  number * sumUnmarkedSquares(board)

const markSquares = (number: number) =>
  (board: Board) =>
    board.map(line =>
      line.map(square => ({
        ...square,
        marked: square.value == number ? true : square.marked,
      })))

const assignBoardNumber = (board: Board, i: number): NumberedBoard => ({
  board,
  num: i + 1,
})

const isNewWinner = (previousResults: Result[]) =>
  ({ board, num }: NumberedBoard) =>
    isWinner(board) && !previousResults.some(result => result.board == num)

const scoreBoard = (number: number) =>
  ({ board, num }: NumberedBoard) => ({
    board: num,
    number,
    score: calculateScore(board, number),
  })

const play = ({ numbers, boards }: Game) =>
  numbers.reduce((state, number) => {
    const { boards, results } = state

    const markedBoards = boards.map(markSquares(number))

    const newResults = markedBoards.map(assignBoardNumber)
                                   .filter(isNewWinner(results))
                                   .map(scoreBoard(number))
    return {
      ...state,
      boards: markedBoards,
      results: [
        ...results,
        ...newResults,
      ],
    }
  }, { boards, results: [] as Result[] })

describe('day three, Giant Squid', () => {

  describe('part one', () => {

    describe('example', () => {
      const input = dayFourExampleInput()

      describe('parsing input', () => {

        it('should parse', async () => {

          expect(parseInput(`1,2,3,4\n\n 1  2\n 3  4\n`))
            .toEqual({
              numbers: [ 1, 2, 3, 4 ],
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
          const { numbers } = parseInput(input)
          expect(numbers)
            .toEqual([
              7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16,
              13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1,
            ])
        })

        it('should should extract the bingo boards', async () => {
          const { boards } = parseInput(input)
          expect(boards)
            .toEqual([
              [
                [ 22, 13, 17, 11, 0 ].map(makeSquare),
                [ 8, 2, 23, 4, 24 ].map(makeSquare),
                [ 21, 9, 14, 16, 7 ].map(makeSquare),
                [ 6, 10, 3, 18, 5 ].map(makeSquare),
                [ 1, 12, 20, 15, 19 ].map(makeSquare),
              ],
              [
                [ 3, 15, 0, 2, 22 ].map(makeSquare),
                [ 9, 18, 13, 17, 5 ].map(makeSquare),
                [ 19, 8, 7, 25, 23 ].map(makeSquare),
                [ 20, 11, 10, 24, 4 ].map(makeSquare),
                [ 14, 21, 16, 12, 6 ].map(makeSquare),
              ],
              [
                [ 14, 21, 17, 24, 4 ].map(makeSquare),
                [ 10, 16, 15, 9, 19 ].map(makeSquare),
                [ 18, 8, 23, 26, 20 ].map(makeSquare),
                [ 22, 11, 13, 6, 5 ].map(makeSquare),
                [ 2, 0, 12, 3, 7 ].map(makeSquare),
              ],
            ])
        })
      })

      describe('bingo!', () => {

        it('should score the example game correctly', async () => {
          const game = parseInput(input)

          const { results: [ first ] } = play(game)

          expect(first.score).toEqual(4512)
        })
      })
    })

    it('should work out the winning score', async () => {
      const input = dayFourRealInput()

      const game = parseInput(input)

      const { results: [ first ] } = play(game)

      expect(first.score).toEqual(82440)
    })
  })

  describe('part two', () => {

    describe('example', () => {
      it('should determine which board wins', async () => {
        const input = dayFourExampleInput()

        const game = parseInput(input)

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

    it('should determine which board wins', async () => {
      const input = dayFourRealInput()

      const game = parseInput(input)

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
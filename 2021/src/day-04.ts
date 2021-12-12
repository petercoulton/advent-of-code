type DrawnNumbers = number[]

type Square = {
  value: number
  marked: boolean
}

type Board = Square[][]

type Game = {
  numbers: DrawnNumbers
  boards: Board[]
}

type Result = {
  board: number
  number: number
  score: number
}

type NumberedBoard = { board: Board; num: number }

export const makeSquare = (n: number | string): Square => ({
  value: typeof n == 'string' ? parseInt(n) : n,
  marked: false,
})

const parseBoard = (rawBoard: string) =>
  rawBoard
    .trim()
    .split('\n')
    .map(rawLine => rawLine.trim().split(/\s+/).map(makeSquare))

export const parseInput = (input: string): Game => {
  const [rawNumbers, ...rawBoards] = input.split('\n\n')
  const numbers = rawNumbers
    .trim()
    .split(',')
    .map(n => parseInt(n))
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

const isWinner = (board: Board) =>
  hasWinningLines(board) || hasWinningColumns(board)

const sumUnmarkedSquares = (board: Board) =>
  board
    .flat()
    .filter(square => !square.marked)
    .reduce((sum, square) => sum + square.value, 0)

const calculateScore = (board: Board, number: number): number =>
  number * sumUnmarkedSquares(board)

const markSquares = (number: number) => (board: Board) =>
  board.map(line =>
    line.map(square => ({
      ...square,
      marked: square.value == number ? true : square.marked,
    }))
  )

const assignBoardNumber = (board: Board, i: number): NumberedBoard => ({
  board,
  num: i + 1,
})

const isNewWinner =
  (previousResults: Result[]) =>
  ({ board, num }: NumberedBoard) =>
    isWinner(board) && !previousResults.some(result => result.board == num)

const scoreBoard =
  (number: number) =>
  ({ board, num }: NumberedBoard) => ({
    board: num,
    number,
    score: calculateScore(board, number),
  })

export const play = ({ numbers, boards }: Game) =>
  numbers.reduce(
    (state, number) => {
      const { boards, results } = state

      const markedBoards = boards.map(markSquares(number))

      const newResults = markedBoards
        .map(assignBoardNumber)
        .filter(isNewWinner(results))
        .map(scoreBoard(number))
      return {
        ...state,
        boards: markedBoards,
        results: [...results, ...newResults],
      }
    },
    { boards, results: [] as Result[] }
  )

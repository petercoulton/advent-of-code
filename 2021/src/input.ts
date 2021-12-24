import fs from 'fs'
import path from 'path'
import dedent from 'ts-dedent'

type Day =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25

export const realInput = (day: Day) =>
  readInputFile(`day-${ String(day).padStart(2, '0') }.txt`)

const readInputFile = (filename: string) =>
  fs.readFileSync(path.join(__dirname, '..', 'data', filename), 'utf-8')

export const dayOneInput = () => realInput(1)
export const dayOneExampleInput = () =>
  dedent`
    199
    200
    208
    210
    200
    207
    240
    269
    260
    263`


export const dayTwoInput = () => realInput(2)

export const dayThreeInput = () => realInput(3)
export const dayThreeExampleInput = () =>
  dedent(`
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


export const dayFourRealInput = () => realInput(4)
export const dayFourExampleInput = () =>
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


export const dayFiveRealInput = () => realInput(5)
export const dayFiveExampleInput = () =>
  dedent(`0,9 -> 5,9
          8,0 -> 0,8
          9,4 -> 3,4
          2,2 -> 2,1
          7,0 -> 7,4
          6,4 -> 2,0
          0,9 -> 2,9
          3,4 -> 1,4
          0,0 -> 8,8
          5,5 -> 8,2`)


export const daySixInput = () => realInput(6)
export const daySixExample = () => `3,4,3,1,2`

export const daySevenInput = () => realInput(7)
export const daySevenExample = () => `16,1,2,0,4,2,7,1,2,14`


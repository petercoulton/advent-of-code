import fs from 'fs'
import path from 'path'

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


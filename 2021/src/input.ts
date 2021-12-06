import fs from 'fs'
import path from 'path'
import { EventData } from 'xstate'

const readInputFile = (filename: string) =>
  fs.readFileSync(path.join(__dirname, '__input__', filename), 'utf-8')

export const dayOneInput = () =>
  readInputFile('day-01.txt').split('\n').map(n => Number.parseInt(n))

export const dayTwoInput = <EventType>(): Array<[EventType, EventData]> =>
  readInputFile('day-02.txt').split('\n').map(line => {
    const [ command, dist ] = line.split(' ')
    return [
      command.toUpperCase() as unknown as EventType,
      { dist: Number.parseInt(dist) } as EventData,
    ]
  })

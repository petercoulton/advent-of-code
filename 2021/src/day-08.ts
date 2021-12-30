import { permute, unique } from './util'

const wires = ['a', 'b', 'c', 'd', 'e', 'f', 'g'] as const
const segments = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const
const numberSegments: Record<string, number> = {
  ABCEFG: 0,
  CF: 1,
  ACDEG: 2,
  ACDFG: 3,
  BCDF: 4,
  ABDFG: 5,
  ABDEFG: 6,
  ACF: 7,
  ABCDEFG: 8,
  ABCDFG: 9,
} as const

type Wire = typeof wires[number]
type SignalPattern = Wire[]
type Segment = typeof segments[number]
type CandidateSegments = Segment[]
type Wiring = Record<Wire, CandidateSegments>
export type Line = {
  lineNum?: number
  signalPatterns: SignalPattern[]
  outputSignals: SignalPattern[]
  wiring: Wiring
  outputNumber?: number
}

const blankWiring = (): Wiring => {
  return wires.reduce((wiring, wire) => {
    return {
      ...wiring,
      [wire]: [...segments],
    }
  }, {} as Wiring)
}

const parseSignals = (input: string): SignalPattern[] =>
  input
    .trim()
    .toLowerCase()
    .split(' ')
    .map(pattern => pattern.split('').sort() as SignalPattern)


const createLine = (rawSignalPatterns: string, rawOutputSignals: string) => ({
  signalPatterns: parseSignals(rawSignalPatterns),
  outputSignals: parseSignals(rawOutputSignals),
  wiring: blankWiring(),
})

export const parseLine = (line: string): Line => {
  const [rawSignalPatterns, rawOutputSignals] = line.split('|')
  return createLine(rawSignalPatterns, rawOutputSignals)
}

export const parseInput = (input: string): Line[] =>
  input
    .split('\n')
    .filter(line => line && line.length > 0)
    .flatMap((value, i) => {
      const line = parseLine(value.trim())
      line.lineNum = i
      return line
    })

const filterSegments = (segments: Segment[], ...excluded: Segment[]) =>
  segments.filter(segment => !excluded.includes(segment))

const exclude = (wiring: Wiring, wire: Wire): Wire[] =>
  Object.keys(wiring).filter(key => (key as Wire) != wire) as Wire[]

const eliminate = (
  wiring: Wiring,
  wire: Wire,
  ...segments: Segment[]
): Wiring => {
  let newWiring = { ...wiring }
  for (let w of exclude(wiring, wire)) {
    newWiring[w] = filterSegments(wiring[w], ...segments)
  }
  return newWiring
}

const assign = (line: Line, wires: Wire[], ...segments: Segment[]): Line => {
  const { wiring } = line
  let newWiring = wires.reduce((newWiring: Wiring, wire: Wire) =>
    eliminate(newWiring, wire, ...segments), wiring)

  wires.forEach((wire: Wire) => {
    newWiring[wire] = segments
  })

  return {
    ...line,
    wiring: newWiring,
  }
}

const decodeOutputNumbers = (line: Line): number | undefined => {
  const numbers = decodeSignals(line.outputSignals, line.wiring)

  if (numbers.every((values: number[]) => values.length == 1)) {
    return Number.parseInt(numbers.flat().join(''), 10)
  }
}

const signalStats = (signalPatterns: SignalPattern[]): Record<number, Wire[]> => {
  const stats = signalPatterns.reduce(
    (stats, pattern) =>
      pattern.reduce(
        (stats, wire) => ({
          ...stats,
          [wire]: (stats[wire] ?? 0) + 1,
        }),
        stats
      ),
    {} as Record<Wire, number>
  )

  let tally: Record<number, Wire[]> = {}
  for (const wire of wires) {
    const count = stats[wire]
    tally[count] = [wire, ...(tally[count] || [])].sort()
  }

  return tally
}

//
// Rules
//

const applyUniqueSignalsRule = (line: Line): Line =>
  line.signalPatterns.reduce((newLine: Line, pattern: SignalPattern) => {
    switch (pattern.length) {
      case 2:
        return assign(newLine, pattern, 'C', 'F')
      case 3:
        return assign(newLine, pattern, 'A', 'C', 'F')
      case 4:
        return assign(newLine, pattern, 'B', 'C', 'D', 'F')
      default:
        return newLine
    }
  }, line)


const applyWireFrequencyRule = (line: Line): Line => {
  const wireStats = signalStats(line.signalPatterns)
  let newLine = line
  newLine = assign(newLine, wireStats['4'], 'E')
  newLine = assign(newLine, wireStats['6'], 'B')
  newLine = assign(newLine, wireStats['9'], 'F')
  return newLine
}

const findUnresolvedConnections = (line: Line): Partial<Wiring> =>
  wires
    .map<[Wire, CandidateSegments]>(wire => [wire, line.wiring[wire]])
    .filter(([_, segments]) => segments.length > 1)
    .reduce(
      (connections, [wire, segments]) => ({
        ...connections,
        [wire]: segments,
      }),
      {}
    )

const applyInferredConnectionsRule = (line: Line): Line => {
  let newLine = line
  const unresolvedConnections = findUnresolvedConnections(line)
  const unresolvedWires: Wire[] = Object.keys(unresolvedConnections) as Wire[]
  
  let matches: Partial<Record<Wire, Set<Segment>>> = {}

  line.signalPatterns
    .map<[SignalPattern, CandidateSegments[]]>((signal: SignalPattern) => [
      signal,
      decodeSignalConnections(signal, line.wiring),
    ])
    .forEach(([signal, connections]) => {
      if (
        connections.length == 1 &&
        unresolvedWires.some((wire: Wire) => signal.includes(wire))
      ) {
        const [connection] = connections

        unresolvedWires.forEach((wire: Wire) => {
          const segments = unresolvedConnections[wire] || []
          if (signal.includes(wire)) {
            const candidateSegments = connection.filter((segment: Segment) =>
              segments.includes(segment)
            )

            if (candidateSegments.length == 1) {
              const [candidateSegment] = candidateSegments
              matches[wire] = (matches[wire] || new Set()).add(candidateSegment)
            }
          }
        })
      }
    })

  for (const [wire, segments] of Object.entries(matches)) {
    newLine = assign(newLine, [wire as Wire], ...segments)
  }

  return newLine
}

//
// Solve
//

export const solve = (line: Line): Line => {
  let puzzle = line

  puzzle = applyUniqueSignalsRule(puzzle)
  puzzle = applyWireFrequencyRule(puzzle)
  puzzle = applyInferredConnectionsRule(puzzle)

  if (isSolved(puzzle)) {
    puzzle.outputNumber = decodeOutputNumbers(puzzle)
  }

  return puzzle
}

export const isSolved = (line: Line): boolean => {
  return !!decodeOutputNumbers(line)
}

export const unSolved = (line: Line): boolean => !isSolved(line)

const sum = (values: number[]): number =>
  values.reduce((total, value) => total + value, 0)

export const sumOutputNumbers = (lines: Line[]): number =>
  sum(lines.map(line => line.outputNumber || 0))

const isValidConnection = (connections: string) => Object.keys(numberSegments).includes(connections)

const decodeSignalConnections = (signal: SignalPattern, wiring: Wiring): CandidateSegments[] => {
  const potentialConnections = signal.map((wire: Wire) => wiring[wire])
  return permute(potentialConnections)
    .map(connection => connection.sort().join('').toUpperCase())
    .filter(unique)
    .filter(isValidConnection)
    .map((connection) => connection.split('').map(value => value as Segment))
}

const decodeSignalPattern = (signal: SignalPattern, wiring: Wiring) => {
  const numbers = decodeSignalConnections(signal, wiring)
    .map((segments: CandidateSegments) => segments.join(''))
    .reduce(
      (acc, connection: string) => acc.add(numberSegments[connection]),
      new Set<number>()
    )

  return [...numbers].sort()
}

const decodeSignals = (signalPatterns: SignalPattern[], wiring: Wiring) =>
  signalPatterns.map(signalPattern => decodeSignalPattern(signalPattern, wiring))

const columns = (
  values: Array<number>,
  width: number,
  placeholder: string
): Array<number | string> => {
  const col = new Array(width).fill(placeholder)

  for (const value of values) {
    col[value] = value
  }

  return col
}

const displayWiring = (wiring: Wiring, padding: number = 9) => {
  console.log(`A B C D E F G`.padStart(padding + 15, ' '))
  let wire: Wire
  for (wire in wiring) {
    const wireStr = wire.padStart(padding, ' ')
    const possibleSegments = wiring[wire]
    console.log(
      `${wireStr}  ${segments
        .map(segment => (possibleSegments.includes(segment) ? segment : '·'))
        .join(' ')}  ${possibleSegments}`
    )
  }
  console.log()
}

const displaySignalStats = (signalPatterns: SignalPattern[]) => {
  const stats = signalStats(signalPatterns)
  for (let [key, value] of Object.entries(stats)) {
    console.log(`        ${key}  ${value}`)
  }
  console.log()
}

const displaySignals = (signals: SignalPattern[], wiring: Wiring, padding: number = 9) => {
  console.log(`0 1 2 3 4 5 6 7 8 9`.padStart(padding + 21, ' '))
  for (const signal of signals) {
    const pattern = signal.join('').padStart(padding, ' ')
    const possibleNumbers = decodeSignalPattern(signal, wiring)
    const value = columns(possibleNumbers, 10, '·').join(' ')
    console.log(`${pattern}  ${value}  ${possibleNumbers}`)
  }
  console.log()
}

const displayOutputNumbers = (outputNumber?: number) => {
  console.log()
  if (outputNumber) {
    console.log(`   Answer  ${outputNumber}`)
  } else {
    console.log(`   Answer  Not Solved`)
  }
  console.log()
}

export const display = ({ signalPatterns, outputSignals, wiring, outputNumber }: Line) => {
  displayOutputNumbers(outputNumber)
  displaySignals(outputSignals, wiring)
  displaySignals(signalPatterns, wiring)
  displayWiring(wiring)
  displaySignalStats(signalPatterns)
}


export const countOutputDigits = (input: string) =>
  input
    .split('\n')
    .filter(line => line && line.length > 0)
    .flatMap(line => {
      const [_, rawOutputValues] = line.trim().split('|')

      return rawOutputValues
        .trim()
        .split(' ')
        .filter(value => {
          switch (value.length) {
            case 2:
            case 3:
            case 4:
            case 7:
              return true
            default:
              return false
          }
        })
    }).length

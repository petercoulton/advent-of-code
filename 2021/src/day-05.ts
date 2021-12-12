export type Line = [x1: number, y1: number, x2: number, y2: number]

//
// Parse Input
//

export const parseInput = (input: string): Line[] =>
  input.split(`\n`).map(
    line =>
      line
        .split(` -> `)
        .map(point => point.trim().split(`,`).map(Number))
        .flat() as Line
  )

//
// Interpret Input
//

const len = ([x1, y1, x2, y2]: Line): number =>
  Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))

const normalize = ([x1, y1, x2, y2]: Line): [
  boolean,
  number,
  number,
  number,
  number
] => {
  const [xStart, xEnd] = x1 < x2 ? [x1, x2] : [x2, x1]
  const [yStart, yEnd] = y1 < y2 ? [y1, y2] : [y2, y1]
  const straight = xStart == xEnd || yStart == yEnd
  return [straight, xStart, yStart, xEnd, yEnd]
}

const plot = (x: number, y: number, pixels: Array<number>, w: number) =>
  (pixels[x + y * w] = pixels[x + y * w] + 1)

const plotDiagonalLine = (line: Line, pixels: Array<number>, w: number) => {
  const [x1, y1, x2, y2] = line

  const length = len(line)

  const dx = x1 < x2 ? 1 : -1
  const dy = y1 < y2 ? 1 : -1

  for (let i = 0; i <= length; i++) {
    const x = x1 + i * dx
    const y = y1 + i * dy
    plot(x, y, pixels, w)
  }
}

const plotStraightLine = (
  [x1, y1, x2, y2]: Line,
  pixels: Array<number>,
  w: number
) => {
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      plot(x, y, pixels, w)
    }
  }
}

const plotLine = (line: Line, pixels: Array<number>, w: number) => {
  const [straight, ...normalizedLine] = normalize(line)

  if (straight) {
    plotStraightLine(normalizedLine, pixels, w)
  } else {
    plotDiagonalLine(line, pixels, w)
  }

  return pixels
}

export const plotOceanFloor = (
  lines: Line[],
  width: number = 1000,
  height: number = 1000
): number[] => {
  const pixels = new Array<number>(width * height).fill(0)
  return lines.reduce((pixels, line) => plotLine(line, pixels, width), pixels)
}

export const countOverlappingPoints = (pixels: number[]): number =>
  pixels.reduce((count, v) => (v >= 2 ? count + 1 : count), 0)

export const drawDiagram = (
  pixels: Array<number>,
  w: number,
  h: number
): string => {
  const output: string[] = []

  for (let y = 0; y < h; y++) {
    output.push(
      pixels
        .slice(y * w, y * w + w)
        .map(p => (p == 0 ? `.` : p))
        .join(``)
    )
  }

  return output.join('\n')
}

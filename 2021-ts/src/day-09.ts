import colors from 'colors'

export type Height = number
export type Heightmap = Height[][]
type Coord = [x: number, y: number]
type FloorMap = {
  [coord: string]: Height
}

export const parseInput = (input: string): Heightmap =>
  input.trim().split(`\n`).map(parseLine)

export const parseLine = (line: string): Height[] =>
  line.trim().split('').map(height => Number.parseInt(height, 10))

export const findNeighbours = (heightmap: Heightmap, x: number, y: number): number[] => {
  const above = heightmap[y-1] || []
  const current = heightmap[y]
  const below = heightmap[y+1] || []

  return [
    above[x],
    current[x - 1],
    current[x + 1],
    below[x],
  ].filter(neighbour => neighbour !== undefined)
}

const isNextToLowPoint = (heightmap: Heightmap, x: number, y: number): boolean => {

  const checkNeighbour = (x: number, y: number): boolean => {
    if (x < 0 || y < 0) return false

    const row = heightmap[y] || []

    if (!row) return false

    const point = row[x]

    if (point === undefined) return false

    return isLowPoint(heightmap, point, x, y)
  }

  return [
    // checkNeighbour(x - 1, y - 1),
    checkNeighbour(x, y - 1),
    // checkNeighbour(x + 1, y - 1),

    checkNeighbour(x - 1, y),
    checkNeighbour(x + 1, y),

    // checkNeighbour(x - 1, y + 1),
    checkNeighbour(x, y + 1),
    // checkNeighbour(x + 1, y + 1),
  ].some(value => value)
}

const isLowPoint = (
  heightmap: Heightmap,
  point: number,
  x: number,
  y: number
): boolean =>
  findNeighbours(heightmap, x, y).every(neighbour => neighbour > point)

export const findLowPoints = (heightmap: Heightmap): number[] =>
  heightmap.reduce(
    (lowPoints, row, y) =>
      lowPoints.concat(
        row.filter((point, x) => isLowPoint(heightmap, point, x, y))
      ),
    []
  )


export const calculateRiskLevels = (heightmap: Heightmap): number[] =>
  findLowPoints(heightmap).map(point => point + 1)

export const calculateRiskLevel = (heightmap: Heightmap): number =>
  calculateRiskLevels(heightmap).reduce((sum, risk) => sum + risk, 0)

export const displayLowPoints = (heightmap: Heightmap) =>
  heightmap
    .map((row: number[], y) =>
      row.map((point: number, x) => {
        if (isLowPoint(heightmap, point, x, y)) {
          return colors.white(`${ point }`)
        }

        if (isNextToLowPoint(heightmap, x, y)) {
          return colors.yellow(`${ point }`)
        }

        return colors.dim(`${point}`)
      })
    )
    .forEach(row => console.log(row.map(point => point).join(``)))

export const buildFloorMap = (heightmap: Heightmap) =>
  heightmap.reduce<FloorMap>(
    (floorMap, row, y) =>
      row.reduce<FloorMap>(
        (floorMap, height, x) => ({
          ...floorMap,
          [[x, y].join()]: height,
        }),
        floorMap
      ),
    {}
  )

const neighbourCoords = ([x, y]: Coord): Array<Coord> => ([
  [x-1, y],
  [x+1, y],
  [x, y-1],
  [x, y+1],
])

const getHeight = (floorMap: FloorMap, coord: Coord): Height =>
  floorMap[coord.join()] === undefined ? 9 : floorMap[coord.join()]

const isLowPointFM = (floorMap: FloorMap, coord: Coord): boolean => {
  const height = getHeight(floorMap, coord)
  return neighbourCoords(coord)
    .map(coord => getHeight(floorMap, coord))
    .every(neighbour => height < neighbour)
}

const findBasinPoints = (floorMap: FloorMap, visited: string[], start: Coord): Coord[] => {
  return neighbourCoords(start)
    .filter(coord => getHeight(floorMap, coord) < 9)
    .filter(coord => !visited.includes(coord.join()))
    .flatMap(coord => {
      visited.push(coord.join())
      return [coord, ...findBasinPoints(floorMap, visited, coord)]
    })
}

export const findBasins = (floorMap: FloorMap) => {
  const lowPoints =
    Object.keys(floorMap)
          .map(key => key.split(',').map(Number) as Coord)
          .filter(coord => isLowPointFM(floorMap, coord))

  const visited: string[] = []
  return lowPoints.map(point => {
    return [point, ...findBasinPoints(floorMap, visited, point)]
  })
}

export const displayBasins = (heightmap: Heightmap) => {
  const floorMap = buildFloorMap(heightmap)
  const basins = findBasins(floorMap).map(basin => basin.map(coord => coord.join())).flat()
  heightmap
    .map((row: number[], y) =>
      row.map((height: number, x) => {
        if (height == 9) return colors.red(`${height}`)
        if (isLowPointFM(floorMap, [x, y])) return colors.white(`${height}`)
        if (basins.includes([x, y].join())) return colors.yellow(`${height}`)
        return colors.dim(`${height}`)
      })
    )
    .forEach(row => console.log(row.map(point => point).join(``)))
}
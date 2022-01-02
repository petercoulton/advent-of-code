import colors from 'colors'

export const permute = <T>(input: Array<T[]>): Array<T[]> => {
  if (input.length == 0) {
    return input
  }

  const [head] = input.slice(0, 1)
  const tail = permute(input.slice(1))

  return tail.length == 0
    ? head.map((h: T) => [h])
    : head.flatMap((h: T) => tail.map((ts: T[]) => [h, ...ts]))
}

export const unique = <T>(value: T, i: number, self: T[]) =>
  self.indexOf(value) === i


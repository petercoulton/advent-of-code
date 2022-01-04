import { permute } from '../util'

const stringify = (values: Array<string[]>): string =>
  values.map(variant => `(${variant.join('').trim()})`).join(',')

const unstringify = (value: string): Array<string[]> =>
  value.trim().split(',').map(elem => elem.trim().split('|'))

const example = (example: string, expected: string) => ({
  input: unstringify(example),
  expected: expected.trim(),
})

describe('permutations', () => {
  const cases = [
    example('             ', ' ()                                              '),
    example(' a           ', ' (a)                                             '),
    example(' a,b         ', ' (ab)                                            '),
    example(' a,b,c       ', ' (abc)                                           '),
    example(' a,a,a       ', ' (aaa)                                           '),
    example(' a,b,c,d     ', ' (abcd)                                          '),
    example(' a|b         ', ' (a),(b)                                         '),
    example(' a|b,a|b     ', ' (aa),(ab),(ba),(bb)                             '),
    example(' a|b,a|b,a|b ', ' (aaa),(aab),(aba),(abb),(baa),(bab),(bba),(bbb) '),
    example(' a|b,c|d     ', ' (ac),(ad),(bc),(bd)                             '),
    example(' a|b|c       ', ' (a),(b),(c)                                     '),
    example(' a|b|c,d|e|f ', ' (ad),(ae),(af),(bd),(be),(bf),(cd),(ce),(cf)    '),
    example(' a|b,c|d,e|f ', ' (ace),(acf),(ade),(adf),(bce),(bcf),(bde),(bdf) '),
    example(' a,b|c       ', ' (ab),(ac)                                       '),
  ]

  it.each(cases)('permute $example = $expected', ({ input, expected }) =>
    expect(stringify(permute(input))).toEqual(expected)
  )
})

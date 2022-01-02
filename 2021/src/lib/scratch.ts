import colors from 'colors'

export const scratch = (title: string, fn: () => void) => {
  console.log(` ${colors.green(title)} `.padStart(process.stdout.getWindowSize()[0], '-'), ``)
  fn()
  console.log()
}

export const xscratch = (title: string, fn: () => void) => {}

console.clear()

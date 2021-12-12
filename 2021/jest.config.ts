import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: [`./jest.setup.ts`],
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    }
  }
}


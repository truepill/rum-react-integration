export default {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test|unit).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: [['json', { file: 'coverage-summary.json' }]],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results',
        outputName: 'results.xml',
      },
    ],
  ],
}

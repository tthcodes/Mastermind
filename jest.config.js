export default {
  globalSetup: './jest-mongodb-setup.js',
  globalTeardown: './jest-mongodb-teardown.js',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.jsx'],
  transform: {},
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  }
}
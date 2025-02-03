const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

module.exports = createJestConfig({
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^next/(.*)$': '<rootDir>/__mocks__/next/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  
  // ✅ transform 설정 추가
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
});
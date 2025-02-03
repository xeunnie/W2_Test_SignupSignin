import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', '<rootDir>/'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    setupFilesAfterEnv: ['./jest.setup.ts'],

    // 추가된 커버리지 설정 (xeunnie-patch-9 브랜치 코드 통합)
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text-summary"], // Codecov 포맷 추가
}

export default createJestConfig(config)

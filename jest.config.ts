module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    collectCoverage: true, // 커버리지 리포트 활성화
    coverageDirectory: "coverage",
    coverageReporters: ["lcov", "text-summary"], // Codecov가 인식할 수 있도록 lcov 포맷 추가
    testEnvironment: "jsdom",
};

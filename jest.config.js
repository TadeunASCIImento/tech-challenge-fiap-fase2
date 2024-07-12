module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    testMatch: ['**/tests/**/*.test.ts'],
    transformIgnorePatterns: ['/node_modules/'],
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,ts,jsx,tsx}",
      "!src/**/*.d.ts",
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"]
  };
  
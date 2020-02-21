module.exports = {
  roots: ["<rootDir>/__test__"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js", "node"],
  collectCoverage: true,
  coverageReporters: ["lcov"],
  coverageDirectory: "./coverage",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 70,
      lines: 80,
      statements: 80
    }
  }
};

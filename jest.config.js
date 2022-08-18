const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/", "src"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
};

module.exports = createJestConfig(customJestConfig);

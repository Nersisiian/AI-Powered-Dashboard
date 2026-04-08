module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>", "<rootDir>/../tests"],
  setupFilesAfterEnv: ["<rootDir>/src/testSetup.js"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".jsx"],
  testMatch: ["<rootDir>/../tests/frontend_tests.js"],
  moduleFileExtensions: ["js", "jsx"],
};


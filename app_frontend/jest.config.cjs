module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/src/testSetup.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".jsx"],
  testMatch: ["<rootDir>/tests/frontend_tests.js"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
};


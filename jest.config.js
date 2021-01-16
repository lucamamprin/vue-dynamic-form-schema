// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/",
  ],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    "node_modules",
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "json",
    "vue",
  ],

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/test/",
  ],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
  ],


  // A map from regular expressions to paths to transformers
  "transform": {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
};

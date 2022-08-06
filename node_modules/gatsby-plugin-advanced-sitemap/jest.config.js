// jest.config.js
module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-transformer.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `static`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFilesAfterEnv: ['./jest.setup.js']
}
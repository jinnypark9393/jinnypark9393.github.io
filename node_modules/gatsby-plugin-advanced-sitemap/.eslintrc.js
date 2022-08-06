module.exports = {
  plugins: ['ghost', 'jest'],
  extends: [
    'plugin:ghost/node',
  ],
  rules: {
    "no-console": [
      "error",
      {
        "allow": [
          "info",
          "warn",
          "error"
        ]
      }
    ],
  },
  overrides: [{
    "files": [
      "**/*.spec.js",
      "**/*.test.js"
    ],
    "env": {
      "jest": true
    }
  }]
};
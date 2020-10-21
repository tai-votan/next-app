// module.exports = {
//   extends: [require.resolve('@umijs/fabric/dist/eslint')],
//   parserOptions: {
//     ecmaVersion: 2020
//   },
//   rules: {
//     "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
//     "eslint-plugin/consistent-output": "error",
//     "eslint-plugin/no-deprecated-context-methods": "error",
//     "eslint-plugin/prefer-output-null": "error",
//     "eslint-plugin/prefer-placeholders": "error",
//     "eslint-plugin/report-message-format": ["error", "[^a-z].*\\.$"],
//     "eslint-plugin/require-meta-docs-description": "error",
//     "eslint-plugin/require-meta-type": "error",
//     "eslint-plugin/test-case-property-ordering": [
//       "error",
//       [
//         "filename",
//         "code",
//         "output",
//         "options",
//         "parser",
//         "parserOptions",
//         "globals",
//         "env",
//         "errors"
//       ]
//     ],
//     "eslint-plugin/test-case-shorthand-strings": "error",
//     "internal-rules/multiline-comment-style": "error"
//   },
// };

module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: "module", // Allows using import/export statements
    ecmaFeatures: {
      jsx: true // Enable JSX since we're using React
    }
  },
  settings: {
    react: {
      version: "detect" // Automatically detect the react version
    }
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    require.resolve("@umijs/fabric/dist/eslint"),
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended" // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }] // Use our .prettierrc file as source
  }
};

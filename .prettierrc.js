const fabric = require("@umijs/fabric");

module.exports = {
  ...fabric.prettier,
  semi: true,
  tabWidth: 2,
  printWidth: 140,
  singleQuote: false,
  trailingComma: "none",
  jsxBracketSameLine: true
};

const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-order",
  ],
  "rules": {
    "named-grid-areas-no-invalid": false
  }
};

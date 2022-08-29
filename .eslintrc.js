module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "plugin:react/recommended",
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    // "ecmaFeatures": {
    //   "jsx": true,
    // }
  },
  "plugins": [
    "react",
    "@typescript-eslint",
  ],
  "rules": {
    "semi": ["warn", "never"],
    "indent": ["warn", 2],
    "comma-dangle": ["warn", "always-multiline"],
  },
}

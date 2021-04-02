module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};

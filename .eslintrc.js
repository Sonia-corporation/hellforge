module.exports = {
  env: {
    browser: false,
    es2020: true,
  },
  extends: [
    "airbnb-base",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    semi: ["warn", "never"],
    quotes: ["warn", "double"],
  },
}

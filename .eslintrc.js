module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript"],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // Style
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "arrow-parens": "off",
    "comma-dangle": "off",
    "space-before-function-paren": "off",

    // Quality
    "no-use-before-define": "warn",
    "require-await": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};

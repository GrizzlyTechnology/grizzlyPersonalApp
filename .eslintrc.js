// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    "vue"
  ],
  rules: {
    "vue/no-parsing-error": 0,
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "semi": ["error", "always"],
    "no-console": process.env.NODE_ENV === 'production' ?2 : 0,
    "no-empty": 2,
    "no-eq-null": 2,
    "no-new": 0,
    "no-fallthrough": 0,
    "no-unreachable": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};

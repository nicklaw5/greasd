module.exports = {
  "extends": "airbnb-base",
  "installedESLint": true,
  "env": {
      "browser": true,
      "es6": true,
      "jquery": true,
  },
  "parserOptions": {
      "ecmaVersion": 6,
      "ecmaFeatures": {
          "impliedStrict": true,
      },
  },
  "rules": {
    "semi": ["error", "never"],
    "no-plusplus": ["error", {
      "allowForLoopAfterthoughts": true
    }],
    "space-before-function-paren": ["error", "always"],
  },
  "root": true,
};

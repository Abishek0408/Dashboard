module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/function-component-definition": "off",
    "import/extensions": "off",
    "react/prop-types": "off",
    "linebreak-style": "off",
    "react/state-in-constructor": "off",
    "import/prefer-default-export": "off",
    "max-len": ["error", { code: 120 }],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "no-underscore-dangle": [
      "error",
      { allow: ["_d", "_dh", "_h", "_id", "_m", "_n", "_t", "_text"] },
    ],
    "object-curly-newline": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to", "hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],
  },
};

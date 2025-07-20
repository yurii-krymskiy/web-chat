import eslintPluginPrettier from "eslint-plugin-prettier";
import pluginNode from "eslint-plugin-n";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      node: pluginNode,
      import: importPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "spaced-comment": "off",
      "no-console": "warn",
      "no-undef": "error",
      "consistent-return": "off",
      "import/no-unresolved": "error",
      "func-names": "off",
      "object-shorthand": "off",
      "no-process-exit": "off",
      "no-param-reassign": "off",
      "no-return-await": "off",
      "no-underscore-dangle": "off",
      "class-methods-use-this": "off",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "no-unused-vars": ["error", { argsIgnorePattern: "req|res|next|val" }],
    },
  },
];

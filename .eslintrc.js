module.exports = {
  root: true,

  plugins: ["prettier", "react-native"],

  // Enable new features (such as class properties)
  parser: "babel-eslint",

  extends: [
    // Airbnb's React style guide
    "airbnb",
    "airbnb/hooks",

    // Does 3 things:
    //  1. Turns prettier rules into eslint rules
    //  2. Disables eslint rules that conflict with prettier
    //  3. Classifies prettier rules as errors
    "plugin:prettier/recommended",

    // Turns off style-specific rules for different plugins
    "prettier/react",
  ],

  // All custom rule overrides go here. Each override should include an explanation
  // for why it is applied
  rules: {
    // Turn off this rule to allow StyleSheets to be placed at the bottom of files
    // It might be good to disable this in the future and strip out StyleSheets
    "no-use-before-define": "off",

    // Prevents unused styling rules
    "react-native/no-unused-styles": "error",

    // Enforces the use of colors from the style config
    "react-native/no-color-literals": "error",

    // Prevents inline styles
    "react-native/no-inline-styles": "error",

    // Sorts styles in alphabetical order
    "react-native/sort-styles": "error",

    // Prevents style arrays with only one element
    "react-native/no-single-element-style-arrays": "error",

    // Allows you to reassign the properties of function parameters
    "no-param-reassign": ["error", { props: false }],

    // Allows us to use static class fields
    "react/static-property-placement": ["error", "static public field"],

    // Allows us to use class fields for constructors
    "react/state-in-constructor": ["error", "never"],

    // Allows us to use the Text.propTypes.style to validate text styles
    "react/forbid-foreign-prop-types": "off",
  },

  // Allows the import resolver to locate the main file for `react-native-screens`
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".json", ".native.js"],
      },
    },
  },
};

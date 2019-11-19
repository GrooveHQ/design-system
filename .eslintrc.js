const path = require('path')
module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'import', 'jsx-a11y', 'react', 'react-hooks', 'json', 'html'],
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  rules: {
    // This rule wants you to write fragments as
    // <><Foo /></> instead of <Fragment><Foo /></Fragment>
    // This makes the code harder to understand with no benefit
    'react/jsx-fragments': 0,
    // We have plenty of utility classes that should't use default export
    // right now the project is rather empty resulting in this rule flagging
    // incorrectly regularly.
    'import/prefer-default-export': 0,
    // Aim of this rule is to ensure you have support for users with disabilities
    // This is out of scope for now, and should be a bigger conversation to ensure
    // propert support in the whole application
    'jsx-a11y/click-events-have-key-events': 0,
    'class-methods-use-this': 0,
    // his linting rule adds no stylistic or performance value.
    'react/state-in-constructor': 0,
    'no-plusplus': 0,
    // This is lines up with how linting is configured in our other project
    'react/static-property-placement': ['error', 'static public field'],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': [
      'error',
      {
        arrow: false,
      },
    ],
    'react/prop-types': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        parser: 'babel',
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: false,
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.stories.js'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}

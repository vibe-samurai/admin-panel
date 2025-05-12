module.exports = {
  extends: [
    '@it-incubator/stylelint-config',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier-scss'
  ],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['forward', 'use', 'mixin', 'include']
      }
    ],
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/at-import-partial-extension': null,
    'scss/at-mixin-pattern': null,
    'scss/operator-no-newline-after': null,
    'custom-property-pattern': null
  }
};
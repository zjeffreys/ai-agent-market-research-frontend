const requireCitationRule = require('./eslint-rules/require-citation-in-blueprint');

module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: {
    blueprint: {
      rules: {
        'require-citation': requireCitationRule,
      },
    },
  },
  rules: {
    'blueprint/require-citation': 'warn',
  },
};

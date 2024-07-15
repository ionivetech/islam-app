import tailwindcss from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['node_modules/**'],
    plugins: {
      tailwindcss,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'never', normal: 'always', component: 'always' },
          svg: 'always',
          math: 'always',
        },
      ],
      // Stylistic rules
      'vue/max-attributes-per-line': ['error', {
        'singleline': 1,
        'multiline': 1
      }],
      'vue/html-indent': ['error', 2, {
        'attribute': 1,
        'baseIndent': 1,
        'closeBracket': 0,
        'alignAttributesVertically': true,
        'ignores': []
      }],
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'always'
      }],
      'vue/multiline-html-element-content-newline': ['error', {
        'allowEmptyLines': false
      }],
      'vue/singleline-html-element-content-newline': ['error', {
        'ignoreWhenNoAttributes': true,
        'ignoreWhenEmpty': true
      }],
      'indent': ['error', 2],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      // Tailwindcss
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
    },
  }
)

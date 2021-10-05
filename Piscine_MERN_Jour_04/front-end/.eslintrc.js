module.exports = {
  'root': true,
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
    'browser': true
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module'
  },
  'rules': {
    semi: ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'VariableDeclarator': 1,
      'outerIIFEBody': 1,
      'MemberExpression': 1,
      'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
      'FunctionExpression': { 'parameters': 1, 'body': 1 },
      'CallExpression': { 'arguments': 1 },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 1,
      'flatTernaryExpressions': false,
      'ignoreComments': false,
      'ignoredNodes': ['TemplateLiteral *']
    }],
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': false }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'no-const-assign': 'error',
    'prefer-const': ['error', {'destructuring': 'all'}],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': true }],
    'no-var': 'error',
    'react/prop-types': 0
  }
};

// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
      parser: 'babel-eslint'
  },
  env: {
      browser: true
  },
  extends: [
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential',
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  globals: {
      WeixinJSBridge: true,
      VERSION: true,
      gncitys: true,
      pycitys: true,
      gjcitys: true,
      gjcity: true,
      provinceArray: true,
      MPing: true,
      getJdEid: true,
      pin: true,
      wx: true
  },
  // add your custom rules here
  rules: {
      // allow async-await
      'generator-star-spacing': 'off',
      'no-new': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // [警告]要使用分号
      semi: ['warn', 'always'],
      // [关闭]每个 var 关键字单独声明一个变量
      'one-var': 'off',
      // 对缩进的详细设置
      indent: [
          'error',
          4,
          { VariableDeclarator: { var: 2, let: 2, const: 3 } }
      ],
      // [报错]方法声明的方法名与圆括号之间不空格
      'space-before-function-paren': ['error', 'never'],
      // 避免在mustache中'<'报错   避免标签自动闭合后报错'</'
      'vue/no-parsing-error': [
          2,
          {
              'invalid-first-character-of-tag-name': false,
              'x-invalid-end-tag': false
          }
      ],
      'no-extra-boolean-cast': 'off'
  }
};

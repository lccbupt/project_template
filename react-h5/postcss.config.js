/**
 * 配置postcss
 * 在wabpack.base.js内配置时 postcss-pxtorem无效？不知是何原因
 * 单独使用配置文件，px可以成功转化成rem
 */
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100,
      propList: ['*'],
      unitPrecision: 3,
    }
  }
}
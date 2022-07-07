// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // rootValue设置设计稿亮出来的尺寸除以多少 设置基准字体大小
      rootValue ({ file }) {
        // 只有我们自己的写的样式才除以75转换成rem,其他的vant的内置样式
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}

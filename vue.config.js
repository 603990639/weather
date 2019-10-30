module.exports = {

  devServer: {
    proxy: {
      '/api': {
        // http://api.zhuishushenqi.com/cats/lv2/statistics /api/cats/lv2/statistics
        // target: 'http://api.zhuishushenqi.com',
        target: 'https://api.heweather.net',
        // /api/s6/weather/forecast?location=北京&key=81e2bad677d1424d92e0a7cb36daff82
        changeOrigin: true,
        pathRewrite: { // 路径重写
          '^/api': '' // rewrite path
          // 路径重写之后 /api 被替换成了空字符 请求 "/dmzj/recommend.json" => http://v2.api.dmzj.com/recommend.json
        }
      },
      '/search': {
        // target: 'http://api.zhuishushenqi.com',
        target: 'https://search.heweather.net',
        // /search/top?group=cn&number=20&key=81e2bad677d1424d92e0a7cb36daff82
        changeOrigin: true,
        pathRewrite: { // 路径重写
          '^/search': ''
        }
      },
      '/qq': {
        // target: 'http://api.zhuishushenqi.com',
        target: 'https://apis.map.qq.com',
        // /qq/ws/location/v1/ip?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77
        changeOrigin: true,
        pathRewrite: { // 路径重写
          '^/qq': ''
        }
      }

    }
  }

}
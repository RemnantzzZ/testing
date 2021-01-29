const path=require("path")
function resolve(dir) {
    return path.join(__dirname, dir)
  }
module.exports = {
    outputDir:'dist',
    assetsDir:'static',
    indexPath:'index.html',
    publicPath:'/pdmkanban',
    devServer:{
        hot:true,
        proxy:{
            "/api":{
                target:"http://192.168.0.110/api",
                changeOrigin:true,
                pathRewrite:{
                    "^/api" : ""
                }
            },
            "/auth":{
                target:"http://192.168.0.110/auth",
                changeOrigin:true,
                pathRewrite:{
                    "^/auth" : ""
                }
            }
        }
    },
    chainWebpack(config) {
        config.plugin('html').tap(args => {
          args[0].title = ''
          return args
        }),
          config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()
      },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/assets/less/antReset.less")]
        }
    },
    
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    lintOnSave: false

}

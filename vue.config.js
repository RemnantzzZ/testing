const path=require("path")
module.exports = {
    outputDir:'dist',
    assetsDir:'static',
    indexPath:'index.html',
    publicPath:'/pdmkanban/',
    devServer:{
        port:8081,
        hot:true,
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

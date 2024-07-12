const path = require('path')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode:'development',
    entry:{
        // 这两个 chunk 重复引用了 lodash
        index:'./src/index.js',
        // another:'./src/another-module.js'
        // 解决：入口依赖
        // index:{
        //     import:'./src/index.js',
        //     dependOn:'shared'
        // },
        // another:{
        //     import:'./src/another-module.js',
        //     dependOn:'shared'
        // },
        // shared:'lodash'
    },
    // 追踪错误与警告在源代码中的原始位置
    // !!!!不要在生产环境中使用
    devtool:'inline-source-map',
    // 使用plugin 
    plugins:[
        // 生成index.html文件并自动引入bundle.js文件
        // 向 HTML 动态添加 bundle
        new HtmlWebpackPlugin({
            title:'Development'
        }),
        new BundleAnalyzerPlugin()
    ],
    devServer:{
        static:'./dist'
    },
    // optimization:{
    //     // 在一个 HTML 页面上使用多个入口起点
    //    // runtimeChunk:'single',
    // 将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
    //     splitChunks:{
    //         chunks:'all',
    //     }
    // },
    output:{
        filename:'[name].bundle.js',
        path: path.resolve(__dirname,'dist'),
        // 清除dist文件夹中不要的旧文件
        clean:true
    },
    // 对除了js的其他文件进行处理
    module:{
        rules:[
            // 处理import的css文件
            {
                test:/\.css$/i,
                // 确保先后顺序 会链式调用
                use:['style-loader','css-loader']
            },
            // 处理import的图片资源
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type:'asset/resource',
            },
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                    parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                    parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },

        ]
    }
}
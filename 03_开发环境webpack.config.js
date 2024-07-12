const path = require('path')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:{
        index:'./src/index.js',
        print:'./src/print.js'
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
        })
    ],

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
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    plugins:[
        // 生成index.html文件并自动引入bundle.js文件
        // 向 HTML 动态添加 bundle
        new HtmlWebpackPlugin({
            title:'构建性能'
        }),
    ],
    output:{
        // [contenthash] 将根据资源内容创建唯一哈希值。当资源内容发生变化时，[contenthash] 也会发生变化。
        filename:'[name].[contenthash].js',
        path: path.resolve(__dirname,'dist'),
        // 清除dist文件夹中不要的旧文件
        clean:true
    },
    module:{
        rules:[
            {
                // 将 loader 应用于最少数量的必要模块
                // 使用 include 字段将 loader 应用在实际需要将其转换的模块
                test: /\.js$/,
                include: path.resolve(__dirname,'src'),
                loader: 'babel-loader'
            }
        ]
    }
}
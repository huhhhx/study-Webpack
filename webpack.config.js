const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    plugins:[
        // 生成index.html文件并自动引入bundle.js文件
        // 向 HTML 动态添加 bundle
        new HtmlWebpackPlugin({
            title:'caching'
        }),
    ],
    output:{
        // [contenthash] 将根据资源内容创建唯一哈希值。当资源内容发生变化时，[contenthash] 也会发生变化。
        filename:'[name].[contenthash].js',
        path: path.resolve(__dirname,'dist'),
        // 清除dist文件夹中不要的旧文件
        clean:true
    },
    optimization: {
        // 所有 chunk 创建一个 runtime bundle
        runtimeChunk: 'single',
        splitChunks:{
            // 控制多次构建，vendor 的哈希值都应保持一致
            moduleIds:"deterministic",
            // 由于像 lodash 或 react 这样的第三方库很少像本地源代码一样频繁修改，
            // 因此通常推荐将第三方库提取到单独的 vendor chunk 中。
            // 这一步将减少客户端对服务器的请求，同时保证自身代码与服务器一致。
            cacheGroups:{
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader'
            }
        ]
    }
}
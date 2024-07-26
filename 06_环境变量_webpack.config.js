const path = require('path');

module.exports = (env)=>{
    console.log('Goal:',env.goal); // 'local'
    console.log('Production',env.production)  // true

    return {
        entry:'./src/index.js',
        output:{
            filename:'bundle.js',
            path: path.resolve(__dirname,'dist')
        }
    }
}
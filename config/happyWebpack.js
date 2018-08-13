const happyWebpack = require('happypack');
const os = require('os');
const happyThreadPool = happyWebpack.ThreadPool({ size: os.cpus().length });

module.exports = [
    new happyWebpack({
        id: 'happyTs',
        threadPool: happyThreadPool,//设置happy的线程池
        verbose: true, // 输出日志
        loaders: [{
            path: 'ts-loader',
            query: {
                happyPackMode: true
            }
        }]
    }) 
];
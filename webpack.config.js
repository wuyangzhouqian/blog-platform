// 获取webpack的参数
const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const mode = argv.mode || 'development';
const _config = require(`./config/webpack.${mode}.js`);

const glob = require('glob');
const _entry = {};
const plugins = [];

//获取happypack的实例
const HappyWebpackPlugin = require('./config/happyWebpack');

// 获取所有的入口文件
const files = glob.sync('./src/webapp/views/**/*.ts');

for (let item of files) {
    if (/.+\/([a-zA-Z]+)(\.entry\.ts$)/g.test(item)) {
        _entry[`${RegExp.$1}`] = item;
    }
}

const baseConfig = {
    entry: _entry,
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'happypack/loader?id=happyTs'
        }]
    },
    plugins: [
        ...plugins,
        ...HappyWebpackPlugin
    ],
    resolve: {
        extensions: ['.ts', '.css']
    }
};

module.exports = merge(baseConfig, _config);
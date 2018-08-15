// 获取webpack的参数
const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const mode = argv.mode || 'development';
const _config = require(`./config/webpack.${mode}.js`);
const modeflg = mode == 'production';
const glob = require('glob');
const entry = {};
const plugins = [];

//获取happypack的实例u
const HappyWebpackPlugin = require('./config/happyWebpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入自定义webpack的插件
const HtmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin');

const { join } = require('path');

// 获取所有的入口文件
const files = glob.sync('./src/webapp/views/**/*.ts');
for (let item of files) {
    if (/.+\/([a-zA-Z]+)-([a-zA-Z]+)(\.ts$)/g.test(item)) {
        let _entry = RegExp.$1;
        let _template = RegExp.$2;
        entry[`${_entry}`] = item;
        plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${_entry}/pages/${_template}.html`,
            template: `src/webapp/views/${_entry}/pages/${_template}.html`,
            inject: false,
            minify: {
                collapseWhitespace: modeflg,
                removeAttributeQuotes: modeflg //删除注释
            },

        }));
    }
}

const baseConfig = {
    entry: entry,
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'happypack/loader?id=happyTs'
        }]
    },
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    plugins: [
        ...plugins,
        ...HappyWebpackPlugin,
        new HtmlAfterWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.css']
    }
};

module.exports = merge(baseConfig, _config);
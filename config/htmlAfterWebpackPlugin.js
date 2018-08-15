const pluginName = 'htmlAfterWebpackPlugin';
const assetHelp = data => {
    let [css, js] = [[], []];

    const dir = {
        js: item => `<script src='${item}'></script>`,
        css: item => `<link rel='stylesheet' href='${item}'>`
    };

    for (let jsItem of data.js) {
        js.push(dir.js(jsItem));
    }

    for (let cssItem of data.css) {
        css.push(dir.css(cssItem));
    }

    return {
        css,
        js
    };
};

class HtmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
                let html = htmlPluginData.html;
                const result = assetHelp(htmlPluginData.assets);
                html = html.replace('<!--injectcss-->', result.css.join(''));
                html = html.replace('<!--injectjs-->', result.js.join(''));
                htmlPluginData.html = html;
            });
        });
    }
}

module.exports = HtmlAfterWebpackPlugin;
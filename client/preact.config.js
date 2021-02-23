module.exports = function (config, env, helpers) {
    let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
    let babelConfig = rule.options;
    // Without 'transform-async-to-generator', graphql-ws fails to compile with an "Unsyntactic break"
    babelConfig.presets[0][1].exclude = [];
    babelConfig.presets[0][1].targets.browsers = ["supports async-functions and supports es6-module"];
    babelConfig.plugins = babelConfig.plugins.filter(function (f) { return !(typeof f == "object" && typeof f[0] == "string" && f[0].endsWith("node_modules/fast-async/plugin.js")); });

    if (config.devServer) {
        babelConfig.plugins.unshift("@babel/transform-react-jsx-source");
        config.devServer.proxy = [
            {
                path: ['/graphql', '/wsgraphql'],
                target: 'http://localhost:80',
                ws: true
            }
        ];
    }
};
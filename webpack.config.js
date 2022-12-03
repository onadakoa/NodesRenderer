const htmlplugin = require("html-webpack-plugin")
const miniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"]
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: ["babel-loader"], exclude: /node_modules/ },
            { test: /\.(ts|tsx)$/, use: ["ts-loader"], exclude: /node_modules/ },
            { test: /\.css$/, use: [miniCssExtractPlugin.loader, "css-loader"], exclude: /node_modules/ },
        ]
    },
    plugins: [
        new htmlplugin({ template: "./src/template.html" }),
        new miniCssExtractPlugin()
    ]
}
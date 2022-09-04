const path = require('path');
const miniCss = require('mini-css-extract-plugin');
// const minify = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "./src"),
    dist: path.join(__dirname, "./dist"),
    assets: "assets/",
};

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        app: `${PATHS.src}/js`,
    },
    output: {
        path: PATHS.dist,
        filename: `[name].js`,
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.txt$/, use: 'raw-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    // "style-loader",
                    miniCss.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    }


                ]
            },
            {
                test: /\.css$/,
                use: [
                    miniCss.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(jpeg|jpg|gif|svg|png|ico)$/,
                // type: 'asset/inline',
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}imgs/[name][ext]`,
                }
            }
        ]
    },
    plugins: [
        new miniCss({
            filename: `[name].css`
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: "./index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.src}/imgs`, to: `${PATHS.dist}/imgs` },
            ],
        }),
    ]

}
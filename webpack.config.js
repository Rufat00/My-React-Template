const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");

let target = "web";
let devtool = "source-map";
const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./public/index.html",
    }),
];

if (process.env.NODE_ENV === "production") {
    target = "browserslist";
    devtool = false;
} else {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    target: target,

    entry: "./src/index",

    output: {
        filename: "index.js",
        path: path.join(__dirname, "build"),
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "/" },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: "asset/resource",
            },
        ],
    },

    plugins: plugins,

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },

    devServer: {
        port: 3000,
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, "build"),
        },
        client: {
            overlay: {
                errors: true,
                warnings: true,
            },
            progress: false,
        },
        historyApiFallback: true,
    },

    devtool: devtool,
};

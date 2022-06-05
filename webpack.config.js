const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

let target = "web";
let devtool = "source-map";
const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
        patterns: [
            {
                from: "public/**",
                to: ".",
                noErrorOnMissing: true,
                globOptions: {
                    ignore: ["**/public/index.html"],
                },
            },
        ],
    }),
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
        filename: "[name].js",
        path: path.join(__dirname, "build"),
        chunkFilename: "[id].[chunkhash].js",
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

    optimization: {
        flagIncludedChunks: true,
        mangleExports: true,
        mangleWasmImports: true,
        mergeDuplicateChunks: true,
        providedExports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        providedExports: true,
        usedExports: true,
        moduleIds: "size",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendore",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
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

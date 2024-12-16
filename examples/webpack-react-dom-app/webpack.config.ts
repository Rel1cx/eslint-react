import path from "node:path";
import url from "node:url";

import DotEnv from "dotenv-webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

import "webpack-dev-server";

const dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default {
  entry: "./src/main.ts",
  cache: true,
  output: {
    path: path.resolve(dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|webp|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DotEnv(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.png",
    }),
    new ESLintPlugin({ configType: "flat" }),
  ],
  devServer: {
    static: {
      directory: path.join(dirname, "dist"),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
} satisfies webpack.Configuration;

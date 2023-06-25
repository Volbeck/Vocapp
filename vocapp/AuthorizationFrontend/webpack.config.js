const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/AuthorizationFrontend/js"),
    filename: 'main.[contenthash].js',
    clean: true
  },
  module: {
    rules: [

        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        },
        {
            test: /\.(c|sa|sc)ss$/i,
            exclude: /node_modules/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [require('postcss-preset-env')],
                  },
                },
              },

              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
        },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './templates/AuthorizationFrontend/rawTemplate.html', // Путь к вашему EJS-шаблону
      inject: 'body',
      filename: '../../../templates/AuthorizationFrontend/index.html'
    }),
  ],
};
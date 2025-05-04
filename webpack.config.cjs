const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/index.tsx',
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('./public/index.html'),
    }),
    new ReactServerWebpackPlugin({ isServer: false }),
  ],
  watchOptions: {
    ignored: ["./public", "./dist"],
  },
}

const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackCDNPlugin = require('@q/webpack4-qcdn-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: "js/[name].[chunkhash:16].js",
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist']
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: true
      }
    }),
    new WebpackCDNPlugin({
      keepLocalFiles: false,
      keepSourcemaps: false,
      backupHTMLFiles: true,
      manifestFilename: 'manifest.json',
      assetMappingVariable: 'webpackAssetMappings'
    })
  ]
});
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: 'index.html',
      }
  ),
  new CopyPlugin({
    patterns: [
      { from: 'js', to: path.resolve(__dirname, './dist/js') },
      { from: 'images', to: path.resolve(__dirname, './dist/images') },
      { from: 'meta', to: path.resolve(__dirname, './dist/meta') },
      { from: 'sounds', to: path.resolve(__dirname, './dist/sounds') },
      { from: 'style', to: path.resolve(__dirname, './dist/style') },
    ],
  }),

]
}
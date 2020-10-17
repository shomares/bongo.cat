var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [new HtmlWebpackPlugin(
    {
      filename: 'index.html',
      template: 'index.html',
    }
  ),
  new CopyPlugin(
    [
      { from: 'js/lowLag.js', to: path.resolve(__dirname, './dist/js') },
      { from: 'js/sm2/js/soundmanager2-nodebug-jsmin.js', to: path.resolve(__dirname, './dist/js') },
      { from: 'js/core.js', to: path.resolve(__dirname, './dist/js') },
      { from: 'images/*', to: path.resolve(__dirname, './dist') },
      { from: 'meta/*', to: path.resolve(__dirname, './dist') },
      { from: 'sounds/*', to: path.resolve(__dirname, './dist') },
      { from: 'style/*', to: path.resolve(__dirname, './dist') },
    ],
  ),


  ]
}
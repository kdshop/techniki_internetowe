const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    mainStyle: './src/style/main.scss',
    indexStyle: './src/style/index.scss',
    gallery: './src/script/gallery.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'src/index.html',
      chunks: ['mainStyle', 'indexStyle']
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: 'src/contact.html',
      chunks: ['mainStyle']
    }),
    new HtmlWebpackPlugin({
      filename: "gallery.html",
      template: 'src/gallery.html',
      chunks: ['mainStyle']
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ],
  },
  resolve: {
    extensions: [ '.js' ]
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: './src/assets',
  },
  performance: {
    hints: false,
  },
};

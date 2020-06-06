const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    mainCSS: './src/style/main.scss',
    indexCSS: './src/style/index.scss',
    contactCSS: './src/style/contact.scss',
    galleryCSS: './src/style/gallery.scss',
    galleryJS: './src/script/gallery.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'src/index.html',
      chunks: ['mainCSS', 'indexCSS']
    }),
    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: 'src/contact.html',
      chunks: ['mainCSS', 'contactCSS']
    }),
    new HtmlWebpackPlugin({
      filename: "gallery.html",
      template: 'src/gallery.html',
      chunks: ['mainCSS', 'galleryCSS', 'galleryJS']
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

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.coffee',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'v-localize.js',
    libraryTarget: 'umd',
    library: 'Localize',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: [
          {
            loader: 'coffee-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true,
      }),
    ]
  }
}

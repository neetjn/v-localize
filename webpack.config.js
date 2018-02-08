const path = require('path')
const webpack = require('webpack')

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
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // })
  ],
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: [
          {
            loader: 'coffee-loader',
            options: {
              sourceMap: true,
              transpile: {
                presets: ['env']
              }
            }
          }
        ]
      }
    ]
  }
}

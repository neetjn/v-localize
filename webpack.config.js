const path = require('path')

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
  }
}

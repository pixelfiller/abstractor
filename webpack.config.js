let path = require('path');
let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  }
};
module.exports = (env, options) => {
  let production = options.mode === 'production';
  config.devtool = production
                    ? false
                    : 'eval-sourcemap';
  return config;
}

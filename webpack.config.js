const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry : {
    '/srv/server': './src/srv/server.js',
    '/test/unit': glob.sync('./test/unit/*.js'),
    '/test/validation': glob.sync('./test/validation/*.js')
  },
  output : {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/views/*.pug',
      to: 'views/[name].[ext]'
    }]),
    new CopyWebpackPlugin([{
      from: './src/assets/*',
      to: 'assets/[name].[ext]'
    }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};

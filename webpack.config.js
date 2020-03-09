/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    noEmitOnErrors: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          ie8: false,
          mangle: {
            eval: true,
            module: true
          },
          compress: {
            passes: 5,
            hoist_funs: true,
            toplevel: true,
            inline: 3,
            keep_fargs: false,
            module: true,
            pure_getters: true,
            unsafe: true
          },
          toplevel: true,
          keep_classnames: false,
          keep_fnames: false,
          output: {
            comments: false,
            beautify: false,
            quote_style: 3
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              experimentalWatchApi: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib')
  }
};

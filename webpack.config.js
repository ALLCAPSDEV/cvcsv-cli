const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    moduleIds: "size",
    usedExports: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              experimentalWatchApi: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib")
  }
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "awesome-typescript-loader"
          },
          {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              use: [
                {
                  loader: "css-loader",
                  options: {
                    minimize: true
                  }
                },
                "sass-loader"
              ]
            })
          }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new ExtractTextPlugin("style.css")
  ],
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
};
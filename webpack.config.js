const path = require("path");
const env = process.env.NODE_ENV;
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/js/main.js")
    // Continue add your multiple entries if any...
  },
  output: {
    filename:
      env === "dev"
        ? "assets/js/[name].js"
        : "assets/js/[name].[contentHash:8].js",
    chunkFilename:
      env === "dev"
        ? "assets/js/[name].js"
        : "assets/js/[name].[contentHash:8].js",
    path:
      env === "dev"
        ? path.resolve(__dirname, "./dev")
        : path.resolve(__dirname, "./dist/")
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: env === "dev" ? "[name].[ext]" : "[name].[contentHash:8].[ext]",
          outputPath: "assets/fonts/"
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192, outputPath: "assets/images/" }
        }
      }
    ]
  },
  plugins: [new htmlWebpackPlugin({
    template: './public/index.html'
  }), new CleanWebpackPlugin()],
  devServer: {
    contentBase: "./dist",
    port: 8000,
    compress: true
  },
  mode: env === "dev" ? "development" : "production"
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    module: {
        rules: [
          {
            //  "exclude": "/node_modules/",
            test: /\.js$|jsx/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            ]
        },
        {
          test: /\.css$/,
          use: ['style-loader','css-loader']
        },
          {
            test: /\.html$/,
            use: ['html-loader']
          },
          {
            test: /\.(jpg|png)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }
            ]
        }
        ]
      },
  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: ['/src/index.js']
  },
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      template: '/src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
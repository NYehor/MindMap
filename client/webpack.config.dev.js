const path = require('path');
console.log(__dirname);
module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: './js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss|sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true 
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules')]
  },
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, './build'),
    historyApiFallback: true
  },
  devtool: 'source-map'
};

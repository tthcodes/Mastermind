const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Now import statements without file extensions will also look for .jsx files
  },  
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html'
    })
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 4000, // Dev server served on Port 4000
    proxy: [{
      '/api': 'http://localhost:3000' // Node server being run on Port 3000
    }]
  }
};

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
      template: './src/static/index.html'
    })
  ],
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, './build'),
    },
    host: 'localhost',
    port: 4000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: [{
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }],
  },
  mode: 'development'
};

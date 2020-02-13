const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    medea: path.resolve(__dirname, 'src/style/templates/medea/medea.scss'),
    sanitas: path.resolve(__dirname, 'src/style/templates/sanitas/sanitas.scss'),
    ey: path.resolve(__dirname, 'src/style/templates/ey/ey.scss')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'medea.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({
                  stage: 0,
                  browsers: 'last 2 versions'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loader: 'file-loader?name=assets/img/[name].[ext]'
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/style/global/exportable/_app.mixins.scss'),
        to: path.resolve(__dirname, 'dist/sass/_mixins.scss')
      },
      {
        from: path.resolve(__dirname, 'src/style/templates/medea/backroom/exportable/_app.colors.scss'),
        to: path.resolve(__dirname, 'dist/sass/_colors.scss')
      }
    ])
  ]
};

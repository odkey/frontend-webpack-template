
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


module.exports = {
  watch: true,
  // mode: 'development', // production, none
  entry: {
    js: './src/scripts/app.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/scripts')
  },

  // Loader settings
  module: {
    rules: [
      // Style sheet
      {
        test: /[^_]+\.scss$/,
        use: [
          'style-loader' ,
          {
            loader: 'css-loader',
            options: {
              url: false,
              // importLoader: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
                plugins: function () {
                  return [ require('cssnano'),
                           require('autoprefixer')
                         ];
                }
            }
          },
          'sass-loader'
        ]
      },
      // Assets
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|otf|svg)$/,
        loader: 'url-loader'
      },
      // JavaScript
      {
        test: /\.(js|jsx)$/, // Target files
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ]
        }
      },
      {
        enforce: 'pre', // Give priority to this loader
        test: /\.(js|jsx)$/, // Target files
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      // GLSL
      {
        test: /\.(frag|vert)$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'SrcGraphics': path.resolve(__dirname, 'src/scripts/graphics'),
      'SrcReact': path.resolve(__dirname, 'src/scripts/react'),
      'SrcScss': path.resolve(__dirname, 'src/scss'),
      'SrcShaders': path.resolve(__dirname, 'src/shaders'),
      'SrcAssets': path.resolve(__dirname, 'src/assets'),
      'SrcFonts': path.resolve(__dirname, 'src/fonts'),
      'SrcImages': path.resolve(__dirname, 'src/imagees')
    }
  }
};

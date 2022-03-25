const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
      mode: process.env.NODE_ENV || 'development',
      entry: './src/entry.js',
      stats: 'errors-only',
      ignoreWarnings: [/warning/],
      target: 'web',
      module: {
            rules: [
                  /** Babel Loader */
                  {
                        test: /\.(js|ts)$/,
                        exclude: /(node_modules|bower_components|excluded)/,
                        oneOf: [
                              {
                                    resourceQuery: /external/, // foo.css?external
                                    use: 'file-loader',
                              },
                              {
                                    resourceQuery: /(inline|)/, // foo.css?inline
                                    use: [
                                          {
                                                loader: 'babel-loader',
                                                options: {
                                                      "exclude": [
                                                            // \\ for Windows, \/ for Mac OS and Linux
                                                            /node_modules[\\\/]core-js/,
                                                            /node_modules[\\\/]webpack[\\\/]buildin/,
                                                      ],
                                                      "presets": [
                                                            "@babel/preset-env",
                                                            "@babel/typescript",
                                                            // [
                                                            //       "@babel/preset-react",
                                                            //       {
                                                            //             "pragma": "xeon.createElement", // default pragma is React.createElement (only in classic runtime)
                                                            //             "pragmaFrag": "xeon.Fragment", // default is React.Fragment (only in classic runtime)
                                                            //             "throwIfNamespace": false, // defaults to true
                                                            //             "runtime": "classic" // defaults to classic
                                                            //             // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
                                                            //       }
                                                            // ]
                                                      ],
                                                      "plugins": [
                                                            [
                                                                  "@babel/plugin-transform-runtime"
                                                            ],
                                                            [
                                                                  "@babel/plugin-syntax-dynamic-import"
                                                            ],
                                                            [
                                                                  "module:@xeonjs/jsx2xset"
                                                            ]
                                                      ]
                                                }
                                          },
                                    ]
                              },
                        ],
                  },
                  {
                        test: /\.html$/,
                        use: [
                              {
                                    loader: 'html-loader',
                                    options: { minimize: true }
                              }
                        ]
                  },
                  // ** ADDING/UPDATING LOADERS **
                  // The "url" loader handles all assets unless explicitly excluded.
                  // The `exclude` list *must* be updated with every change to loader extensions.
                  // When adding a new loader, you must add its `test`
                  // as a new entry in the `exclude` list for "url" loader.
                  // "file" loader makes sure those assets get served by WebpackDevServer.
                  // When you `import` an asset, you get its (virtual) filename.
                  // In production, they would get copied to the `build` folder.
                  {
                        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                        use: [
                              {
                                    loader: 'file-loader',
                                    options: {
                                          // name: 'static/media/[name].[hash:8].[ext]',
                                    },
                              }
                        ],
                  },
            ],
      },
      output: {
            filename: 'static/js/[name].bundle.js',
            publicPath: '/',
            path: path.resolve(__dirname, "./build"),
            clean: true,
            globalObject: 'this',
      },
      plugins: [
            new htmlWebpackPlugin({
                  inject: true,
                  template: path.resolve(__dirname, "./public/index.html"),
                  filename: "./index.html",
                  minify: {
                        minifyCSS: true,
                  },
            }),
            new webpack.DefinePlugin({
                  'process.env': {
                        'NODE_ENV': process.env.NODE_ENV
                  }
            }),
            new webpack.HotModuleReplacementPlugin(),
      ],
      resolve: {
            modules: ["src", 'node_modules'],
            extensions: ['.js', '.json', '.ts'],
      },
      optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                  cacheGroups: {
                        vendor: {
                              test: /[\\/]node_modules[\\/]/,
                              name: 'vendors',
                              chunks: 'all',
                        },
                  },
            },
      },
      devtool: "eval",
      devServer: {
            proxy: { // proxy URLs to backend development server
                  '/api': "http://localhost:5000",
            },
            static: path.resolve(__dirname, "./public"),
            compress: true, // enable gzip compression
            historyApiFallback: true, // true for index.html upon 404, object for multiple paths
            https: false, // true for self-signed, object for cert authority
            port: 3000,
            client: {
                  logging: 'error',
                  overlay: {
                        errors: true,
                        warnings: false,
                  },
            }
      }
};
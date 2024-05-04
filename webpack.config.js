/* constants */
const isDev = process.env.NODE_ENV !== "production";
const outputFolder = "dist";

/* imports */
const packageJson = require("./package.json");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const NodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const defaultBrandName = "gamechampions";

/* brand */
const brandName = process.env.BRAND_NAME ? process.env.BRAND_NAME.toLowerCase() : defaultBrandName;
const brandConfigPath = path.resolve(__dirname, "brands", brandName, `${isDev ? "dev" : "prod"}.json`);
const brandConfig = JSON.parse(fs.readFileSync(brandConfigPath, "utf-8"));

const node = {
  name: "node",
  devtool: isDev ? "eval" : "hidden-source-map",
  target: "node",
  node: {
    __dirname: true
  },
  externals: [NodeExternals()],
  entry: ["./app.babel.js"],
  output: {
    path: __dirname,
    filename: "app.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.IS_DEPLOY": JSON.stringify(process.env.DEPLOY),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.outputFolder": JSON.stringify(outputFolder),
      "process.env.DASHBOARD_URL": JSON.stringify(
        process.env.DASHBOARD_URL || brandConfig.dashboardUrl
      ),
      "process.env.API_URL": JSON.stringify(
        process.env.API_URL || brandConfig.apiUrl
      ),
      "process.env.DASHBOARD_API_URL": JSON.stringify(
        process.env.DASHBOARD_API_URL || brandConfig.dashboardApiUrl
      ),
      "process.env.ALLOW_PUSH_NOTIFICATON": false,
      "process.env.STORAGE_URL": JSON.stringify(
        process.env.STORAGE_URL || brandConfig.storageUrl
      ),
      "process.env.SHOW_HEADER_LOGO": false,
      "process.env.NAME": JSON.stringify(packageJson.name),
      "process.env.DESCRIPTION": JSON.stringify(packageJson.description),
      "process.env.VERSION": JSON.stringify(packageJson.version),
      "process.env.AUTHOR.NAME": JSON.stringify(packageJson.author.name),
      "process.env.AUTHOR.EMAIL": JSON.stringify(packageJson.author.email),
      "process.env.AUTHOR.URL": JSON.stringify(packageJson.author.url),
      "process.env.CURRENCY_SYMBOL": JSON.stringify("€")
    })
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          fix: true,
          emitWarning: true
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            ["@babel/preset-env", { targets: { node: "current" } }],
            "@babel/preset-react"
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "iw-umbraco": path.resolve(__dirname, "./umbraco/sdk")
    }
  }
};

const web = {
  name: "web",
  devtool: isDev ? "eval" : "hidden-source-map",
  context: path.join(__dirname, "src"),
  externals: [
    {
      xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
    }
  ],
  entry: {
    "main.js": ["./js/index.jsx"],
    "style": `./scss/brands/${brandName}/style.scss`,
    "inline": `./scss/brands/${brandName}/inline.scss`,
    "richtext": `./scss/brands/${brandName}/richtext.scss`,
  },
  output: {
    path: path.join(__dirname, outputFolder),
    filename: "[name]"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.IS_DEPLOY": JSON.stringify(process.env.DEPLOY),
      "process.env.DASHBOARD_URL": JSON.stringify(
        process.env.DASHBOARD_URL || brandConfig.dashboardUrl
      ),
      "process.env.API_URL": JSON.stringify(
        process.env.API_URL || brandConfig.apiUrl
      ),
      "process.env.DASHBOARD_API_URL": JSON.stringify(
        process.env.DASHBOARD_API_URL || brandConfig.dashboardApiUrl
      ),
      "process.env.ALLOW_PUSH_NOTIFICATON": false,
      "process.env.STORAGE_URL": JSON.stringify(
        process.env.STORAGE_URL || brandConfig.storageUrl
      ),
      "process.env.SHOW_HEADER_LOGO": false,
      "process.env.NAME": JSON.stringify(packageJson.name),
      "process.env.DESCRIPTION": JSON.stringify(packageJson.description),
      "process.env.VERSION": JSON.stringify(packageJson.version),
      "process.env.AUTHOR.NAME": JSON.stringify(packageJson.author.name),
      "process.env.AUTHOR.EMAIL": JSON.stringify(packageJson.author.email),
      "process.env.AUTHOR.URL": JSON.stringify(packageJson.author.url),
      "process.env.CURRENCY_SYMBOL": JSON.stringify("€")
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].css",
      chunkFilename: isDev ? "[id].css" : "[id].css"
    }),
    new CopyWebpackPlugin([
      {
        from: `./brands/${brandName}/favicon.ico`,
        to: "./"
      },
      {
        from: `./brands/${brandName}/manifest.json`,
        to: "./"
      }
    ]),
    new StyleLintPlugin({ fix: true }),
    new SWPrecacheWebpackPlugin({
      cacheId: JSON.stringify(packageJson.name),
      filename: "sw.js",
      minify: isDev ? false : true,
      staticFileGlobs: [
        `${outputFolder}/**/*.css`,
        `${outputFolder}/**/*.js`
      ],
      stripPrefix: `${outputFolder}`,
      maximumFileSizeToCacheInBytes: 8388608
    })
  ].concat(process.env.DEPLOY ? [] : [new BundleAnalyzerPlugin()]),
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          fix: true,
          emitWarning: true
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      },
      {
        test: /\.svg$/,
        loader:
          "url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
      },
      {
        test: /\.woff$/,
        loader:
          "url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: /\.woff2$/,
        loader:
          "url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]"
      },
      {
        test: /\.[ot]tf$/,
        loader:
          "url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
      },
      {
        test: /\.eot$/,
        loader:
          "url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]"
      },
      {
        test: /\.modernizrrc.js$/,
        loader: "modernizr-loader"
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        loader: "modernizr-loader"
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        sourceMap: true,
        terserOptions: {
          compress: !isDev,
          mangle: true
        }
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          zindex: false
        }
      })
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      modernizr$: path.resolve(__dirname, "./.modernizrrc"),
      joi: "joi-browser",
      "iw-umbraco": path.resolve(__dirname, "./umbraco/sdk")
    }
  }
};
module.exports = [node, web];

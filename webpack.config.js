const path = require("path");

const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const isProd = process.env.NODE_ENV == "production";

module.exports = {
  mode: process.env.NODE_ENV,

  entry: {
    index: "src/index.ts",
    child_find: "src/lib/childProcesses/child_find.ts",
    child_delete: "src/lib/childProcesses/child_delete.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, isProd ? "build" : "build-dev"),
  },

  watch: !isProd,
  watchOptions: {
    ignored: "node_modules/**",
  },

  devtool: isProd ? "inline-source-map" : false,

  target: "node",

  externals: [nodeExternals()],
  plugins: [
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
      include: "index.js",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    plugins: [new TSConfigPathsPlugin({ configFile: "tsconfig.json" })],
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@app": path.resolve(__dirname, "src"),
    },
  },
};

// #!/usr/bin/env node

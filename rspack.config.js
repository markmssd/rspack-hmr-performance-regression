const path = require("path");
const rspack = require("@rspack/core");
const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");

const prod = process.env.NODE_ENV === "production";
/** @type {import("@rspack/cli").Configuration} */
module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: { main: "./index.jsx" },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.resolve(__dirname, "./index.html")
    }),
    !prod && new ReactRefreshPlugin()
  ].filter(Boolean),
  module: {
    rules: [
      // Using this builtin loader works without problem
      // {
      // 	test: /\.(j|t)sx?$/,
      // 	loader: "builtin:swc-loader",
      // 	exclude: [/[\\/]node_modules[\\/]/],
      // 	options: {
      // 		sourceMaps: true,
      // 		jsc: {
      // 			parser: {
      // 				syntax: "typescript",
      // 				tsx: true
      // 			},
      // 			transform: {
      // 				react: {
      // 					runtime: "automatic",
      // 					development: !prod,
      // 					refresh: !prod
      // 				}
      // 			},
      // 			externalHelpers: true
      // 		},
      // 		env: {
      // 			targets: "Chrome >= 48"
      // 		}
      // 	}
      // },
      {
        test: /\.[jt]sx?$/,
        include: [path.resolve(process.cwd(), './index.jsx'), path.resolve(process.cwd(), './src')],
        exclude: /node_modules/,
        use: {
          loader: require.resolve('./swc-loader'),
        },
        type: 'javascript/auto',
      },
    ]
  },
  optimization: {
    moduleIds: 'named',
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  stats: {
    assets: false,
    colors: true,
  },
};

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackObfuscator = require("webpack-obfuscator");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      background: "./src/background.js",
      content: "./src/content.js",
      popup: "./src/popup.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      clean: true,
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction,
              drop_debugger: isProduction,
            },
            mangle: true,
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
    plugins: [
      // Copy static files
      new CopyPlugin({
        patterns: [
          {
            from: "src/manifest.json",
            to: "manifest.json",
          },
          {
            from: "src/popup.html",
            to: "popup.html",
          },
        ],
      }),
      // Always obfuscate JavaScript files (even in development for security)
      new WebpackObfuscator(
        {
          rotateStringArray: true,
          stringArray: true,
          stringArrayEncoding: ["base64"],
          stringArrayThreshold: 0.75,
          unicodeEscapeSequence: false,
          identifierNamesGenerator: "hexadecimal",
          renameGlobals: false,
          selfDefending: true,
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          debugProtection: false,
          debugProtectionInterval: false,
          disableConsoleOutput: isProduction,
          domainLock: [],
          transformObjectKeys: true,
          splitStrings: true,
          splitStringsChunkLength: 10,
        },
        ["background.js", "content.js", "popup.js"]
      ),
    ],
    resolve: {
      extensions: [".js"],
    },
    mode: argv.mode || "development",
    devtool: false, // Never include source maps for security
  };
};

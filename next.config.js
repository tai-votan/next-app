// eslint-disable-next-line @typescript-eslint/no-unused-vars
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const lessToJS = require("less-vars-to-js");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

const fs = require("fs");
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, "./styles/variable-style.less"), "utf8"));

module.exports = withBundleAnalyzer(
  withSass({
    cssModules: true,
    ...withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables // make your antd custom effective
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          // eslint-disable-next-line no-param-reassign
          config.externals = [
            // eslint-disable-next-line consistent-return
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals)
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader"
          });
        }

        config.plugins.push(
          new AntdDayjsWebpackPlugin(),
          new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
          })
        );

        config.resolve.modules.push(__dirname);

        return config;
      }
    })
  })
);

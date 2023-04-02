const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // Sass Loader 설정 추가
    config.module
      .rule("sass")
      .test(/\.sass$/)
      .use("sass-loader")
      .loader("sass-loader")
      .end();
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: [
            "vue-style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
      ],
    },
  },
});

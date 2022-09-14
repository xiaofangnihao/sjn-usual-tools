export default {
  // app: 安装的应用实例 options: 传递给app.use的额外参数
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split(".").reduce((o, i) => {
        if (o) return o[i];
      }, options);
    };

    // 全局注入该options
    app.provide("i18n", options);
  },
};

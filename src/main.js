import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import "./assets/css/reset.less";
import "./assets/css/theme.less";
import "@/assets/css/common.less";

import i18nPlugin from "./plugins/i18n/index";
import options from "./plugins/i18n/options";

import "./permission";

// 引入自动化注册的全局组件
import components from "@/components/index.js";

import * as echarts from "echarts";

import ElementPlus from "element-plus"; // 全部引入
// elementPlus css样式文件
import "../node_modules/element-plus/theme-chalk/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// 全局注册echarts
app.config.globalProperties.$echarts = echarts;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(components);
// options: 在插件被安装时作为 app.use() 的额外参数被传入
app.use(i18nPlugin, options);
app.use(router).use(store).use(ElementPlus).mount("#app");

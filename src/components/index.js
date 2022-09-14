// import.meta.globEager 直接引入
// import.meta.glob 动态引入
// new URL('url', import.meta.url).href 取代vue2中的require('url')

import { defineAsyncComponent } from "vue";
const components = import.meta.glob("./BaseComponent/*.vue"); // 异步方式
export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    // 用于获取name值, ex: BaseInput lastIndexOf: 获取/最后出现的位置
    const name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));
    app.component(name, defineAsyncComponent(value));
  }
}

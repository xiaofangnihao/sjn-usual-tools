import { Encrypt, Decrypt } from "./src/utils/aes";
import { equal } from "./src/utils/math";
import i18nPlugin from "./src/plugins/i18n/index";
import options from "./src/plugins/i18n/options";

export { Encrypt, Decrypt, equal, i18nPlugin, options };

// 判断数据类型
export function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

// 手机号脱敏,将第4-7位数字修改为*(若手机号格式不正确则失效)
export function hideMobile(mobile) {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
}

// 解析URL参数
export function getSearchParams() {
  // search: 获取url上?(包含)后的内容
  const searchPar = new URLSearchParams(window.location.search);
  const paramsObj = {};
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value;
  }
  return paramsObj;
}

// 判断IOS或Android 1: IOS 2: Android
export const getOSType = () => {
  let u = navigator.userAgent,
    app = navigator.appVersion;
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    return 1;
  }
  if (isAndroid) {
    return 2;
  }
  return 3;
};

// 回到顶部
export const scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
};

// 滚动到元素位置(ex: smoothScroll('#app'))
export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
};

// 时间操作使用day.js

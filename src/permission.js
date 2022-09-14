// vue-router自带的addRoutes方法，该方法是会将新的路由规则在原路由表数组的尾部注入的
import { useLogin } from "./store/login.js";
import pinia from "./store/index.js";
import router from "./router/index.js";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入

// router.beforeEach((to, from, next) => {
//   new Promise((resolve, reject) => {
//     if (getCookie(tokenName)) {
//       if (!getInfo()) {
//         Promise.all([store.dispatch('getBasicInfo'), store.dispatch('getUserDetail')]).then(res => {
//           store.dispatch('GenerateRoutes', { roles }).then(() => {
//             // 根据用户权限生成可访问的路由表
//             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             router.addRoutes(NotFoundRouterMap) // 添加404及重定向路由规则
//             resolve({ ...to, replace: true }) // 重新加载一次路由，让路由表更新成功后走下面else的判断
//           })

//         })
//       } else {
//         // ...other codes
//       }
//     } else {
//       window.location.href = '/login.html'
//     }
//   }).then(res => {
//     if (res) {
//       next(res)
//     } else {
//       next()
//     }
//   }).catch(err => {
//     new Error(err)
//     next(false)
//   })

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const login = useLogin(pinia);
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 先判断是否有token, 若有token, 直接next
  if (login.token || localStorage.getItem("token")) {
    next();
    NProgress.done();
  } else {
    // 先判断是否在白名单中
    // ~等于-(x + 1), 这样的写法可以避免抽象渗漏
    if (~whiteList.indexOf(to.path)) next();
    else {
      ElMessage({
        type: "warning",
        message: "您暂无权限,请先登录!",
      });
      next("/login");
      NProgress(done);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

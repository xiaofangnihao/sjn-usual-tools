import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteImages from "vite-plugin-vue-images";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteImages({
      dirs: ["src/assets/images", "src/assets/testImage"], // 指明图片存放的目录
    }),
    // 配置动态生成路由的插件
    Pages({
      dirs: [{ dir: "src/router", baseRoute: "/" }],
      importMode: "async",
    }),
  ],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: 'import { h } from "vue"',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // porxy: {
    //   // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
    //   api: {
    //     // target: "http://127.0.0.1:7001", //后端服务实际地址
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    host: "localhost", //默认localhost
    port: "8000", // 默认3000
    https: false, // 是否开启https
    open: true, // 浏览器自动打开
    ssr: false, // 服务端渲染
    base: "./", // 生产环境下的公共路径
    outDir: "dist", // 打包构建输出路径，默认是dist，如果路径存在，构建之前会被删除
  },
});


import { ElMessage } from "element-plus";

// 后端返回blob流文件, 不用插件的处理方式
// 可下载downloadjs插件直接在request请求中统一处理后端返回流文件
export function exportExcel(res) {
  // 将blob转换成json
  let reader = new FileReader();
  reader.readAsText(res);
  reader.onload = function (result) {
    try {
      let resData = JSON.parse(result.target.result); // 解析对象成功，说明是json数据
      if (resData.code) {
        ElMessage({
          type: "error",
          message: resData.desc,
        });
      }
    } catch (err) {
      // 解析成对象失败，说明是正常的文件流
      let blob = new Blob([res], { type: "application/vnd.ms-excel" });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `文件名.xls`;
      link.click();
    }
  };
}

// 处理后端生成excel流文件  -> response: blob
import download from "downloadjs";
// 调用downloadjs插件
export function exportByBehindEnd(res) {
  if (
    res.headers["content-type"] === "text/csv" ||
    res.config.responseType == "blob"
  ) {
    if (res.headers["content-disposition"]) {
      let title = res.headers["content-disposition"].split("=")[1];
      download(res.data, decodeURIComponent(title) || "1.text");
      return { code: 200 };
    }
  }
}

download("测试内容", "1.txt", "text/plain");
// encodeURIComponent -> 对字符编码  decodeURIComponent -> 对字符解码

// 调用a标签
export function exportBySelf(res) {
  const blob = new Blob([res.data]);
  const filename = res.headers["content-disposition"];
  const downloadElement = document.createElement("a");
  const href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  [downloadElement.download] = [decodeURI(decodeURI(filename.split("=")[1]))];
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放blob对象
}

// 后端返回data数据 前端导出
1;
// 1. import JsonExcel from 'vue-json-excel';
// 2. 注册组件JsonExcel:
// jsonexcel配置项:
// data -> 要导出的数据源
// fetch -> 异步获取导出数据源 async await 需return data
// before - generate="startDownload" 请求前method
// before - finish="finishDownload" 请求后method
// type -> 默认xls
// header -> excel的表头
// name -> 文件名.xls
// fields -> 表格设置 { '表头名': '属性值 -> 对应data里的属性值' }

// 问题: 无样式 搭配按钮使用时点击按钮无反应 需要点击到导出两个字

2;

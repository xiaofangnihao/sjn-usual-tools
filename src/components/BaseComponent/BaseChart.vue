<template>
  <div class="baseChart">
    <div
      class="chart"
      :ref="chartConfig.chartName"
      :style="{
        width: chartConfig.width ? `${chartConfig.width}px` : '500px',
        height: chartConfig.height ? `${chartConfig.height}px` : '300px',
      }"
    ></div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, watch } from "vue";

const props = defineProps({
  chartConfig: {
    type: Object,
    default: () => {
      return {
        chartName: "defaultChart",
      };
    },
  },
  options: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const echartsOptions = computed(() => {
  console.log(props.options);
  return {
    ...props.options,
  };
});
// 监听props里的数据变化来重新init图表?
watch(props.options, (nv, ov) => {
  console.log(nv, ov);
  initEchart();
});
const that = getCurrentInstance();
console.log(that);
const { appContext } = getCurrentInstance();
console.log(appContext);

const initEchart = () => {
  // 检测是否已经存在echarts实例，如果不存在，则不再去初始化
  let echartDom = document.getElementsByClassName("chart")[0];
  let myChart =
    appContext.config.globalProperties.$echarts.getInstanceByDom(echartDom);
  if (!myChart) {
    myChart = appContext.config.globalProperties.$echarts.init(
      echartDom,
      "dark"
    ); // 返回echartsInstance
  }
  console.log(echartsOptions.value, "-----");
  // 在容器节点被销毁时，总是应调用 echartsInstance.dispose(myChart) 以销毁实例释放资源，避免内存泄漏。
  myChart.setOption(echartsOptions.value);
};

onMounted(() => initEchart());
</script>

<style scoped lang="less">
// class为no-print的元素不参与打印
@media print {
  .no-print {
    display: none;
  }
}

// 去除页眉页脚
@page {
  margin: 0;
}
</style>
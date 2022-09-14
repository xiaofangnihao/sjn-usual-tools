<template>
  <router-view />
</template>

<script>
import { defineComponent, provide, ref } from "vue";
import { uniqueKey } from "./keys";

export default defineComponent({
  setup() {
    // 祖先元素提供的值可供给所有子元素使用
    const dynamic = ref(0);
    function changeValue(value) {
      dynamic.value = value;
    }
    provide("fromApp", {
      dynamic,
      changeValue,
    });

    provide(uniqueKey, ref(1));
  },
});
</script>

<style lang="less">
body,
html {
  height: 100%;
  // background-color: blue;
}

#app {
  height: 100%;
}
</style>

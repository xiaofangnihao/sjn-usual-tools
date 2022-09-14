<template>
  <el-input
    v-model="value"
    :disabled="fieldConfig.disabled"
    :placeholder="'请输入' + fieldConfig.label || fieldConfig.placeholder"
  />
</template>

<script setup>
import { useField } from "@/hooks/useField.js";

const props = defineProps({
  value: {
    type: String,
    default: () => "",
  },
  config: {
    type: Object,
    default: () => {},
  },
});
const { fieldConfig } = useField(props.config, { disabled: false });
</script>

<style scoped lang="less">
:deep .el-select {
  width: 100%;
}
</style>
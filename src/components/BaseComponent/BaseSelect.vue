<template>
  <el-select
    v-model="value"
    :multiple="fieldConfig.multiple"
    :disabled="fieldConfig.disabled"
    clearable
    filterable
    :placeholder="'请输入' + fieldConfig.label || fieldConfig.placeholder"
  >
    <el-option
      v-for="item of fieldConfig.selectOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
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

const { fieldConfig } = useField(props.config, {
  multiple: false,
  disabled: false,
  selectOptions: [],
});

</script>

<style scoped lang="less">
</style>
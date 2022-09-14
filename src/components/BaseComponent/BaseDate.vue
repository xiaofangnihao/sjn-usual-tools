<template>
  <el-date-picker
    v-model="value"
    type="date"
    :disabled-date="disabledDate"
    :shortcuts="shortcuts"
  />
</template>

<script setup>
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

const shortcuts = [
  {
    text: "Today",
    value: new Date(),
  },
  {
    text: "Yesterday",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "A week ago",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

const disabledDate = (time) => {
  return time.getTime() > Date.now();
};
</script>

<style scoped lang="less"></style>

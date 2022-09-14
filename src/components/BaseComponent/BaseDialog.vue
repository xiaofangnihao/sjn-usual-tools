<template>
  <div class="dialog">
    <el-dialog v-model="dialog.show" :title="dialog.title" draggable>
      <base-form
        :form-config="formConfig"
        :form-list="formList"
        :form-data="formData"
      ></base-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BaseForm from "./BaseForm.jsx";

const props = defineProps({
  test: {
    type: Number,
  },
  dialogConfig: {
    type: Object,
    default: () => {
      return {
        show: true,
        title: "测试",
      };
    },
  },
  formConfig: {
    type: Object,
    default: () => {},
  },
  formList: {
    type: Array,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["submit"]);
const dialog = computed(() => props.dialogConfig);

function cancel() {
  // dialog.value.show = false;
  props.dialogConfig.title = "测试";
  props.test++;
}

function submit() {
  emit("submit");
}
</script>

<style scoped lang="less">
:deep .el-dialog {
  .el-dialog__header {
    background-color: #409eff;
    color: #fff;
    margin: 0;

    span {
      color: #fff;
    }

    i {
      color: #fff;
    }
  }
}
</style>

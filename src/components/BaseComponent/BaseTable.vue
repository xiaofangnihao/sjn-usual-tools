<template>
  <div class="baseTable">
    <!-- 默认新增按钮 -->
    <el-button :icon="Edit" v-if="addShow" @click="newAdd" class="newAdd">新增</el-button>
    <!-- 将表格数据与分页器联动 -->
    <el-table :data="list" border>
      <!-- 序号列 -->
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="90"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        v-for="item of fieldConfig.column"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :align="item.align || 'center'"
        :width="item.width"
      >
        <!-- 图片列 -->
        <template #default="scope" v-if="item.type === 'img'">
          <el-image
            :src="scope.row[item.prop] || defaultUrl"
            style="height: 100px; width: 100px"
          >
          </el-image>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column
        fixed="right"
        label="操作"
        :align="fieldConfig.operateConfig.align"
        :width="fieldConfig.operateConfig.width"
      >
        <el-button link type="primary">编辑</el-button>
        <el-button link type="primary">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="total > 0"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; flex-direction: row-reverse"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useField } from "@/hooks/useField.js";
import { Picture as IconPicture, Edit } from "@element-plus/icons-vue";


const props = defineProps({
  config: {
    type: Object,
    default: () => {},
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["newAdd"]);

const { fieldConfig } = useField(props.config, {
  operateConfig: {
    width: "180",
    align: "center",
  },
});

console.log(fieldConfig.value.addShow);

const list = computed(() => {
  return props.tableData.slice(
    (props.currentPage - 1) * props.pageSize,
    props.pageSize * props.currentPage
  );
});

const defaultUrl =
  "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";

const indexMethod = (index) => {
  return (props.currentPage - 1) * props.pageSize + index + 1;
};

const handleSizeChange = (val) => {
  console.log(val);
};

const handleCurrentChange = (val) => {
  console.log(val);
};

const addShow = computed(() => {
  // 不传值默认为true
  return fieldConfig.value.addShow ?? true;
});

function newAdd() {
  emit("newAdd");
}
</script> 

<style scoped lang="less">
.baseTable {
  .newAdd {
    margin-bottom: 15px;
    background-color: #1baeae;
    border-color: #1baeae;
    color: #fff;
    width: 70px;
  }
}
</style>
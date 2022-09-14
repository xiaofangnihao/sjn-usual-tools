<template>
  <div class="edit-table">
    <table :border="1">
      <tr style="height: 50px">
        <th v-for="item of tHead" :key="item.key">{{ item.text }}</th>
      </tr>
      <tr v-for="item of tBody" :key="item.id">
        <td @click="showInput($event)" v-for="it of tHead" :key="it.key">
          {{ item[it.key] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  tableData: {
    type: Object,
    default: () => ({
      tHead: [],
      tBody: [],
    }),
  },
});

const { tHead, tBody } = toRefs(props.tableData);

function showInput(e) {
  console.log(e.target);
  e.target.appendChild(1);
}
</script>

<style lang="less" scoped>
.edit-table {
  width: 800px;
  height: 200px;
  margin: auto;

  table {
    text-align: center;
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    outline: none;
    border: 1px solid #000;
  }
}
</style>

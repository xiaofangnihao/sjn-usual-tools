<template>
  <div class="header flex">
    <div class="header-left flex">
      <el-icon @click="foldOrExpand" style="cursor: pointer">
        <component :is="isFold"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="rightIcon" class="breadcrumb">
        <el-breadcrumb-item v-for="item of routerList" :key="item">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right flex">
      <p class="userName">{{ userName }}</p>
      <el-image :src="avatar" class="elImage" />
      <el-dropdown>
        <el-icon class="elIcon"><ArrowDown /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleClick('0')"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item @click="handleClick('1')"
              >退出登录</el-dropdown-item
            >
            <el-dropdown-item @click="handleClick('2')"
              >切换主题色</el-dropdown-item
            >
            <el-dropdown-item @click="handleClick('3')"
              >切换中英文</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted, computed } from "vue";
import { useLayout } from "@/store/layout.js";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useLogin } from "@/store/login.js";
export default {
  name: "Header",
  setup() {
    let rightIcon = ArrowRight;

    // 解决vue3无法使用require引入图片的问题
    // onMounted(() => {
    //   handleImageSrc();
    // });
    // let url = ref("");
    // let handleImageSrc = async () => {
    //   let m = await import("../../assets/avatar.jpg");
    //   url.value = m.default;
    // };

    const state = reactive({
      isFold: "Fold",
      userName: "沈嘉宁",
      routerList: [],
    });

    const router = useRoute();
    state.routerList = computed(() =>
      router.matched.map((it) => it.meta?.title)
    );

    const layout = useLayout();

    const foldOrExpand = () => {
      layout.isCollapse = !layout.isCollapse;
      layout.isFold = !layout.isCollapse ? "Fold" : "Expand";
    };

    const login = useLogin();

    function handleClick(index) {
      if (index === "1") {
        login.clearToken();
      }
    }

    return {
      rightIcon,
      ...toRefs(state),
      foldOrExpand,
      handleClick,
    };
  },
};
</script>

<style scoped lang="less">
.header {
  margin-top: 10px;
  justify-content: space-between;

  &-left {
    .breadcrumb {
      margin-left: 30px;
    }
  }

  &-right {
    font-size: 12px;

    .userName {
      height: 30px;
      line-height: 30px;
    }

    .elImage {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 0 10px;
    }

    .el-dropdown {
      align-items: center;
    }

    .elIcon {
      :hover {
        cursor: pointer;
      }
    }
  }
}
</style>

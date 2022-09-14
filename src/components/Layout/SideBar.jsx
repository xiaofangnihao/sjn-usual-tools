import { defineComponent, computed, reactive, resolveComponent, h } from "vue";
import { useRt } from "@/store/router.js";
import { routes } from "@/router/index.js";
import { useLayout } from "@/store/layout.js";
import { useRouter } from "vue-router";
import {
  ElScrollbar,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElIcon,
} from "element-plus";
import "./sideBar.less";

export default defineComponent({
  setup(props, ctx) {
    const rt = useRt();
    let rts = routes.filter((it) => it.children);
    rt.setRouter(rts);
    const routers = computed(() => rt.routers);

    const renderChildren = (item) => {
      // 一级title的slot
      const firstSlots = {
        title: () => {
          return (
            <div>
              {/* 动态渲染组件, h(resolveComponent())替代template语法中的component */}
              <ElIcon>{item.icon && h(resolveComponent(item.icon))}</ElIcon>
              <span>{item?.meta?.title ?? "未定义菜单名称"}</span>
            </div>
          );
        },
      };

      return (
        <div>
          {item.children ? (
            <ElSubMenu index={item.path} v-slots={firstSlots}>
              <ElMenuItemGroup title={item.subTitle ? item.subTitle : ""}>
                {item.children.map((it) => {
                  return (
                    <div>
                      {it.children ? (
                        renderChildren(it)
                      ) : (
                        <ElMenuItem key={it.path} index={it.path}>
                          {it.meta?.title ?? it.path}
                        </ElMenuItem>
                      )}
                    </div>
                  );
                })}
              </ElMenuItemGroup>
            </ElSubMenu>
          ) : (
            <ElMenuItem index={item.path} v-slots={firstSlots}></ElMenuItem>
          )}
        </div>
      );
    };

    const state = reactive({
      navTitle: "",
    });

    const layout = useLayout();
    const isCollapse = computed(() => layout.isCollapse);
    const type = computed(() => layout.type);

    const router = useRouter();
    const getActive = computed(() => router.currentRoute.value.path);

    return () => {
      return (
        <div
          class="sidebar-container"
          style={`width: ${!isCollapse.value ? "200px" : "45px"}; margin-top: ${
            type.value === 1 ? "45px" : "0"
          }`}
        >
          {state.navTitle ? <p class="navTitle">{state.navTitle}</p> : ""}
          <ElScrollbar wrapClass="scrollbar-wrapper">
            <ElMenu
              router
              class="el-menu-vertical-demo"
              defaultActive={getActive.value}
              collapse={isCollapse.value}
              backgroundColor="#20222a"
              text-color="#bfcdb9"
              activeTextColor="#fff"
            >
              {routers.value.map((item) => {
                return <div key={item.path}>{renderChildren(item)}</div>;
              })}
            </ElMenu>
          </ElScrollbar>
        </div>
      );
    };
  },
});

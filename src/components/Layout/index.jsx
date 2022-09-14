import { defineComponent, computed } from "vue";
import { useLayout } from "@/store/layout.js";
import "./index.less";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SideBar from "./SideBar.jsx";

export default defineComponent({
  components: { Header, Footer, SideBar },
  setup() {
    const layout = useLayout();
    const type = computed(() => layout.type);
    const footer = computed(() => layout.footer);
    const isCollapse = computed(() => layout.isCollapse);
    const renderFullWidthHeader = () => {
      return (
        <el-container>
          <el-header>
            <Header />
          </el-header>
          <el-container>
            <el-aside width={!isCollapse.value ? "200px" : "45px"}>
              <SideBar />
            </el-aside>
            {footer.value ? (
              <el-container>
                <el-main>
                  <router-view />
                </el-main>
                <el-footer>
                  <Footer />
                </el-footer>
              </el-container>
            ) : (
              <el-main>
                <router-view />
              </el-main>
            )}
          </el-container>
        </el-container>
      );
    };

    const renderFullHeightAside = () => {
      return (
        <el-container style="height: 100%;">
          <el-aside width={!isCollapse.value ? "200px" : "45px"}>
            <SideBar />
          </el-aside>
          <el-container>
            <el-header>
              <Header />
            </el-header>
            <el-main>
              <router-view />
            </el-main>
            {footer.value ? (
              <el-footer>
                <Footer />
              </el-footer>
            ) : (
              ""
            )}
          </el-container>
        </el-container>
      );
    };

    return {
      type,
      footer,
      isCollapse,
      renderFullWidthHeader,
      renderFullHeightAside,
    };
  },
  render() {
    return (
      <div class="page">
        {this.type === 1
          ? this.renderFullWidthHeader()
          : this.renderFullHeightAside()}
      </div>
    );
  },
});

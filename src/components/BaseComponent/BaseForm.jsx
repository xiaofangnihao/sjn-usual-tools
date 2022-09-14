import { computed, defineComponent } from "vue";
import "./BaseForm.less";

export default defineComponent({
  inheritAttrs: false,
  props: {
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
  },

  setup(props, { expose }) {
    // 让组件实例处于关闭状态, 不向父组件暴露任何东西
    expose();
    function test() {
      console.log("我是子组件的方法");
    }
    const { formData, formList } = props;
    const labelWidth = computed(() => {
      if (!props.formConfig.labelWidth) return "150px";
      return typeof props.formConfig.labelWidth === "string"
        ? props.formConfig.labelWidth
        : `${props.formConfig.labelWidth}px`;
    });

    const formItemClass = computed(() => {
      if (!props.formConfig.inline) {
        return "defaultFormItem";
      }
      if (props.formConfig.inline) {
        if (props.formConfig.columnNum === 2) {
          return "formItem-2";
        } else {
          return "formItem-3";
        }
      }
    });
    function renderFormItem(item) {
      switch (item.type) {
        case "input":
          return <BaseInput config={item} value={formData[item.prop]} />;
        case "select":
          return <BaseSelect config={item} value={formData[item.prop]} />;
        case "date":
          return <BaseDate config={item} value={formData[item.prop]} />;
        case "upload":
          return <BaseUpload />;
      }
    }

    return {
      test,
      labelWidth,
      formItemClass,
      formData,
      renderFormItem,
    };
  },

  render() {
    return (
      <div class="baseForm">
        <el-form
          model={this.formData}
          labelWidth={this.labelWidth}
          inline={this.formConfig.inline}
        >
          {this.formList.map((item) => {
            return (
              <el-form-item
                key={item.prop}
                label={item.label}
                prop={item.prop}
                class={this.formItemClass}
              >
                {this.renderFormItem(item)}
              </el-form-item>
            );
          })}
        </el-form>
      </div>
    );
  },
});

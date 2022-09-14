import { defineComponent, Transition } from "vue";
import "./RankChart.less";

export default defineComponent({
  props: {
    rankData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    console.log(props);
    const { rankData } = props;
    console.log(rankData);
    let data = rankData.sort((a, b) => {
      return b.hours - a.hours;
    });
    data.forEach((item, index) => {
      item.rank = index;
    });
    let forMaxArray = data.map((item) => item.hours);
    let max = Math.max.apply(null, forMaxArray);

    return {
      data,
      max,
    };
  },
  render() {
    return (
      <div class="rank">
        {this.data.map((item) => {
          return (
            <div class="rank-item">
              <div class="rank-item-num">{item.rank + 1}</div>
              <div class="rank-item-name">{item.name}</div>
              <div
                class="rank-item-progress"
                style={{ width: this.max ? `${this.max}px` : "500px" }}
              >
                <Transition name="fade" appear>
                  <div
                    class="rank-item-progress-child"
                    style={{ width: `${item.hours}px` }}
                  ></div>
                </Transition>
              </div>
              <div class="rank-item-data">{item.hours}小时</div>
            </div>
          );
        })}
      </div>
    );
  },
});

<template>
  <div class="box">
    <LineFigure></LineFigure>
    <div class="wt-box" ref="timeSlider">
      <ul class="list" :style="{width: length * 0.65 + 'rem'}">
        <li v-for="(tw, i) in timeWeat.hourly" :key="i">
          <!-- yyyy-MM-dd hh:mm -->
          <p>{{getTime(tw.time, 'hh:mm')}}</p>
          <div class="icon-tq">
            <img class="auto-img" :src="require('../assets/img/tq/' + tw.cond_code +'.png')" alt />
          </div>
          <p>{{tw.tmp}}°</p>
        </li>
      </ul>
    </div>
    <LineFigure></LineFigure>
  </div>
</template>

<script>
import { getTime } from "../assets/js/time";
import LineFigure from "./Line";
import BScroll from "better-scroll";
export default {
  name: "TimeWeather",
  props: {
    location: {
      type: String,
      default: "广州"
    }
  },
  data: () => ({
    timeWeat: [],
    length: ""
  }),
  methods: {
    async getTimeWeat() {
      let res = await this.$http(
        `/api/s6/weather/hourly?location=${this.location}&key=81e2bad677d1424d92e0a7cb36daff82`
      );
      // console.log("res ==> ", res);
      let data = res.data;
      // console.log("data ==> ", data.HeWeather6);
      this.timeWeat = data.HeWeather6[0];
      // console.log(this.timeWeat);
      this.length = this.timeWeat.hourly.length;
    },
    getTime(t, f) {
      return getTime(t, f);
    },
    _wateMsg() {
      this.$nextTick(() => {
        if (this.timeWeat.hourly) {
          if (!this.sellerScroll) {
            this.sellerScroll = new BScroll(this.$refs.timeSlider, {
              scrollX: true
            });
          } else {
            this.sellerScroll.refresh();
          }
        }
      });
    }
  },
  watch: {
    timeWeat() {
      this._wateMsg();
    }
  },
  mounted() {
    this.getTimeWeat();
    this._wateMsg();
  },
  components: {
    LineFigure
  }
};
</script>

<style lang="scss" scoped>
.box {
  font-size: 0.16rem;
}
.wt-box {
  overflow: hidden;
}
.list {
  width: 100%;
  display: flex;
  // border: 0.01rem solid #000 {
  //   left: none;
  //   right: none;
  // }
  li {
    flex: 0 0 auto;
    width: 0.65rem;
    display: inline-block;
    text-align: center;
  }
  .icon-tq {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.05rem 0;
  }
}
</style>
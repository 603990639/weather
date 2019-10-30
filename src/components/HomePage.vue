<template>
  <div class="box scrollT">
    <!-- 顶部导航栏 -->
    <div>
      <div v-if="!weat.basic" class="loding">
        <p>可可天气</p>
      </div>
      <div v-else @setloc="setLocation">
        <div class="nav-top-box" :class="scroll >= 208 ? 'opac' :''" ref="navBox">
          <div class="fl nav-left">
            <div class="img fl"></div>
            <!-- <div class v-if="!weat">加载中...</div> -->
            <div class="position-text fl">
              <span>{{weat.basic.cnty}}-</span>
              <span>{{weat.basic.admin_area}}-</span>
              <span>{{weat.basic.location}}</span>
              <p>刚刚更新</p>
            </div>
          </div>
          <ul class="fr list">
            <!-- <router-link to="/home" tag="li" ></router-link> -->
            <li @click="goHome(currentTimeMsg, location)" @></li>
            <li></li>
          </ul>
        </div>

        <!-- 动画图 -->
        <Anima class="anim"></Anima>
        <!-- 天气预报信息内容块 -->
        <div>
          <div class="weather-box">
            <!-- message -->
            <!-- 当天天气 -->
            <div class="mask">
              <p class="weat">{{currentTime.tmp}}</p>
              <div class="message">
                <span>{{currentTime.cond}}</span>
                <span>{{currentTimeMsg.tmp_max}}</span>
                <span class="diagonal-bar">/</span>
                <span>{{currentTimeMsg.tmp_min}}</span>
                <span>°C</span>
              </div>
            </div>

            <!-- 十天天气显示 -->
            <div class="weathers-box" ref="msgSlider">
              <ul class="weats-list" :style="{width: weatleng * 0.8 + 'rem'}">
                <li class="list" v-for="(w,i) in weat.daily_forecast" :key="i">
                  <p>{{i == 0 ? '今天' : '星期' + day[new Date(w.date).getDay()]}}</p>
                  <!-- (w.date) | getTime -->
                  <div class="date">{{getTime(w.date, 'MM月dd日')}}</div>
                  <div class="tq-icon">
                    <img class="auto-img" :src="require('../assets/img/tq/'+ setSrc(w) +'.png')" />
                  </div>
                  <p>
                    <span>{{w.tmp_max}}</span>/
                    <span>{{w.tmp_min}}</span>
                  </p>
                  <p>{{w.cond_txt_d}}</p>
                </li>
              </ul>
            </div>

            <!-- 最高最低温度折线图 -->
            <div class="Max-min-box">
              <!-- <div id="svg"></div> -->
              <Cs :max="tmpMax" :min="tmpMin" />

              <!-- 折线图占位div
              <p>{{tmpMax}}</p>
              <p>{{tmpMin}}</p>-->
            </div>
            <div class="fifteen-box">
              <p>15天天气预报</p>
            </div>
            <!-- 不同时间段天气 -->
            <TimeWeather></TimeWeather>

            <!-- 生活预报指数 -->
            <LifeForecast :w="weat" />
          </div>
        </div>
      </div>
    </div>

    <!-- <Home v-else :isS="isShow"></Home> -->
    <!-- <router-view></router-view> -->
  </div>
</template>
  <script src="https://d3js.org/d3.v5.min.js">
</script>
<script>
import TimeWeather from "./TimeWeather";
import { getTime } from "../assets/js/time";
import LifeForecast from "./LifeForecast";
import BScroll from "better-scroll";
import Cs from "./Cs";
import Anima from "./Anima";
// import Home from "./HomeD";
export default {
  name: "Home",
  props: {
    loc: {
      type: String,
      default: "广州"
    },
    w: {
      type: String,
      default: "广州"
    }
  },
  data() {
    return {
      // Message
      // message: {},
      currentTimeMsg: {},
      currentTime: {},
      day: ["日", "一", "二", "三", "四", "五", "六"],
      isShow: true,
      location: "",
      weat: {},
      tmpMax: [],
      tmpMin: [],
      weatleng: "",
      scroll: "",
      weats: []
    };
  },

  methods: {
    setLocation() {
      // console.log(this.location);
      // console.log(this.loc);
      this.location = this.loc;
    },
    // setho() {
    //   // console.log(this.location);
    //   // console.log(this.loc);
    //   this.location = this.w;
    // },

    setOpacity() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      let svg = document.querySelectorAll(".anim")[0];
      // console.log(Math.floor(this.scroll) / 200);
      // svg.style.opacity =
      // console.log("svg ==> ", svg.style.opacity);
    },

    // 图片拼接方法
    setSrc(w) {
      let code = null;

      // ? w.cond_code_d
      // : w.cond_code_n;
      // require(`/img/tq/${code}.png`)
      // let src = `/img/tq/${code}.png`;
      // this.url = src;
      if (new Date().getHours() >= 11 && new Date().getHours() <= 19) {
        code = w.cond_code_d;
      } else {
        code = w.cond_code_n;
        if (
          code == 100 ||
          code == 103 ||
          code == 104 ||
          code == 301 ||
          code == 406 ||
          code == 407
        ) {
          code = w.cond_code_n + "n";
        }
      }
      return code;
    },
    // 滑动实例方法
    _wateMsg() {
      this.$nextTick(() => {
        // console.log("a");
        if (this.weat.daily_forecast) {
          if (!this.sellerScroll) {
            this.sellerScroll = new BScroll(this.$refs.msgSlider, {
              scrollX: true
            });
          } else {
            this.sellerScroll.refresh();
          }
        }
      });
    },

    getTime(time, format) {
      // console.log(time);
      return getTime(time, format);
    },
    goHome(currentTimeMsg, location) {
      this.$router.push({ name: "home", params: { location } });
    },
    getTmps() {
      let max = [];
      let min = [];
      // console.log("this.weatleng", this.weatleng);
      let length = this.weatleng;
      for (let i = 0; i < length; i++) {
        max.push(this.weat.daily_forecast[i].tmp_max);
        min.push(this.weat.daily_forecast[i].tmp_min);
      }
      this.tmpMax = max;
      this.tmpMin = min;
      // console.log(this.tmpMax);
      // console.log(this.tmpMin);
      // console.log();
      // console.log();
    },
    getSvg() {
      // 设置边距以外接触边际
      const padding = { top: 20, right: 20, bottom: 20, left: 50 };
      // 设置svg的宽高
      const height = 100;
      const width = 800;
      // 坐标轴长度
      const xAxisWidth = width - padding.left - padding.right;
      const yAxisWidth = height - padding.bottom - padding.top;
      // 设置svg
      const svg = d3
        .select("#svg")
        .append("svg")
        .attr("height", height)
        .attr("width", width);
      const maxs = this.tmpMax;
      const mins = this.tmpMin;
      console.log("a ==> ", this.tmpMax);
      console.log("b ==> ", this.tmpMin);

      // 比例尺
      const xScale = d3
        .scaleBand()
        .domain(maxs.map((d, i) => i))
        .range([0, xAxisWidth])
        .padding(0.1);
      const yScale = d3
        .scaleLinear()
        .domain([
          d3.max(maxs, d => {
            return d;
          }),
          d3.min(mins, d => {
            // console.log('d2 ==>', d);
            return d;
          })
        ])
        .range([0, yAxisWidth]);
      // d3.min(temMax, d => {
      //   console.log('d2 ==>', d);
      //   return d;
      // })
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
      // console.log(`aa,${padding.left}`)
      // 定义容器
      // const pl = padding.left;
      const gx = svg
        .append("g")
        .attr(
          "transform",
          `translate(${padding.left},${height - padding.bottom})`
        );

      const gy = svg
        .append("g")
        .attr(
          "transform",
          `translate(${padding.left},${height - padding.bottom - yAxisWidth})`
        );
      gx.call(xAxis);
      gy.call(yAxis);

      const linePath = d3
        .line()
        .x((d, i) => xScale(i) + padding.left + xScale.bandwidth() / 2)
        .y(d => {
          console.log("d ==> ", d);
          return (
            height -
            padding.bottom -
            (yScale(
              d3.min(mins, d => {
                // console.log('d2 ==>', d);
                return d;
              })
            ) -
              yScale(d))
          );
        });

      svg
        .append("path")
        .attr("d", linePath(maxs))
        .attr("stroke", "#000")
        .attr("stroke-width", "2px")
        .attr("fill", "none");
      svg
        .append("path")
        .attr("d", linePath(mins))
        .attr("stroke", "#000")
        .attr("stroke-width", "2px")
        .attr("fill", "none");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$route.params.load) {
        vm.location = vm.$route.params.load;
      }
      vm.$http(
        `/api/s6/weather/forecast?location=${vm.location}&key=81e2bad677d1424d92e0a7cb36daff82`
      ).then(res => {
        vm.weat = res.data.HeWeather6[0];
        vm.weatleng = vm.weat.daily_forecast.length;
      });
      vm.$http(
        `/qq/ws/location/v1/ip?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`
      ).then(res => {
        console.log("res ==> ", res);
      });
    });
  },
  watch: {
    weat(newVal) {
      this.currentTimeMsg = newVal.daily_forecast[0];
      let max = newVal.daily_forecast[0].tmp_max;
      let mix = newVal.daily_forecast[0].tmp_min;
      let cond_d = newVal.daily_forecast[0].cond_txt_d;
      let cond_n = newVal.daily_forecast[0].cond_txt_n;

      let mours = new Date().getHours();

      let tmp = mours > 11 && mours < 19 ? max + "°" : mix + "°";
      let cond = mours > 11 && mours < 19 ? cond_d : cond_n;

      this.currentTime = {
        tmp,
        cond
      };

      if (this.weats.length === 0) {
        this.weats.push(this.location);
        localStorage.setItem("weat", JSON.stringify(this.weats));
      } else {
        // console.log(this.location);
        if (this.weats.indexOf(this.location) == -1) {
          this.weats.push(this.location);
          localStorage.setItem("weat", JSON.stringify(this.weats));
        }
      }

      this._wateMsg();

      this.getTmps();
    }
  },
  mounted() {
    // console.log(currentTime);
    // console.log(new Date().getHours());
    this._wateMsg();
    window.addEventListener("scroll", this.setOpacity);
    // console.log("setLocation ==> ", setLocation);
    this.setLocation();
    // this.setho();

    this.weats = localStorage.getItem("weat")
      ? JSON.parse(localStorage.getItem("weat"))
      : [];
  },
  components: {
    TimeWeather,
    LifeForecast,
    Cs,
    Anima
    // Home
  }
};
</script>

<style lang="scss" scoped>
.opac {
  background-image: linear-gradient(to right, #accbee 0%, #e7f0fd 100%);
  // opacity: 1;
}
.loding {
  position: fixed;
  top: 0;
  // bottom: 0;
  // right: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  font-size: 0.2rem;
  // background-color: aquamarine;
  background: url("/img/logo/jb.jpg");
  text-align: center;
  p {
    width: 1.2rem;
    height: 0.3rem;
    position: absolute;
    font-size: 0.3rem;
    top: -1rem;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.anim {
  // position: fixed;
  // top: 0;
  // z-index: 200;
  width: 100%;
  opacity: 1;
}

// 顶部导航样式
.nav-top-box {
  width: 100%;
  height: 0.7rem;
  padding: 0.25rem 0.15rem 0 0.15rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 888;
  // background-color: black;
  // background-image: linear-gradient(
  //   to right,
  //   rgb(184, 203, 184) 0%,
  //   #b8cbb8 0%,
  //   rgb(180, 101, 218) 0%,
  //   rgb(207, 108, 201) 33%,
  //   rgb(238, 96, 156) 66%,
  //   rgb(238, 96, 156) 100%
  // );
  .nav-left {
    // width: 1.2rem;
    height: 0.5rem;
    display: flex;
  }
  .img {
    // display: inline-block;
    flex: 0 0 auto;
    width: 0.32rem;
    height: 0.32rem;
    background: url("/img/logo/dw.png") no-repeat center;
    background-size: 0.18rem 0.18rem;
    margin: 0.04rem 0.1rem 0 0;
  }
  .position-text {
    flex: 1;
    // display: inline-block;
    width: 1.8rem;
    height: 0.4rem;
    vertical-align: top;
    line-height: 0.2rem;
    font-size: 0.16rem;
    p {
      font-size: 0.12rem;
      color: rgba(0, 0, 0, 0.8);
    }
  }
  .list {
    display: flex;
    margin-top: 0.08rem;
  }
  li {
    // display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    &:first-child {
      background: url("/img/logo/lz.png") no-repeat center;
      background-size: 0.22rem 0.22rem;
    }
    &:last-child {
      background: url("/img/logo/dd.png") no-repeat center;
      background-size: 0.22rem 0.22rem;
    }
  }
}

// 天气预报信息内容块样式
.weather-box {
  width: 100%;
  background-image: linear-gradient(to right, #accbee 0%, #e7f0fd 100%);

  .mask {
    width: 100%;
    // height: 44rem;
    padding: 0rem 0.2rem 0.1rem 0.2rem;
    .weat {
      // display: block;
      font-size: 0.64rem;
      margin-bottom: 0.1rem;
    }
    .message {
      display: flex;
      font-size: 0.16rem;
      margin-left: 0.08rem;
      span:first-child {
        // display: inline-block;
        margin-right: 0.1rem;
      }
      .diagonal-bar {
        margin: 0 0.05rem;
      }
    }
  }
  // 十天天气预报层
  .weathers-box {
    overflow-x: hidden;

    .weats-list {
      width: 100%;
      // height: 1rem;
      // background-color: violet;
      display: flex;
      // overflow: auto;
    }
    .list {
      flex: 1;
      display: inline-block;
      // width: 100px;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.25rem;
      padding: 0.05rem 0;
    }
    .date {
      width: 0.8rem;
      height: 0.3rem;
    }
    .tq-icon {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      // background-color: #000;
      img {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}

.Max-min-box {
  width: 100%;
  // height: 1.5rem;
  font-size: 0.16rem;
  overflow: hidden;
}
.fifteen-box {
  width: 100%;
  height: 0.3rem;
  p {
    width: 1.5rem;
    font-size: 0.14rem;
    margin-left: calc(50% - 1.5rem / 2);
    text-align: center;
    line-height: 0.3rem;
    border: 0.01rem solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 2px 1px #accbee;
    border-radius: 0.05rem;
  }
}
</style>
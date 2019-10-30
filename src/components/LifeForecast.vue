<template>
  <div class="box">
    <div class="external-box">
      <div class="flex-row">
        <div class="flex-column">
          <p class="font-color">{{lifeForecast.wind_dir}}</p>
          <p class="font-size">
            {{lifeForecast.wind_spd}}
            <span>km/h</span>
          </p>
        </div>
        <div class="flex-column">
          <p class="font-color">相对湿度</p>
          <p class="font-size">
            {{lifeForecast.hum}}
            <span>%</span>
          </p>
        </div>
      </div>

      <div class="flex-row">
        <div class="flex-column">
          <p class="font-color">降水量</p>
          <p class="font-size">{{lifeForecast.pcpn}}</p>
        </div>
        <div class="flex-column">
          <p class="font-color">降水概率</p>
          <p class="font-size">
            {{lifeForecast.pop}}
            <span>%</span>
          </p>
        </div>
      </div>

      <div class="flex-row">
        <div class="flex-column">
          <p class="font-color">大气压强</p>
          <p class="font-size">
            {{lifeForecast.pres}}
            <span>hPa</span>
          </p>
        </div>
        <div class="flex-column">
          <p class="font-color">紫外线强度指数(0-15)</p>
          <p class="font-size">{{lifeForecast.uv_index}}</p>
        </div>
      </div>

      <div class="flex-row">
        <div class="flex-column">
          <p class="font-color">能见度</p>
          <p class="font-size">
            {{lifeForecast.vis}}
            <span>km</span>
          </p>
        </div>
        <div class="flex-column">
          <p class="font-color">PM2.5</p>
          <p class="font-size">
            52
            <span>μg/m³</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LifeFore",
  props: {
    w: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    lifeForecast: ""
  }),
  methods: {},
  watch: {
    // w(newVal) {
    //   console.log(newVal);
    // }
  },
  mounted() {
    this.lifeForecast = this.w.daily_forecast[0];
    // console.log("this.lifeForecast ==> ", this.lifeForecast);
  }
};
</script>

<style lang="scss" scoped>
.box {
  font-size: 0.16rem;
  padding-bottom: 0.35rem;
}
.external-box {
  display: flex;
  flex-direction: column;
  text-align: left;
  .flex-row {
    flex: 1;
    display: flex;
    align-content: space-between;
    .flex-column {
      padding-left: 0.15rem;
      flex: 1;
      height: 0.7rem;
    }
  }
  .font-size {
    margin-top: 0.08rem;
    font-size: 0.18rem;
    span {
      font-size: 0.14rem;
      margin-left: 0.02rem;
    }
  }
  .font-color {
    color: rgba(0, 0, 0, 0.2);
  }
}
</style>
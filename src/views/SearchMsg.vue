<template>
  <div class="box">
    <div class="loding" v-if="hotCitities.length === 0">
      <!-- <div class="nav-box">
        <div @click="rePage" class="icon-fh fl"></div>
        <div class="ipt-txt fl">
          <input type="text" placeholder="城市名" v-model="cityStr" />
        </div>
      </div>-->
    </div>
    <div v-else>
      <div class="nav-box">
        <div @click="rePage" class="icon-fh fl"></div>
        <div class="ipt-txt fl">
          <input type="text" placeholder="城市名" v-model="cityStr" />
        </div>
      </div>
      <LineFigure></LineFigure>
      <div class="city-box" v-if="isShow">
        <h3 class="text">热门城市</h3>
        <ul class="list">
          <li v-for="(h, i) in hotCitities" :key="i" @click="reHomePage(h.location)">
            <span>{{h.location}}</span>
          </li>
        </ul>
      </div>
      <div class="search-ipt">
        <ul>
          <li
            class="city-list"
            v-for="(city,index) in cityList.basic"
            :key="index"
            @click="reHomePage(city.location)"
          >
            <span>{{city.admin_area}}</span>
            <span>{{city.location}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import LineFigure from "../components/Line";
export default {
  name: "SearchMsg",
  data: () => ({
    hotCitities: [],
    cityList: [],
    cityStr: "",
    isShow: true
  }),
  methods: {
    rePage() {
      this.$router.go(-1);
    },
    // 跳转主页面
    reHomePage(load) {
      this.$router.push({ name: "page", params: { load } });
    },
    async getHotCities() {
      let res = await this.$http(
        `/search/top?group=cn&number=20&key=81e2bad677d1424d92e0a7cb36daff82`
      );
      // console.log("res ==> ", res);
      let data = res.data;
      // console.log("data ==> ", data.HeWeather6);
      this.hotCitities = data.HeWeather6[0].basic;
      // console.log("a ==> ", this.hotCitities);
      // this.length = this.timeWeat.hourly.length;
    },
    async getCityList() {
      let res = await this.$http(
        `/search/find?group=cn&mode=match&location=${this.cityStr}&number=10&key=81e2bad677d1424d92e0a7cb36daff82`
      );
      // console.log("res ==> ", res);
      // console.log("a ==> ", this.cityStr);
      let data = res.data;
      // console.log("data ==> ", data.HeWeather6);
      this.cityList = data.HeWeather6[0];
      if (this.cityStr === "") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      // console.log("a ==> ", this.hotCitities);
      // this.length = this.timeWeat.hourly.length;
    }
  },
  mounted() {
    this.getHotCities();
  },
  components: {
    LineFigure
  },
  watch: {
    cityStr() {
      // 实现input连续输入，只发一次请求
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getCityList();
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  font-size: 0.16rem;
}
.loding {
  position: fixed;
  top: 0;
  // bottom: 0;
  // right: 0;
  // left: 0;
  width: 100%;
  height: 100%;
  // background: url("/img/logo/jb.jpg");
  // background-color: black;
  // text-align: center;
}
.nav-box {
  width: 100%;
  height: 0.35rem;
  padding: 0.45rem 0.15rem 0.15rem 0.15rem;
}
.icon-fh {
  width: 0.3rem;
  height: 0.3rem;
  background: url("/img/logo/fh.png") no-repeat center;
  background-size: 0.25rem 0.25rem;
}
.text {
  margin-left: 0.15rem;
  color: rgb(72, 26, 199);
  font-weight: 500;
}
.ipt-txt {
  width: calc(100% - 0.4rem);
  height: 0.35rem;
  input {
    width: calc(100% - 0.4rem);
    height: 0.35rem;
    border: none;
    font-size: 0.2rem;
    outline: none;
    padding-left: 0.15rem;
    background-color: #f2f2f2;
  }
}
.list {
  width: 100%;
  margin-top: 0.2rem;
  padding: 0 0.1rem;
  display: flex;
  flex-wrap: wrap;
  li {
    flex: 0 0 auto;
    width: 0.78rem;
    // padding: 0 0.25rem;
    text-align: center;
    height: 0.3rem;
    border-radius: 0.15rem;
    margin: 0.1rem 0.05rem;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 0.3rem;
    span {
      display: inline-block;
      font-size: 0.16rem;
      min-width: 0.5rem;
    }
  }
}

.search-ipt {
  width: 100%;
  // height: 2rem;
  // background-color: violet;
  // padding: 0 0.3rem;
}

.city-list {
  padding: 0.1rem 0;
  margin-bottom: 0.1rem;
  text-align: center;
  // box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.3);
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.2);
}
</style>
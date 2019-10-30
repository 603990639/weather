<template>
  <div class="home">
    <div>
      <div class="nav-box">
        <i @click="returnF(location)"></i>
        <span>选择城市</span>
      </div>
      <!-- <div>测试</div> -->
      <!-- <div>{{location}}</div> -->
      <!-- <div>{{weats}}</div> -->
      <div class="list-box">
        <ul class="list">
          <li v-for="(te, i) in weats" :key="i" @click="returnF(te)">
            <div>
              <span>{{te}}</span>
              <i class="close" @click.stop="deleteLi(te)">x</i>
            </div>
            <div class="tc">
              <span>{{tmp[i]}}°</span>
              <span>{{cond[i]}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="search" @click="skipSearch">+</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  props: {
    location: String
  },
  data: () => ({
    weats: [],
    weat: {},
    tmp: [],
    cond: []
  }),

  methods: {
    // 删除记录
    deleteLi(t) {
      // console.log("t ==> ", t);
      let index = this.weats.indexOf(t);
      // console.log(index);
      this.weats.splice(index, 1);
      localStorage.setItem("weat", JSON.stringify(this.weats));
    },
    // 跳转搜索页面
    skipSearch() {
      this.$router.push({ path: "/search" });
    },
    returnF(loc) {
      // this.$router.go(-1);
      // let isT = true;
      // this.$router.go(-1);
      console.log(loc);
      this.$router.push({ name: "page", params: { loc } });
      this.$emit("setloc");
      // console.log(this.location);
      // return true;
    }
  },

  mounted() {
    // this.getTimeWeat();

    this.weats = localStorage.getItem("weat")
      ? JSON.parse(localStorage.getItem("weat"))
      : [];

    if (this.weats.indexOf("广州") > 0) {
      let i = this.weats.indexOf("广州");
      console.log("i ==> ", i);
      let gz = this.weats.splice(i, 1);
      console.log("gz ==> ", gz[0]);
      this.weats.unshift(gz[0]);
      localStorage.setItem("weat", JSON.stringify(this.weats));
    }

    for (let i = 0; i < this.weats.length; i++) {
      this.$http(
        `/api/s6/weather/hourly?location=${this.weats[i]}&key=81e2bad677d1424d92e0a7cb36daff82`
      ).then(res => {
        let data = res.data;
        // console.log(data.HeWeather6[0].hourly[0].tmp);
        this.tmp.push(data.HeWeather6[0].hourly[0].tmp);
        this.cond.push(data.HeWeather6[0].hourly[0].cond_txt);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  font-size: 0.16rem;
  width: 100%;
  min-height: 6.67rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #f2f2f2;
}

.close {
  display: inline;
  // text-align: right;
  margin-left: 80%;
  font-size: 0.18rem;
}

.nav-box {
  width: 100%;
  height: 1rem;
  padding: 0.5rem 0.15rem 0.2rem 0.15rem;
  background-color: #f2f2f2;
  position: fixed;
  top: 0;
  left: 0;
  // background-color: violet;
  z-index: 999;
  i {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    margin-right: 0.2rem;
    background: url("/img/logo/fh.png") no-repeat center;
    background-size: 0.25rem 0.25rem;
  }
  span {
    display: inline-block;
    font-weight: bold;
    height: 0.32rem;
    line-height: 0.32rem;
    vertical-align: top;
    font-size: 0.2rem;
  }
}
.list-box {
  width: 100%;
  height: 6.4rem;
  // overflow: hidden;
  overflow-y: auto;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0rem 0.15rem 0 0.15rem;
  margin-top: 1.2rem;
  // transform: translateY(1.2rem);
  li {
    flex: 0 0 auto;
    width: 100%;
    height: 1.5rem;
    color: #fff;
    // border: 1px solid #000;
    background-image: linear-gradient(
      to top,
      #dbdcd7 0%,
      #dddcd7 24%,
      #e2c9cc 30%,
      #e7627d 46%,
      #b8235a 59%,
      #801357 71%,
      #3d1635 84%,
      #1c1a27 100%
    );
    margin: 0.1rem 0;
    padding: 0.2rem;
    line-height: 0.25rem;
    border-radius: 0.1rem;
    div {
      margin-bottom: 0.08rem;
    }
  }
  .close:first-child {
    display: none;
    color: #000;
  }
}
.tc {
  span {
    margin-right: 0.05rem;
  }
}

.search {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 0.7rem;
  position: fixed;
  bottom: 0.15rem;
  font-size: 0.3rem;
  font-weight: bold;
  right: 0.15rem;
}
</style>

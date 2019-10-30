<template>
  <div id="app">
    <!-- <HomePage :weat="weather"></HomePage> -->
    <transition name="homes">
      <router-view :location="location" />
    </transition>
  </div>
</template>

<script>
// import HomePage from "./components/HomePage";
export default {
  data: () => {
    return { location: "广州", weather: {} };
  },
  mounted() {},
  components: {
    // HomePage
  }
};
</script>

<style lang="scss">
@import url("./assets/css/index.scss");
.homes-enter,
.home-leave-to {
  transform: translateY(100%);
  opacity: 0.5;
}
.homes-enter-active,
.hone-leave-avtive {
  transition: all 0.7s linear;
}
.homes-enter-to,
.home-leave {
  transition: translateY(0);
  opacity: 1;
}
</style>

<template>
  <div class="box">
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "LineFigure"
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  font-size: 0.16rem;
  padding: 0.1rem 0;
}
.line {
  // display: block;
  width: 100%;
  height: 0.01rem;
  // background-color: rgba(0, 0, 0, 0.2);
  border-top: 0.01rem solid rgba(0, 0, 0, 0.2);
  transform: scaleY(0.5);
  margin: 0.1rem 0;
}
</style>
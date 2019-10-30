<template>
  <div>
    <div id="animation" class="animation"></div>
  </div>
</template>

  <script src="https://d3js.org/d3.v5.min.js">
</script>
<script>
export default {
  name: "Anima",
  methods: {
    setAnima() {
      let height = 280;
      let width = "100%";

      let svg = d3
        .select("#animation")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      // #accbee   蓝
      // #e7f0fd   白

      let circleR1 = svg
        .append("circle")
        .attr("class", "myCircle")
        .attr("cx", "90%")
        .attr("cy", -100)
        .attr("r", 160)
        .attr("fill", "#accbee");

      let circleR2 = svg
        .append("circle")
        .attr("class", "myCircleO3")
        .attr("cx", "80%")
        .attr("cy", -40)
        .attr("r", 200)
        .attr("fill", "#accbee");

      let circleL2 = svg
        .append("circle")
        .attr("class", "myCircleO3")
        .attr("cx", 40)
        .attr("cy", -20)
        .attr("r", 150)
        .attr("fill", "#6485b8");

      let circleL1 = svg
        .append("circle")
        .attr("class", "myCircle")
        .attr("cx", 40)
        .attr("cy", -100)
        .attr("r", 120)
        .attr("fill", "#e7f0fd");

      let circleL3 = svg
        .append("circle")
        .attr("class", "myCircleO5")
        .attr("cx", 80)
        .attr("cy", 0)
        .attr("r", 180)
        .attr("fill", "#e7f0fd");

      let circleM2 = svg
        .append("circle")
        .attr("class", "c1")
        .attr("cx", "50%")
        .attr("cy", -100)
        .attr("r", 120)
        .attr("fill", "#c1d5f3");

      let run = () => {
        // circle.transition().duration(1000).attr("cy", 200)
        //   .transition().duration(1000).attr("cy", 70)
        //   .on('end', run)
        circleL1
          .transition()
          .duration(2500)
          .ease(d3.easeLinear)
          .attr("cy", -80)
          .transition()
          .duration(2500)
          .ease(d3.easeLinear)
          .attr("cy", -100)
          .on("end", run);

        circleR1
          .transition()
          .duration(4500)
          .ease(d3.easeLinear)
          .attr("cx", "80%")
          .attr("cy", 10)
          .transition()
          .duration(4500)
          .ease(d3.easeLinear)
          .attr("cx", "90%")
          .attr("cy", -100)
          .on("end", run);

        circleR2
          .transition()
          .duration(5500)
          .ease(d3.easeLinear)
          .delay(100)
          .attr("cy", -20)
          .transition()
          .duration(5500)
          .ease(d3.easeLinear)
          .attr("cy", -100)
          .on("end", run);

        circleM2
          .transition()
          .duration(3500)
          .ease(d3.easeLinear)
          .attr("cy", -70)
          .transition()
          .duration(3500)
          .ease(d3.easeLinear)
          .attr("cy", -100)
          .on("end", run);

        circleL2
          .transition()
          .duration(2500)
          .attr("cx", 50)
          .attr("cy", 20)
          .ease(d3.easeLinear)
          .delay(2500)
          .transition()
          .duration(2500)
          .attr("cx", 40)
          .attr("cy", -20)
          .ease(d3.easeLinear)
          .on("end", run);

        circleL3
          .transition()
          .duration(2500)
          .attr("cy", 30)
          .ease(d3.easeLinear)
          .delay(1800)
          .transition()
          .duration(2800)
          .attr("cy", 0)
          .ease(d3.easeLinear)
          .on("end", run);
      };
      run();
    }
  },
  mounted() {
    this.setAnima();
  }
};
// d3.js的样式设置不能添加 lang="scss" scoped, 否则样式无效
</script>


<style>
.animation {
  background-image: linear-gradient(to right, #accbee 0%, #e7f0fd 100%);
}
.myCircleO3 {
  opacity: 0.3;
}

.myCircleO4 {
  opacity: 0.4;
}

.myCircleO5 {
  opacity: 0.5;
}
.c1 {
  background-color: black;
}
</style>
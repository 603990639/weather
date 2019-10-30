<template>
  <div>
    <h3 class="text">未来五天温度差：</h3>
    <LineFigure class="lineA"></LineFigure>

    <div id="svg" ref="svgSlider"></div>
    <!-- <div>{{max}}</div> -->
  </div>
</template>

<script src="https://d3js.org/d3.v5.min.js">
</script>

<script>
import BScroll from "better-scroll";
import LineFigure from "./Line";

export default {
  name: "Cs",
  props: {
    max: Array,
    min: Array
  },
  methods: {
    getSvg() {
      // 设置边距以外接触边际
      // console.log("a ==> ", this.max.slice(0, 5));
      // const temMax = [this.max[0], ...this.max.slice(0, 5), this.max[0]];
      // const temMin = [this.min[0], ...this.min.slice(0, 5), this.min[0]];
      const temMax = this.max.slice(0, 5);
      const temMin = this.min.slice(0, 5);

      const temMaxa = this.max.slice(0, 4);
      const temMinb = this.min.slice(0, 4);
      // console.log(temMax);
      // console.log(temMin);
      const padding = { top: 20, right: 20, bottom: 20, left: 40 };
      // 设置svg的宽高
      const height = 150;
      const width = 350;
      // 坐标轴长度
      const xAxisWidth = width;
      const yAxisWidth = height - padding.bottom - padding.top;
      // 设置svg
      const svg = d3
        .select("#svg")
        .append("svg")
        .attr("height", height)
        .attr("width", width);

      // 比例尺
      const xScale = d3
        .scaleBand()
        .domain(temMax.map((d, i) => i))
        .range([0, xAxisWidth])
        .padding(0.1);
      const yScale = d3
        .scaleLinear()
        .domain([
          d3.max(temMax, d => {
            // console.log(xScale);
            // console.log(xScale);
            return d;
          }),
          d3.min(temMin)
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
      // const gx = svg
      //   .append("g")
      //   .attr(
      //     "transform",
      //     `translate(${padding.left / 2},${height - padding.bottom})`
      //   );

      // const gy = svg
      //   .append("g")
      //   .attr(
      //     "transform",
      //     `translate(${padding.left},${height - padding.bottom - yAxisWidth})`
      //   );
      // gx.call(xAxis);
      // gy.call(yAxis);

      const linePath = d3
        .line()
        .x((d, i) => xScale(i) + padding.left + xScale.bandwidth() / 2)
        .y(d => {
          // console.log(
          //   "d ==> ",
          //   height - padding.bottom - (yScale(d3.min(temMin)) - yScale(d))
          // );
          return height - padding.bottom - (yScale(d3.min(temMin)) - yScale(d));
        });

      svg
        .append("path")
        .attr("d", linePath(temMax))
        .attr("stroke", "#000")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("transform", `translate(-${padding.left},0)`);
      svg
        .append("path")
        .attr("d", linePath(temMin))
        .attr("stroke", "#000")
        .attr("stroke-width", "1px")
        .attr("fill", "none")
        .attr("transform", `translate(-${padding.left},0)`);

      function setCircle(data) {
        svg
          .selectAll("Mycircle")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 2)
          .attr("cx", function(d, i) {
            // console.log(i);
            return xScale(i);
          })
          .attr("cy", function(d, i) {
            // console.log("temMax ==> ", d);
            // return yScale(d => {
            // console.log(yScale(18) - yScale(d));
            return (
              height - padding.bottom - (yScale(d3.min(temMin)) - yScale(d))
            );
            // })
          })
          .attr("fill", "#66ccff")
          .text(d => d)
          .attr("transform", `translate(${padding.left - 10},0)`);
      }

      function setStr(data) {
        svg
          .selectAll("Mycircle")
          .data(data)
          .enter()
          .append("text")
          .attr("fill", "#000")
          .attr("font-size", "12px")
          .attr("text-anchor", "middle")
          .attr("x", function(d, i) {
            // console.log(i);
            return xScale(i);
          })
          .attr("y", function(d, i) {
            return (
              height - padding.bottom - (yScale(d3.min(temMin)) - yScale(d))
            );
            // })
          })
          .attr("transform", `translate(${padding.left},-10)`)
          .text(d => {
            return d + "°";
          });
      }

      setCircle(temMax);
      setCircle(temMin);

      setStr(temMax);
      setStr(temMin);
    },
    _wateMsg() {
      this.$nextTick(() => {
        // console.log("a");
        if (this.max) {
          if (!this.sellerScroll) {
            this.sellerScroll = new BScroll(this.$refs.svgSlider, {
              scrollX: true
            });
          } else {
            this.sellerScroll.refresh();
          }
        }
      });
    }
  },
  mounted() {
    this.getSvg();
    this._wateMsg();
  },
  components: {
    LineFigure
  }
};
</script>

<style lang="scss" scoped>
.text {
  padding-left: 0.15rem;
  margin-top: 0.1rem;
  font-size: 0.14rem;
  color: #eef1f5;
}

.lineA {
  height: 0.25rem;
  margin-top: 0rem;
  padding-top: 0rem;
}
</style>
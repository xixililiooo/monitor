<template>
  <div id="vmcenter">
    <VmCenterTop :centerTop="centerTop"></VmCenterTop>
    <VmPanel>
      <div slot="panelcontent">
        <h2>人流量变化曲线</h2>
        <div class="chart population"></div>
      </div>
    </VmPanel>
    <div class="extend_wrapper">
      <div class="result_img_wrapper">
        <img :src="resultImg" class="result_img" alt="" />
      </div>
      <div class="areas_chart">

      </div>
      <div class="each_day"></div>
    </div>
  </div>
</template>

<script>
import VmCenterTop from "./common/VmCenterTop.vue";
import VmPanel from "./common/VmPanel.vue";
import { addChart } from "@/commonfun/charts.js";
import chartData from '@/const/populationData'
import { centerTop,populationFieldData, countMap } from '@/const/population'
import dayjs from 'dayjs'
let flag = true;
export default {
  name: "population",
  components: {
    VmCenterTop,
    VmPanel,
  },
  data(){
    return {
      centerTop: centerTop,
      testCount: 10,
      baseChartData: chartData.echartsForPopulation,
      eachDayChartData: chartData.echartsForEachDay,
      allAreaChartData: chartData.echartsForAllArea,
      testData: populationFieldData,
      resultImg: ''
    }
  },
  watch: {
    baseChartData:{
      deep: true,
      handler(){
      let deadheal = document.querySelector(".population");
      addChart(deadheal, this.baseChartData);
      }
    },
    eachDayChartData: {
      deep: true,
      handler(){
        let eachDay = document.querySelector(".each_day")
        addChart(eachDay, this.eachDayChartData);
      }
    },
    allAreaChartData: {
      deep: true,
      handler(){
        let areaChart = document.querySelector(".areas_chart")
        addChart(areaChart, this.allAreaChartData);
      }
    }
  },
  methods: {},
  mounted() {
    let deadheal = document.querySelector(".population");
    addChart(deadheal, this.baseChartData);
    let eachDay = document.querySelector(".each_day")
    addChart(eachDay, this.eachDayChartData);
    let areaChart = document.querySelector(".areas_chart")
    addChart(areaChart, this.allAreaChartData);
  },
  created() {
    const socket = new WebSocket("ws://www.starix.top:8051/data");
    socket.onopen = function () {
			console.log('链接打开')
		};
		socket.onmessage = (res) => {
      let { data } = res;
      data = JSON.parse(data);
      countMap[data.area_code] = data.detected_count;
        if(flag){
          flag = false;
          setTimeout(() => {
            flag = true;
            if(populationFieldData.areaCode === data.area_code){
              let date = dayjs().format("YYYY-MM-DD HH:mm:ss");
              let xArr = chartData.echartsForPopulation.xAxis.data;
              let yArr = chartData.echartsForPopulation.series[1].data;
              if(xArr.length >= 15){
                xArr.shift();
                yArr.shift();
              }
              xArr.push(date);
              yArr.push(data.detected_count || 0)
              let limitArr = new Array(xArr.length).fill(this.centerTop.threshold);
              this.baseChartData.series[0].data = [...limitArr];
              this.resultImg = data.detected_image;
              }
              const areasCountArr = Object.keys(countMap).map(key => {
                const newItem = {
                  value: countMap[key],
                  name: key
                };
                return newItem;
              })
              this.allAreaChartData.series[0].data = [...areasCountArr]
          }, 5000);
        }
        this.centerTop.nowCount = data.detected_count || 0; 
    }
    // setInterval(() => {
    //   this.testCount++;
    //   if(flag){
    //     flag = false;
    //     setTimeout(() => {
    //       flag = true;
    //       let date = dayjs().format("YYYY-MM-DD HH:mm:ss");
    //       let xArr = this.baseChartData.xAxis.data;
    //       let yArr = this.baseChartData.series[1].data;
    //       if(xArr.length >= 15){
    //         xArr.shift();
    //         yArr.shift();
    //       }
    //       xArr.push(date);
    //       yArr.push(this.testCount || 0)
    //       let limitArr = new Array(xArr.length).fill(this.centerTop.threshold);
    //       this.baseChartData.series[0].data = [...limitArr];
    //     }, 5000);
    //   }
    //   this.centerTop.nowCount = this.testCount || 0;
    // }, 1000);
  },
};
</script>
<style scoped>
#vmcenter {
  /* height: 100px;
		background-color: #000088; */
  padding: 0 10px 15px;
  color: white;
}
.extend_wrapper {
  display: flex;
  justify-content: space-between;
}
.population {
  height: 100vh;
}
.each_day {
  height: 500px;
  width: 30%;
  border: 2px solid white;
}
.areas_chart {
  width: 30%;
  height: 500px;
  border: 2px solid white;
}
.result_img_wrapper {
  width: 30%;
  border: 2px solid white;
}
.result_img {
  max-width: 100%;
}
</style>

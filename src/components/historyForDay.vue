<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" class="history_form" inline>
				<el-form-item :label="item.label" 
				v-for="(item, index) in historyFieldForDay"
				:key="index"
				>
				<component :is='"el-"+item.type'
          v-model="form[item.prop]"
          v-on="item.events"
          v-bind="item.attrs"
				>
					<template v-if="item.type==='select'">
						<el-option v-for="(op, index_op) in item.values" 
						:key="index_op"
						:label="op.label"
						:value="op.value"
						>
						</el-option>
					</template>
				</component>
				</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleHistroyForDaySubmit">提交</el-button>
      </el-form-item>
		</el-form>
    <div class="history_for_day">

    </div>
  </div>
</template>

<script>
import chartData from '@/const/populationData'
import { historyFieldForDay } from '@/const/population'
import { addChart } from "@/commonfun/charts.js";
export default {
  data(){
    return {
      historyFieldForDay: historyFieldForDay,
      echartsForHistory: chartData.echartsForHistory,
      historyTableData: [],
      form: {},
      loading: false
    }
  },
  watch: {
    echartsForHistory: {
      deep: true,
      handler(){
        let deadheal = document.querySelector(".history_for_day");
        addChart(deadheal, this.echartsForHistory);
      }
    }
  },
  methods: {
    handleHistroyForDaySubmit(){
      this.$axios.post("http://www.starix.top:9901/data/statistics",this.form).then(({ data }) => {
        let { code, data: historyEchartsData } = data;
        if(code === 200){
          let xArr = this.echartsForHistory.xAxis.data;
          let maxArr = this.echartsForHistory.series[0].data;
          let minArr = this.echartsForHistory.series[1].data;
          let avgArr = this.echartsForHistory.series[2].data;
          historyEchartsData.forEach( item =>{
            xArr.push(item.date);
            maxArr.push(item.maxCount);
            minArr.push(item.minCount);
            avgArr.push(item.avgCount);
          })
          this.$message({
            type: "success",
            message: "加载成功"
          })
        }else{
          this.$message({
            type: "error",
            message: "加载失败"
          })
          console.log('data error!');
        }
      })
    }
  }
}
</script>
<style>
.history_form {
  margin-top: 50px;
}
.history_for_day {
 height: 80vh;
}
</style>

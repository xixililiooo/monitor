<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :class="s.history_form" inline>
				<el-form-item :label="item.label" 
				v-for="(item, index) in historyField"
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
        <el-button type="primary" @click="handleHistroySubmit">提交</el-button>
      </el-form-item>
		</el-form>
    <div :class="s.history_table_wrapper">
      <el-table
      :data="historyTableData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in HistoryTableFiled"
        :key="index"
        v-bind="item"
      >
      <template slot-scope="scope">
        <img v-if="item.prop === 'detectedImage'" :src="scope.row.detectedImage" width="150px" height="200px"/>
        <span v-else >{{scope.row[item.prop]}}</span>
      </template>
      </el-table-column>
      </el-table>
    </div>
    <div :class="s.history_page_wrapper">
          <el-pagination
  background
  layout="prev, pager, next"
  :page-size="pagation.size"
  :current="pagation.current"
  :total="pagation.total"
  @current-change="handlePageChange"
  >
</el-pagination>
    </div>
  </div>
</template>

<script>
import chartData from '@/const/populationData'
import { historyField, HistoryTableFiled } from '@/const/population'
export default {
  data(){
    return {
      historyData: chartData.echartsForHistory,
      historyField: historyField,
      HistoryTableFiled: HistoryTableFiled,
      historyTableData: [],
      form: {
        filterTime: []
      },
      pagation: {
        size: 20,
        current: 1,
        total: 0
      },
      loading: false
    }
  },
  computed: {
    historyFormData(){
      let startTime = this.form.filterTime[0];
      let endTime = this.form.filterTime[1];
      return {
        areaCode: this.form.areaCode,
        startTime,
        endTime
      }
    }
  },
  methods: {
    handleHistroySubmit(){
      this.gethistoryData(this.historyFormData)
    },
    gethistoryData(formData){
      this.loading = true;
        this.$axios.post("http://www.starix.top:9901/data/query",formData).then( ({ data }) => {
          let { code , data:historyData } = data;
          if(code === 200 ){
            let { records, total } = historyData;
            this.historyTableData = records.map( item => {
              return {
                detectedCount: item.detectedCount,
                overflow: item.overflow,
                detectedImage: item.detectedImage,
                createTime: item.createTime
              }
            })
            this.pagation.total = total;
          } else{
            console.log(data);
          }
          this.loading = false;
        }).catch((error)=>{ console.log(error)})
    },
    handlePageChange(currentPage){
      this.pagation.current = currentPage;
      const formData = {...this.historyFormData,...this.pagation};
      this.gethistoryData(formData);
    }
  }
}
</script>
<style module="s">
.history_form {
  margin: 50px 0;
  display: flex;
  justify-content: center;
}
.history_table_wrapper {
  padding: 0 20px;
}
.history_page_wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>

<template>
  <div :class="s.new_scene_wrapper">
    <el-form ref="form" :model="form" label-width="80px" inline>
				<el-form-item :label="item.label" 
				v-for="(item, index) in baseInfoField"
				:key="index"
				>
				<component :is='"el-"+item.type' :key="index" 
				v-model="form[item.prop]"
				v-on="item.attrs"
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
          <el-button type="primary" @click="handleNewSceneSubmit">提交</el-button>
        </el-form-item>
			</el-form>
  </div>
</template>

<script>
import chartData from '@/const/populationData'
import { baseInfoField } from '@/const/population'
export default {
  data(){
    return {
      baseInfoField: baseInfoField,
      form: {}
    }
  },
  methods: {
    handleNewSceneSubmit(){
      this.$axios.post("http://www.starix.top:9901/common/createNewArea",this.form, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      }).then(({ data }) => {
        console.log(data);
        let { code } = data;
        if(code === 200){
          this.$message({
            message: "添加成功",
            type: "success"
          })
        }else{
          this.$message({
            message: "添加失败",
            type: "success"
          })
        }
      })
    }
  }
}
</script>
<style module="s">
.new_scene_wrapper {
  margin-top: 50px;
}
</style>

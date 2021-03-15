<template>
  <div :class="s.new_scene_wrapper">
    <el-form ref="form" :model="form" label-width="80px" inline :class="s.form_wrapper">
				<el-form-item :label="item.label" 
				v-for="(item, index) in uploadField"
				:key="index"
				>
				<component :is='"el-"+item.type' :key="index" 
				v-model="form[item.prop]"
				v-bind="item.attrs"
        v-on="item.events"
        v-on.native="item.nativeEvents"
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
        <el-form-item label="文件上传">
          <input type="file" name="file" id="file" @change="handleFileChange">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUploadSubmit">提交</el-button>
        </el-form-item>
			</el-form>
      <div :class="s.result_wrapper">
        <el-card v-for="(item, index) in resultList" :key="index" :class="s.result_item">
          <img :src="item.image" :alt="item.text" width="300px" height="250px">
          <div :style="{ 'text-align': 'center'}">{{ item.text }}</div>
        </el-card>
      </div>
  </div>
</template>

<script>
import { uploadField } from '@/const/population'
export default {
  data(){
    return {
      uploadField: uploadField,
      formData: new FormData(),
      resultList: [],
      form: {}
    }
  },
  methods: {
    handleUploadSubmit(){
      this.formData.append("areaType", this.form.areaType);
      this.$axios.post("http://www.starix.top:9901/upload/detect",this.formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }).then(({ data }) => {
        let { data: resultData, code, message } = data;
        if(code === 200){
            this.resultList.push({
            image: resultData.originImage,
            text: '原图'
          })
          this.resultList.push({
            image: resultData.detectedImage,
            text: `识别后的图,识别结果为：${resultData.detectedCount}`
          })
          this.$message({
            type: "success",
            message
          })
        }else {
          this.$message({
            type: "error",
            message
          })
        }
      }).catch(()=>{
        this.$message({
            type: "error",
            message: 'request error'
          })
      })
    },
    handleFileChange(event){
      let [ file ] = event.target.files;
      this.formData.append('file', file);
    }
  }
}
</script>
<style module="s">
.new_scene_wrapper {
  margin-top: 50px;
}
.form_wrapper {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
.result_wrapper {
  display: flex;
  justify-content: space-around;
}
</style>

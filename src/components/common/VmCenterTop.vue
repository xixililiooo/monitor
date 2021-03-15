<template>
  <div id="vmcentertop">
		<div class="population_field_wrapper">
			<el-form ref="form" :model="form" label-width="80px" inline>
				<el-form-item :label="item.label" 
				v-for="(item, index) in populationField"
				:key="index"
				>
				<component :is='"el-"+item.type' :key="index" 
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
					<el-button type="primary">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	  <div class="tophd">
		  <ul>
		  	<li>{{centerTop.nowCount}}</li>
		  	<li>{{centerTop.threshold}}</li>
		  </ul>
	  </div>
	  <div class="topbd">
		  <ul>
		  	<li>当前流量</li>
		  	<li>流量阀值</li>
		  </ul>
	  </div>
	  
  </div>
</template>

<script>
import { populationField, populationFieldData } from '@/const/population'
	export default {
		name:'vmcentertop',
		data(){
			return {
				populationField: populationField,
				form: populationFieldData
			}
		},
		props:{
			centerTop:{
				nowCount: 0,
				threshold: 0
			}
		},
		created(){
			console.log(this)
		}
	}
</script>
<style scoped>
	#vmcentertop{
		background-color: rgba(101, 132, 226, 0.1);
		padding: 15px;
	}
	.population_field_wrapper{
		display: flex;
		justify-content: center;
		margin: 20px 0;
	}
	.tophd{
		position: relative;
		border: 1px solid rgba(25, 186, 139, 0.17);
	}
	.tophd:before{
		position: absolute;
		top: 0;
		left: 0;
		content: "";
		width: 30px;
		height: 60px;
		border-top: 2px solid #02a6b5;
		border-left: 2px solid #02a6b5;
	}
	.tophd:after{
		position: absolute;
		bottom: 0;
		right: 0;
		content: "";
		width: 30px;
		height: 60px;
		border-right: 2px solid #02a6b5;
		border-bottom: 2px solid #02a6b5;
	}
	
	.tophd ul{
		display: flex;
	}
	.tophd li{
		position: relative;
		flex: 1;
		height: 80px;
		font-size: 45px;
		line-height: 80px;
		color: #ffeb7b;
		text-align: center;
		font-family:electronicFont;
	}
	.tophd lI:after{
		content: '';
		position: absolute;
		top:25%;
		right: 0;
		height: 50%;
		width: 1px;
		background-color: rgba(255, 255, 255, 0.2);
		
	}
	
	
	.topbd ul{
		display: flex;
	}
	.topbd ul li{
		flex: 1;
		height: 40px;
		font-size:18px;
		padding-top: 10px;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);
	}
	
</style>

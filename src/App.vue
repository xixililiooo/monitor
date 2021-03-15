<template>
  <div id="app">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
  <el-menu-item 
	v-for="(item, index) in MenuConfig"
	:key="index"
	:index="item.path"
	>{{ item.text}} </el-menu-item>
</el-menu>
<router-view></router-view>
  </div>
</template>
<script>
import { MenuConfig } from '@/const/population'
export default {
	data(){
		return {
			activeIndex: "0",
			MenuConfig: MenuConfig
		}
		
	}
}
</script>


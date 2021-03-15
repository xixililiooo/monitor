//添加echart图表
export function addChart(dom,option){
	let myChart = echarts.init(dom);
	myChart.setOption(option);
	window.addEventListener("resize", function() {
	  myChart.resize();
	});
	return myChart;
}

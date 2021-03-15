const echartsForPopulation = {  //人流量实时监控图表配置
  tooltip: {
      trigger: 'axis'
  },
  legend: {
      data: ['人流量阈值', '当前人流量']
  },
  grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  toolbox: {
      feature: {
          saveAsImage: {}
      }
  },
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
  },
  yAxis: {
      type: 'value'
  },
  series: [
      {
          name: '人流量阈值',
          type: 'line',
          data: []
      },
      {
          name: '当前人流量',
          type: 'line',
          data: []
      }
  ]
};
const echartsForHistory = {  //历史记录图表配置
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['人流量阈值', '当前人流量']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '最大值',
            type: 'line',
            data: []
        },
        {
            name: '最小值',
            type: 'line',
            data: []
        },
        {
            name: "平均值",
            type: "line",
            data: []
        }
    ]
};
const echartsForEachDay = {  //首页历史数据图标配置
    title: {
        text: '历史七天最值数据',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // Use axis to trigger tooltip
            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
    legend: {
        orient: 'vertical',
        left: 'right',
        data: ["max","min","avg"]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: []
    },
    series: [
        {
            name: 'max',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: []
        },
        {
            name: 'min',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: []
        },
        {
            name: 'avg',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: []
        }
    ]
};
const echartsForAllArea = {
    title: {
        text: '各个区域人数统计',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '人数统计',
            type: 'pie',
            radius: '70%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
export default {
  echartsForPopulation,
  echartsForHistory,
  echartsForEachDay,
  echartsForAllArea
}
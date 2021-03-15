import axios from 'axios'
import Vue from 'vue'
import echartData from './populationData'
const HistoryTableFiled = [
  {
    prop: "detectedCount",
    label: "检测人数",
    "min-width": "180",
    align: "center"
  },
  {
    prop: "overflow",
    label: "是否超过阈值",
    "min-width": "180",
    align: "center"
  },
  {
    prop: "detectedImage",
    label: "实时图像",
    "min-width": "180",
    align: "center",
  },
  {
    prop: "createTime",
    label: "识别时间",
    "min-width": "180",
    align: "center"
  },
]
const baseInfoField = [    //新场景接入表单配置
  {
    type: 'select',
    label: '场景选择',
    prop: 'areaType',
    values: [
      {
        value: '0',
        label: '室外密集型'
      },
      {
        value: '1',
        label: '室内密集型'
      },
      {
        value: '2',
        label: '室内人脸正面可见'
      },
    ]
  },
  {
    type:'input',
    label: "区域名称",
    prop: 'areaName'
  },
  {
    type: "input",
    label: "阈值设置",
    prop: "threshold"
  }
]
const historyField = [   //历史查询表单配置
  {
    type: 'select',
    label: '场景选择',
    prop: 'areaType',
    values: [
      {
        value: '0',
        label: '室外密集型'
      },
      {
        value: '1',
        label: '室内密集型'
      },
      {
        value: '2',
        label: '室内人脸正面可见'
      },
    ],
    events: {
        input(areaType){
          console.log(this);
          axios.get(`http://www.starix.top:9901/common/getAreaList?areaType=${areaType}`).then(({ data }) => {
            console.log(data);
            let values = data.data || [];
            values = values.map( item => {
              return {
                value: item.areaCode,
                label: item.areaName
              }
            })
            historyField[1].values = values
            historyField.splice(1,1,historyField[1])
          })
        }
    
    }
  },
  {
    type: 'select',
    label: '场地选择',
    prop: 'areaCode'
  },
  {
    type: "date-picker",
    label: "选择时间",
    prop: "filterTime",
    attrs: {
      placeholder: "选择时间",
      type: "datetimerange",
      "value-format": "timestamp"
    }
  }
]
const populationField = [   //人流量实时监控表单配置
  {
    type: 'select',
    label: '场景选择',
    prop: 'areaType',
    values: [
      {
        value: '0',
        label: '室外密集型'
      },
      {
        value: '1',
        label: '室内密集型'
      },
      {
        value: '2',
        label: '室内人脸正面可见'
      },
    ],
    events: {
        input(areaType){
          axios.get(`http://www.starix.top:9901/common/getAreaList?areaType=${areaType}`).then(({ data }) => {
            console.log(data);
            let values = data.data || [];
            populationField[1].thresholdObj = values.reduce((pre, item)=>{
              pre[item.areaCode] = item.threshold;
              return pre;
            },{})
            values = values.map( item => {
              return {
                value: item.areaCode,
                label: item.areaName
              }
            })
            populationField[1].values = values
            populationField.splice(1,1,populationField[1])
          })
        }
    
    }
  },
  {
    type: 'select',
    label: '场地选择',
    prop: 'areaCode',
    events: {
      input(areaCode){  //当在首页更换areaCode时候，要改变阈值在输入框以及图表中的显示以及对应地区的histtoryData
        populationFieldData.threshold = populationField[1].thresholdObj[areaCode];
        centerTop.threshold = populationField[1].thresholdObj[areaCode];
        axios.get(`http://www.starix.top:9901/common/indexInitData?areaCode=${areaCode}`).then(({ data }) => {
          const { data: dayData , code } = data;
          if( code == 200){
            const { historyData } = dayData;
            let dayMap = {
              max: [],
              min: [],
              avg: []
            };
            let timeArr = [];
            historyData.forEach(item => {
              dayMap["max"].push(item.maxCount);
              dayMap["min"].push(item.minCount);
              dayMap["avg"].push(item.avgCount);
              timeArr.push(item.date);
            })
            echartData.echartsForEachDay.yAxis.data = [...timeArr]
            echartData.echartsForEachDay.series.forEach(item => {
              item.data = [...dayMap[item.name]]
            })
          }else{

          }
        })
      }
    }
  },
  {
    type: 'input',
    label: '阈值设置',
    prop: 'threshold'
  }
]
const populationFieldData = {
  areaType: '',
  areaCode: '',
  threshold: 0
}
const centerTop = {
  nowCount: 0,
  threshold: 0
}
const historyFieldForDay = [  //天级历史数据表单配置
  {
    type: 'select',
    label: '场景选择',
    prop: 'areaType',
    values: [
      {
        value: '0',
        label: '室外密集型'
      },
      {
        value: '1',
        label: '室内密集型'
      },
      {
        value: '2',
        label: '室内人脸正面可见'
      },
    ],
    events: {
        input(areaType){
          axios.get(`http://www.starix.top:9901/common/getAreaList?areaType=${areaType}`).then(({ data }) => {
            console.log(data);
            let values = data.data || [];
            values = values.map( item => {
              return {
                value: item.areaCode,
                label: item.areaName
              }
            })
            historyFieldForDay[1].values = values
            historyFieldForDay.splice(1,1,historyFieldForDay[1])
          })
        }
    
    }
  },
  {
    type: 'select',
    label: '场地选择',
    prop: 'areaCode'
  },
  {
    type: 'select',
    label: '时间间隔',
    prop: "interval",
    values: [
      {
        value: 7,
        label: "过去7天"
      },
      {
        value: 15,
        label: "过去15天"
      },
      {
        value: 30,
        label: "过去30天"
      }
    ]
  }
]
const uploadField = [  //上传图片识别表单配置
  {
    type: 'select',
    label: '场景选择',
    prop: 'areaType',
    values: [
      {
        value: '0',
        label: '室外密集型'
      },
      {
        value: '1',
        label: '室内密集型'
      },
      {
        value: '2',
        label: '室内人脸正面可见'
      },
    ]
  }
]
const MenuConfig = [  //菜单配置
  {
    path: "/",
    text: "人流量实时监控"
  },
  {
    path: "/history",
    text: "历史记录详情"
  },
  {
    path: '/newScene',
    text: "新场景接入"
  },
  {
    path: "/historyForDay",
    text: "人流量历史"
  },
  {
    path: "/uplaod",
    text: "人流量检测"
  }
]
const countMap = {}
export {
  baseInfoField,
  historyField,
  populationField,
  HistoryTableFiled,
  historyFieldForDay,
  uploadField,
  populationFieldData,
  centerTop,
  MenuConfig,
  countMap
}
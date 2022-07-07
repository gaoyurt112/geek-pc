//引入echarts
import * as echarts from 'echarts'
//引入获取dom的方法，hooks
import { useEffect, useRef } from 'react'
var myChart //解决charts多次渲染报错  https://www.ucloud.cn/yun/104215.html

//创建echarts实例 传入自定义参数
function chartsInit (dom, title, xData, sData) {
  // if (myChart !== null && myChart !== "" && myChart !== undefined) {
  //   myChart.dispose()
  // }
  //初始化echarts
  myChart = echarts.init(dom)
  // 指定图表的配置项和数据
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    legend: {
      data: ['使用率']
    },
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '使用率',
        type: 'bar',
        data: sData
      }
    ]
  })
}

//创建bar组件 接收自定义参数
function Bar ({ title, xData, sData, style }) {
  //获取dom
  const domRef = useRef()

  //调用echarts实例
  useEffect(() => {
    //传入自定义参数
    chartsInit(domRef.current, title, xData, sData)
    // 数据发生变化时再次调用
  }, [xData, sData])// eslint-disable-line

  return (
    <div ref={domRef} style={style}></div>
  )
}
export default Bar

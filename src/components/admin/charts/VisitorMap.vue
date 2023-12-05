<template>
  <div class="com-container">
    <div class="com-chart" ref="visit_ref">
    </div>
  </div>
</template>

<script>
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/visualMap'

export default {
  data() {
    return {
      chartInstance: null,
      allData: [],
      mapData: {}, //所获取的省份的地图矢量的缓存
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  methods: {
    screenAdapter() {
      this.chartInstance.resize()
    },
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.visit_ref, this.theme)
      const res = require('@/assets/map/china.json')
      this.$echarts.registerMap('china', res)
      const initOption = {
        title:{
          text: '用户来源'
        },
        geo: {
          type: 'map',
          roam: true, // 鼠标滑动放大缩小
          map: 'china',
        },
        // '<img src="'+lt.avatar+'"/>'
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let html = ''
            if (!params.data) return html
            for (const lt of params.data.users){
              html+='<div style="display: flex;align-items: center"><img style="width: 18px;border-radius: 50%" src="'+lt.avatar+'"/><span style="font-size: x-small;margin-left: 5px">'+lt.nickname+'</span></div> '
            }
            return html
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        },
        visualMap: {
          itemWidth: 4,
          min: 0,
          max: 50,
          hoverLink: false,
          textStyle: {
            color: 'rgba(0,0,0,0.65)'
          },
          pieces: [{
            gte: 50,
            label: '>= 50',
            color: '#FF7C32'
          }, {
            gte: 30,
            lte: 49,
            label: '30 - 49',
            color: '#FDCC1A'
          }, {
            gte: 10,
            lte: 29,
            label: '10 - 29',
            color: '#5AD7D8'
          }, {
            gte: 1,
            lte: 9,
            label: '1 - 9',
            color: '#4174fe'
          }, {
            gte: 0,
            lte: 0,
            label: '0',
            value: 0,
            color: '#f5f5f5'
          }
          ]
        },
        series: [{
          type: 'map',
          geoIndex: 0,
          data: []
        }]

      }
      this.chartInstance.setOption(initOption)
    },
    async getData() {
      const {data: res} = await this.$blog.get('/admin/getUserAreaList');
      if (res.code === 200) {
        let list = {}
        res.data.forEach((item) => {
          if (typeof list[item.loginProvince] === 'undefined') {
            list[item.loginProvince] = [item]
          } else {
            list[item.loginProvince].push(item)
          }
        })
        Object.entries(list).forEach((item) => {
          this.allData.push({name: item[0], value: item[1].length,users:item[1]})
        })
        setTimeout(() => {
          this.updateChart()
        },300)

      } else {
        this.$message.error('获取用户数据错误!')
      }
    },
    updateChart() {
      const dataOption = {
        series: [{
          data: this.allData
        }]
      }
      this.chartInstance.setOption(dataOption)
    }
  }
}
</script>

<style scoped lang="less">
  .com-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .com-chart {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

</style>
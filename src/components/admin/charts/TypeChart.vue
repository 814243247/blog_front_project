<template>
    <div class="com-container">
        <div class="com-chart" ref="type_ref">
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            typeList: [],
            data: [],
            chartInstance:null
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
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.type_ref, this.theme)
            const initOption = {
                title:{
                    text: '分类数据'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    bottom: '10',
                    data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
                },
                series: [
                    {
                        name: '分类',
                        type: 'pie',
                        roseType: 'radius',
                        radius: [15, 95],
                        center: ['50%', '38%'],
                        data: [
                            {value: 320, name: 'Industries'},
                            {value: 240, name: 'Technology'},
                            {value: 149, name: 'Forex'},
                            {value: 100, name: 'Gold'},
                            {value: 59, name: 'Forecasts'},
                        ],
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        compare(property) {
            return function (a, b) {
                let value1 = a[property].length;
                let value2 = b[property].length;
                return value2 - value1;
            }
        },
        async getData() {
            const {data: res} = await this.$blog.get('/admin/getFullTypeList')
            this.typeList = res.data.sort(this.compare('blogs'))
            this.data = this.typeList.slice(0, 4).map(item => {
                return {name: item['name'], value: item['blogs'].length}
            })
            this.data = this.data.concat({name: '其他',value:eval(this.typeList.slice(4).map(item => {
                    return item['blogs'].length
                }).join("+")) })
            const dataOption = {
                legend: {
                    data: this.data.map(item => item['name'])
                },
                series: [{
                    data: this.data
                }]
            }
            this.chartInstance.setOption(dataOption)
            // console.log(this.data)
        }
    }
}
</script>

<style scoped>

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

    canvas {
        border-radius: 0;
    }
</style>
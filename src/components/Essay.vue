<template>
    <el-container>
        <el-timeline class="animate__animated animate__fadeInLeft">
            <el-timeline-item :color="essay.borderColor" v-for="essay in essayList" :key="essay.id" :timestamp="essay.createTime| dataFormat" placement="top">
                <el-card style="letter-spacing: 1px;" :style="calcuteStyle(essay)">
                    <h2 v-if="essay.title">{{essay.title}}</h2>
                    <div class="typo" v-html="essay.content"></div>
                    <el-image v-if="essay.image" :src="essay.image"></el-image>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            essayList: []
        }
    },
    created() {
        this.getEssayList()
    },
    methods:{
        async getEssayList(){
            const {data: res} = await this.$blog.get('/essays')
            if (res.code === 200){
                this.essayList = res.data.sort((a, b) => {
                    return b.createTime.localeCompare(a.createTime)
                })
                this.essayList.forEach( (essay) => {
                    // console.log(essay.content)
                    essay.content = this.$marked(essay.content)
                    essay.borderColor = essay.color.split(",")[0]+','+essay.color.split(",")[1]+ ','+essay.color.split(",")[2]+')'
                    essay.contentColor = essay.color.split(",")[0]+','+essay.color.split(",")[1]+ ','+essay.color.split(",")[2]+',0.1)'
                } )
            }
        },
        calcuteStyle(essay){
            return 'border: 3px solid '+essay.borderColor+'; background-color: rgba(255,255,255,0.9);box-shadow: 0 0 30px -10px '+essay.borderColor
        }
    }
}
</script>

<style scoped lang="less">

    .el-timeline {
        font: 16px/1.5 'Microsoft Yahei', 'PingFang SC', 'Hiragino Sans GB', sans-serif !important;

        width: 80%;
        margin: 0 auto;

        .el-image {
            width: 200px;
        }
        .el-card{
            border-radius: 20px;
            box-shadow: 0 0 15px 5px white;
        }
    }

    @media screen and (max-width: 768px){
        .el-timeline{
            width: 98%;
            padding: 2px;
        }

        .el-timeline /deep/ .el-timeline-item__wrapper{
            padding-left: 15px !important;
        }
    }
</style>
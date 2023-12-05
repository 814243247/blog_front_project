<template>
    <div class="animate__animated animate__fadeInUp footer-wrap">
        <!--    center aligned居中-->

        <el-row :gutter="20" class=" footer-info">
            <el-col class="ewm" :xs="24" :sm="4" >
                <el-image src="https://myblog-zhou.oss-cn-beijing.aliyuncs.com/20161104103323_kPhCm.gif" alt="图片加载失败"
                          class="ui rounded image" style="width: 110px"/>
            </el-col>
            <el-col class="new-blog" :xs="24" :sm="7">
                <h4 class="ui inverted header m-text-spaced ">最新博客</h4>
                <div id="newblog-container">
                    <div class="recommend-blog l-text list" v-for="blog in footerList" :key="blog.id">
                        <a class="item" href="#" target="_blank">{{blog.title}}</a>
                    </div>
                </div>
            </el-col>
            <el-col class="connect" :xs="24" :sm="5">
                <h4 class="ui inverted header m-text-spaced ">联系我</h4>
                <div class="ui inverted link list">
                    <p class="item">Email：814243247@qq.com</p>
<!--                    <p class="item">QQ：814243247</p>-->
                </div>
            </el-col>
            <el-col class="intro" :xs="24" :sm="8">
                <div class="seven wide column">
                    <h4 class="ui inverted header m-text-spaced">博客简介</h4>
                    <p class="m-text-thin m-text-spaced m-opacity-mini" >
                        累死啦</p>
                </div>
            </el-col>
        </el-row>
<!--        <el-row>-->
<!--            <div class="author">-->
<!--                <p class="m-text-thin m-text-spaced m-opacity-mini">Copright©2018-2023</p>-->
<!--            </div>-->
<!--        </el-row>-->
    </div>

</template>

<script>
export default {
    data(){
        return {
            footerList: [],
        }
    },
    mounted() {
        this.updated();
    },
    created(){
        this.getfooterList()
    },
    methods: {
        async getfooterList() {
            const {data: res} = await this.$blog.get('/footer/newblog')
            this.footerList = res.data
        },
        getClientHeight() {
            if(this.count === 0){
                this.count = 1
                document.getElementById('Top').style.height = (document.documentElement.clientHeight - 49) + 'px'
            }
        },
        updated() {
            this.getClientHeight()
        }
    }
}
</script>

<style scoped lang="less">
    *:hover{
        cursor: pointer;
    }
    .footer-wrap {
        bottom: 0 !important;
        line-height: 2;
        position: relative;
        padding: 40px 20px;
        color: #eee;
        font-size: 14px;
        text-align: center;
        background-color: #545c64;
        transition: .2s;
    }
    .footer-info{
        line-height: 15px;
        color: rgba(255,255,255,.5);
        a{
            text-decoration: none;
            color: rgba(255,255,255,.5);
        }
        h4{
            color: white;
        }

        .list .item{
            line-height: 20px;
        }

        .list .item:hover{
            color: white;
        }
        .el-image{
            margin: 0 auto;
            opacity: 0.8;
        }
        .el-image:hover{
            opacity: 1;
        }
    }
    .author{
        color: rgba(255,255,255,.5);
    }
////这个代码会隐藏元素
//    @media only screen and (max-width: 480px) {
//        .ewm,.new-blog,.intro,.connect{
//            display: none;
//        }
//    }
</style>

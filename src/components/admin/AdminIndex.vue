<template>
  <div>
    <el-row :gutter="32">
      <el-col :xs="12" :sm="6" style="text-align: center;margin-bottom: 32px;">
        <el-card shadow="hover" @click.native="selectCard (0)">
          <p>总阅读量</p>
          <h2>{{viewCount}}</h2>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="6" style="text-align: center;margin-bottom: 32px;">
        <el-card shadow="hover" @click.native="selectCard (1)">
          <p>文章总数</p>
          <h2>{{blogCount}}</h2>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="6" style="text-align: center;margin-bottom: 32px;">
        <el-card shadow="hover" @click.native="selectCard (2)">
          <p>点赞数</p>
          <h2>{{appreciateCount}}</h2>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="6" style="text-align: center;margin-bottom: 32px;">
        <el-card shadow="hover" @click.native="selectCard (3)">
          <p>评论数</p>
          <h2>{{commentCount}}</h2>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24" style="text-align: center;">
        <el-card shadow="hover">
          <div class="com-page">
            <BlogChart style="width: 100%; height: 350px;" :psMsg="selectedCard"></BlogChart>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="8" :lg="8" style="text-align: center;margin-bottom: 20px;">
        <el-card class="chart-wrapper" shadow="hover">
          <TagChart style="width: 100%;height: 300px;"></TagChart>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8" style="text-align: center;margin-bottom: 20px;">
        <el-card class="chart-wrapper" shadow="hover">
          <TypeChart style="width: 100%;height: 300px;"></TypeChart>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8" style="text-align: center;margin-bottom: 20px;">
        <el-card class="chart-wrapper" shadow="hover">
          <VisitorMap style="width: 100%;height: 300px;"></VisitorMap>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}"
              style="padding-right:8px;margin-bottom:30px;">
        <recent-blog-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 6}"
              style="margin-bottom:30px;">
        <comment-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 6}"
              style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BlogChart from "./charts/BlogChart";
import TagChart from "./charts/TagChart";
import TypeChart from "./charts/TypeChart";
import RecentBlogList from "./charts/RecentBlogList";
import CommentList from "./charts/CommentList";
import BoxCard from "./charts/BoxCard";
import VisitorMap from "./charts/VisitorMap";

export default {
  components: {
    VisitorMap, BlogChart, TagChart, TypeChart,RecentBlogList, CommentList, BoxCard
  },
  data() {
    return {
      blogCount: 1000,
      viewCount: 1000,
      appreciateCount: 1000,
      commentCount: 1000,
      selectedCard: 0,
      recommendList: [],
    }
  },
  created() {
    this.getcountList();
  },
  methods: {
    async getcountList() {
      const {data: res} = await this.$blog.get('/admin/getBlogCount')
      this.blogCount = res.data
      const {data: res2} = await this.$blog.get('/admin/getViewCount')
      this.viewCount = res2.data
      const {data: res3} = await this.$blog.get('/admin/getAppreciateCount')
      this.appreciateCount = res3.data
      const {data: res4} = await this.$blog.get('/admin/getCommentCount')
      this.commentCount = res4.data
    },
    selectCard(id) {
      this.selectedCard = id
      // console.log(this.selectedCard)
    },
  },

}
</script>

<style scoped lang="less">
  .com-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }

  .el-card:hover {
    cursor: pointer;
  }

  .chart-wrapper {
    height: 300px;
    margin-top: 30px;
  }

  .el-card /deep/ .el-card__body {
    padding: 0;
  }
</style>
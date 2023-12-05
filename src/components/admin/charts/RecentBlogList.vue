<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;height: 450px;">
    <el-table-column label="最新博客" min-width="180">
      <template slot-scope="scope">
        <p class="title" @click="getBlogInfo(scope.row.id)">
            {{ scope.row.title  }}
        </p>
      </template>
    </el-table-column>
    <el-table-column label="类型" width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.type.name }}
      </template>
    </el-table-column>
    <el-table-column label="类别" width="100" align="center">
      <template slot-scope="scope">
        <el-tag>
          {{ scope.row.flag }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null,
      total:0
    }
  },
  created() {
    this.getRecommendList()
  },
  methods: {
      // 获取最新博客列表
      async getRecommendList() {
        const {data: res} = await this.$blog.get('/getRecommendBlogList')
        // console.log(res.data)
        this.list = res.data.slice(0,5)
        this.total = res.total
      },
      // 跳转到博客详情页
      getBlogInfo(blogId) {
          this.$router.push({path: '/blogInfo', query: {id: blogId}});
      },
  }
}
</script>
<style scoped lang="less">
    .title:hover{
        color: #3a8ee6;
        cursor: pointer;
    }
</style>

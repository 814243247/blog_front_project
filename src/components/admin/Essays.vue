<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>随笔管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card shadow="hover">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="新建随笔" name="first">
          <el-form label-position="left" label-width="80px" style="text-align: left" ref="publishFormRef"
                   :model="publishForm"
                   class="publish_form">
            <el-form-item label="标题" prop="title">
              <el-input v-model="publishForm.title"></el-input>
            </el-form-item>
            <el-form-item label="色彩" prop="color">
              <el-color-picker size="small" show-alpha v-model="publishForm.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <mavon-editor v-model="publishForm.content"
                            ref="md"
                            @imgAdd="imgAdd"
                            @imgDel="imgDel"
                            style="margin: 10px auto;min-height: 70vh"/>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="publishAssay">发布</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="随笔管理" name="second">
          <el-table :data="essayList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="随笔标题" prop="title"></el-table-column>
            <el-table-column label="边框颜色" prop="color">
              <template slot-scope="scope">
                <el-tag :color="scope.row.color" class="essay-color"></el-tag>
              </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="createTime">
              <template slot-scope="scope">
                {{scope.row.createTime | dataFormat }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!--            修改按钮-->
                <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        circle
                        @click="editByid(scope.row)"
                ></el-button>
                <!--            删除按钮-->
                <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        circle
                        @click="removeById(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      essay: {
        id: null,
        content: "",
        title: "",
        color: "",
        createTime: ""
      },
      publishDialogFormVisible: false,
      publishForm: {
        color: 'rgba(0, 0, 0, 1)'
      },
      dialogVisible: false,
      activeName: 'first',
      essayList: [],
      vis: false,

    }
  },
  created() {
    this.getEssayList()
  },
  methods: {
    // 将图片上传到服务器，返回的地址替换到md中
    async imgAdd(pos, $file) {
      // console.log($file)
      let formdata = new FormData();
      formdata.append('file', $file);
      const {data: res} = await this.$blog.post('/upload', formdata)
      if (res.code === 200) {
        this.$refs.md.$img2Url(pos, res.data)
      }
    },
    // 删除不需要的图片
    async imgDel(pos) {
      // console.log(pos[0])
      let len = pos[0].split('/').length
      let filename = pos[0].split('/')[len - 1]
      // console.log(filename)
      const {data: res} = await this.$picture.get(`/delete/${filename}`)
    },
    // 获取随笔列表
    async getEssayList() {
      const {data: res} = await this.$blog.get('/admin/essays')
      if (res.code === 200) {
        this.essayList = res.data.sort((a, b) => {
          return b.createTime.localeCompare(a.createTime)
        })
        this.essayList.forEach(item => {
          item.vis = false
        })
      }
    },
    backPage() {
      this.$refs.upload.clearFiles()
      this.blog.firstPicture = ''
      this.publishDialogFormVisible = false
      this.$refs.publishFormRef.resetFields()
    },
    // 发布随笔
    async publishAssay() {
      if (this.publishForm.id !== null) {
        this.essay.id = this.publishForm.id
        console.log(this.essay.id)
      }
      this.essay.image = this.dialogImageUrl
      this.essay.title = this.publishForm.title
      this.essay.content = this.publishForm.content
      this.essay.color = this.publishForm.color
      // console.log(this.essay)
      const {data: res} = await this.$blog.post('/admin/essay', {
        essay: this.essay
      })
      // console.log(res)
      if (res.code === 200) {
        this.publishDialogFormVisible = false
        return this.$message.success('发布随笔成功！')
      } else {
        this.publishDialogFormVisible = false
        return this.$message.error('发布随笔失败！')
      }
    },
    // 点击tab时的事件
    handleClick(tab, event) {
      if (tab.name === 'second') {
        this.getEssayList()
      }
    },
    // 删除随笔
    async removeById(id) {
      // 弹出对话框
      const confirmResult = await this.$confirm(
          '确定要删除该随笔吗',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const {data: res} = await this.$blog.get(`/admin/essay/${id}/delete`)
      if (res.code === 200) {
        await this.getEssayList()
        return this.$message.success('项目删除成功！')
      } else {
        return this.$message.error('项目删除失败！')
      }
    },
    // 编辑随笔
    editByid(row) {
      console.log(row)
      this.publishForm = row
      this.activeName = 'first'
    }
  }
}
</script>

<style scoped>
  .essay-color {
    width: 30px;
    height: 30px;
    border-radius: 9999px;
    border: 1px solid white;
  }

  .card:hover {
    cursor: pointer;
  }
</style>
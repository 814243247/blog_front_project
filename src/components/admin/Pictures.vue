<template>
  <div>
    <el-upload
            class="upload-demo"
            drag action="http://www.suenaga.top:8080/upload"
            :on-success="handleSuccess"
            multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <waterfall id="waterfall_box" :width="itemWidth" :gutterWidth="gutterWidth" :col="col":data="pictureList">
      <template>
        <div v-for="(pic) in pictureList" class="waterfall_item">
          <el-card class="imgs" >
            <div style="width: 100%;height: 100%">
              <img class="images" v-if="pic.dialogImageUrl" :lazy-src="pic.dialogImageUrl" @click="showImg(pic.dialogImageUrl)"/>
              <span>{{pic.dialogImageUrl}}</span>
              <el-button size="mini" type="danger" circle @click="deletePic(pic.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
          </el-card>
        </div>
      </template>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </waterfall>
  </div>

</template>

<script>
export default {
  data() {
    return {
      id: 0,
      pictureList: [],
      waterfall_box_width: 0,
      waterfall_box_height: 0,
      waterfall_col_num: 0,
      waterfall_col_height_list: null, //每列最大高度
      img_width: 250,
      img_margin_right: 20,
      img_margin_bottom: 20,
      dialogVisible: false,
      dialogImageUrl: '',
    }
  },
  created() {
    this.getPicList()
  },
  computed:{
    itemWidth(){
      return 270 // #rem布局 计算宽度
    },
    gutterWidth(){
      return (18*0.5*(document.documentElement.clientWidth/270))	//#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    },
    col(){
      return Math.floor(document.documentElement.clientWidth/270)
    }
  },
  methods: {
    handleRemove() {
      this.dialogImageUrl = ''
    },
    async handleSuccess(res) {
      console.log(res.data)
      this.id = res.data.id
      this.dialogImageUrl = res.data.dialogImageUrl
      await this.getPicList()
    },
    scroll(scrollData){
      console.log(scrollData)
    },
    showImg(picURL) {
      this.dialogImageUrl = picURL
      this.dialogVisible = true
    },
    async getPicList() {
      const {data: res} = await this.$picture.get('/get_all')
      this.pictureList = res.data
    },
    async deletePic(id) {
      const confirmResult = await this.$confirm(
          '确定要删除该图片吗',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).catch(err => err)
      if (confirmResult != 'confirm') {
        return this.$message.info('已取消删除')
      }
      const {data:res} = await this.$picture.delete(`/delete/${id}`)
      await this.getPicList()
      this.$message.success('删除成功！')
    }
  }
}
</script>

<style scoped lang="less">
  .el-card /deep/ .el-card__body{
    padding: 0;
  }
  #waterfall_box {
    width: 100%;
    position: relative;
    margin: 20px auto;

    .waterfall_item {

      .imgs {
        position: relative;
        margin-bottom: 20px;

        img {
          width: 100%;
        }

        span {
          position: absolute;
          bottom: 0;
          left: 0;
          line-height: 18px;
          font-size: small;
          color: #eee;
          background-color: rgba(0, 0, 0, 0.3);
          visibility: hidden;
        }

        button {
          position: absolute;
          top: 0;
          right: 0;
          visibility: hidden;
        }
      }

    }

    .waterfall_item:hover {
      cursor: pointer;
      overflow: hidden;


      span {
        color: white;
        transition: all .3s;
        visibility: visible;
      }

      button {
        visibility: visible;
      }

      img{
        transform: scale(1.1);
        width: 100%;
        transition: .6s;
      }
    }
  }

</style>
<template>
  <div>
    <el-card shadow="hover" style="text-align: left;margin-bottom: 10px">
      <div class="header">
        <div class="avatar-area">
          <el-image class="avatar" :src="userInfo.avatar"></el-image>
          <div class="avatar-upload" @click="dialogVisible =true">
            <el-image class="camera" :src="avatarUpload"></el-image>
          </div>
        </div>
        <div class="info">
          <h1 class="nickname">{{userInfo.nickname}} <span class="change-password" @click="changePassword()">修改密码</span>
          </h1>
          <p class="email">{{userInfo.email}}</p>
        </div>
      </div>
    </el-card>
    <el-card shadow="hover">
      <h1 class="el-card__header" style="text-align: left;margin: 0">基本信息</h1>
      <el-form :data="userFrom" label-width="100px" label-position="left"
               style="text-align: left;width: 80%;margin-left: 30px;margin-top: 20px">
        <el-form-item label="用户类型">
          <div style="margin-left: 10px">{{userFrom.type==1 ? '管理员':'普通用户'}}</div>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userFrom.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userFrom.email"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="changeUserInfo">提交修改</el-button>

    </el-card>
    <el-dialog style="z-index: 20000" title="上传头像" :visible.sync="dialogVisible">
      <el-upload
              v-if="uploading"
              class="avatar-uploader"
              action="http://localhost:8080/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="new-avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="setAvatar()">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      userFrom: {
        nickname: '',
        username: '',
        email: ''
      },
      dialogVisible: false,
      avatarHover: false,
      uploading: true,
      imageUrl: '',
      avatarUpload: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFC0lEQVR4Xu2ba8ilUxTHf39J5H6NQiQSii80bjENNeEDmtw1Jb64jhqF1AwJZcow+EJqmnJLzIeZmkJoxMQXComkjCL3cckk+WvpOdM++33OOc9znufMeY9zVp0v77P22mv991prr7X3fsWUk6bcfmYAzDxgyhGYhcCUO8DOTYK2d6kCuKR/qvC1wTPSELB9CHAVcA5wGLBrRaX/Br4B3gKelfRdxXG12UYGgO3TgQeAvWtr1T3gN+BuSe82lFM6fCQA2D4eeBrYvSWltwPXS/q0JXk7xLQOgO3dwm2Bo1pW9kvgakl/tSl3FAAsA67JlHwKeB4Id65CETZXADdkzOskPVpFQFWeVgGwfXLh+qncjZJWVFUo5bN9H3BB8jcXofDhMPLKxrQGgO2I9+eAI5KJvgcuk1R15bt0tB2e8CJwcPJhK3ClpMgLjakyAIWBC4ATC4X2zGaPLS++pXSrpHeaaGn7TCB3+4+BfGv8AwjA49uWqgANBMD2PsB1wJKaWX29pPubGN8Za/se4OIassI7XgKekfRrv3F9AShi+mHggBqTB+u3wOWSYlUak+3wtheAQ2sK+wm4Q1LPnNETANvh7qtrVG8d3QL9myV9UFPZvuy2TwEer+mFITOqymWStlROgrYjka0D9soG/Qi8CnwBlK1uTPbRqErXorQ+qceihJccA5wPHJjp/TtwraRIoF1U6gG2HwHOzng3AKskhbB5S7Zj0ZYDF2VKbpZ0+0AAbEcmX5sxRjJ5ct5aXaKY7RuL5J1+XSopdokdNMcDbN8W7pLwfF64T7j3xJDt6DwjjI9NlJ5TSZYBEHX8ccmguyRF3E8c2Y588GCi+GeSoj3v6wGvA/smPIsl/dCG9cWqnAvE74SkwosC5hPgzfhJasXbbB8EbEp03yZpUU8AbIdHvJ8Zu6ANhWwvBCK8Dh8A5tdR+Ul6oynoBeD59neqpOgp/qOuECiOrN7LJj6tyRFVIfOWLK9UsS3id00Lc/e1Z2cAkCfVKsZ3eBq1v1UWdKQAFG4fpXROUVOsB+KQI+jootbP9+74FqXsUOEwVgCK+IuGJI35n4EVvTpE22cA9wL7J4hFTlgyTB4aNwDnAQ9lSz+wPS5AeCwbd6ek1+rETvCOG4BohRcnSm+QtLKKEbaDLw2HTZKiJa5F4wbgZeDIROM41a3UIRadX5wqd+grSZfWsn4eeMBmYI9E6UWStlUxwnYUYlGQdehPSXlzNlDUuD1g6gGY+hCY+iQ49dtg9OPTWwgVhUh0gNNZCnf2qJITpoHbV8Iw2c1QUo5ObzuceMI4DkTiSc54zwNSfx/Dkdj8AqBO8LfBO9ZSuA0DmsqoDUCRtN7O7t8WDnu/39SApuOL9wXpadJ2SWelcsvuBV7JHjlUbmObKtz2+JK2equkSwYBkNfwQz9xaduguvJsx/Hahcm4OQcrZR5QVsPH9XKExsSQ7XD1uN5Pac7RWhkAZTX8L8DKSQGhMD6O1fZLrC89XO11PR5XV6tKlnsjEDmi1/uAcXpI531AxHjq9h2dlkuKq7cu6vdCJMrXpeO0qMW510paUyavHwBRRd30PwAh3jo80euKrcorsQiHeP056FKzxQVrRVTE/Ooyt++7DZZNndXwnXeCbT2EbsVaIB5ndd4JVr5mH+gBvbSr+s8PbVk3SM6wt8hDAzBIoUn5PgNgUlZqVHrOPGBUyE6K3JkHTMpKjUrPfwGerYtf3LH0qAAAAABJRU5ErkJggg=='
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])

  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.userFrom = JSON.parse(window.sessionStorage.getItem('user'));
    },
    // 修改头像成功
    handleAvatarSuccess(res) {
      this.imageUrl = res.data.dialogImageUrl
    },
    // 修改头像
    async setAvatar() {
      // console.log(this.imageUrl)
      const {data: res} = await this.$blog.post('/admin/setAvatar', {
        pic_url: this.imageUrl,
        user_id: this.userInfo.id
      })
      // console.log(res.data)
      this.userInfo = res.data
      window.sessionStorage.setItem('user', JSON.stringify(this.userInfo))
      window.location.reload()

    },
    async changeUserInfo() {
      const {data: res} = await this.$blog.post('/admin/user', {
        user: this.userFrom
      })
      console.log(res)
      if (res.code === 200) {
        window.sessionStorage.setItem("user", JSON.stringify(res.data));
        this.$store.commit('getUserInfo')
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .avatar {
    width: 100px;
    height: 100px;
    border: 2px solid white;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .06);
    border-radius: 50%;
    box-sizing: border-box;
  }

  .avatar-upload {
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 10000;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
  }

  .camera {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .avatar-upload:hover {
    opacity: 1;
    cursor: pointer;
  }

  .header {
    display: flex;
    justify-content: flex-start;

    .avatar-area {
      width: 100px;
      position: relative;
      margin-right: 20px;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    border: 2px dashed #d9d9d9;
    border-radius: 20px;
  }

  .new-avatar {
    width: 120px;
    height: 120px;
    display: block;
  }

  .change-password {
    color: #3a8ee6;
    font-size: 12px;
    margin-left: 10px;
    font-weight: normal;
  }

  .change-password:hover {
    cursor: pointer;
  }

</style>
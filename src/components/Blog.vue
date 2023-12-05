<template>
  <el-container class="animate__animated animate__fadeIn ">
    <el-card style="background-color: rgba(255, 255, 255,1)" class="first-card">
      <div slot="header" class="total blog-info">
        <div class="user-info">
          <el-avatar size="small" :src="blog.user.avatar"></el-avatar>
          <a href="#" class="header">{{blog.user.nickname}}</a>
        </div>
        <div class="blog-date">
          <i class="el-icon-date"></i>
          <span>{{blog.createTime | dataFormat}}</span>
        </div>
        <div>
          <i class="el-icon-view"></i>
          <span>{{blog.views}}</span>
        </div>
      </div>
      <el-image class="blog-pic" :src="blog.firstPicture"></el-image>
      <hr/>
      <h2 class="blog-title header">{{blog.title}}
        <el-tag effect="plain" type="warning" style="font-weight: bold; font-size: small; margin-left: 20px">
          {{blog.flag}}
        </el-tag>
      </h2>
      <div class="typo m-padded-lr-responsive m-padded-tb-large"
           v-html="blog.content" ></div>
      <div class="tags">
        <div class="tag-item" v-for="tag in blog.tags" :key="tag.id">
          <div class="sjx-outer">
            <div class="sjx-inner"></div>
          </div>
          <div class="tag">
            {{tag.name}}
          </div>
        </div>
      </div>
      <div class="appreciate">
        <el-popover
                placement="bottom"
                title=""
                width="300"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          <div class="give-money">
            <div class="give-money-item">
              <el-image :src="wechart" title="微信支付"></el-image>
              <p>微信</p>
            </div>
            <div class="give-money-item">
              <el-image :src="alipay" title="支付宝支付"></el-image>
              <p>支付宝</p>
            </div>
          </div>
          <el-button class="zanshang" slot="reference" type="danger" round plain>赞赏</el-button>
        </el-popover>
      </div>
      <div class="author">
        <ul>
          <li>作者 {{blog.user.nickname}}</li>
          <li>发表时间 {{blog.createTime | dataFormat}}</li>
        </ul>
      </div>
      <el-card shadow="never" class="comments">
        <div class="header">
          评论
        </div>
        <div v-for="cmt in rootCmtTree" :key="cmt.id">
          <comment :cmt="cmt" :parent-id="-1" :rp-active-id="rpActiveId"></comment>
          <reply style="margin-left: 40px" v-if="rpActiveId === cmt.id" :id="cmt.id" :blog-id="blog.id"
                 v-on:quit="cancel" v-on:newCmt="replyComp"></reply>

          <span v-else class="reply" @click="rpActiveId = cmt.id">回复</span>
          <span v-if="administrator || userInfo && cmt.userId === userInfo.id" class="delete"
                @click="deleteComment(cmt.id)">删除</span>
          <div style="margin-left: 40px" v-for="rp in cmt.children" :key="rp.id">
            <comment :cmt="rp" :parent-id="cmt.id" :rp-active-id="rpActiveId"></comment>
            <reply style="margin-left: 40px" v-if="rpActiveId === rp.id" :id="rp.id" :blog-id="blog.id"
                   v-on:quit="cancel" v-on:newCmt="replyComp"></reply>
            <span v-else class="reply" @click="rpActiveId = rp.id">回复</span>
            <span v-if=" administrator || userInfo && rp.userId === userInfo.id" class="delete"
                  @click="deleteComment(rp.id)">删除</span>
          </div>
        </div>
      </el-card>
      <el-form class="commmet-reply" :model="commentForm" :rules="commentFormRules" ref="commentFormRef">
        <el-form-item prop="content">
          <el-input v-model="commentForm.content" :validate-event="false" type="textarea"
                    class="write-commmet" :rows="6">
          </el-input>
        </el-form-item>
        <div class="submit">
          <el-button prefix-icon="el-icon-submit" type="primary" class="item" @click="submitCmt()">
            <i class="el-icon-edit"></i> 提交
          </el-button>
        </div>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
import Prism from '../plugins/prism'
import Login from "./login/Login";
import Comment from "./comment/Comment";
import Reply from "./comment/Reply";
import {mapState} from 'vuex'

export default {
  components: {
    Login, Prism, Comment, Reply
  },
  data() {
    return {
      blog: {
        user: {}
      },
      replyForm: {
        content: ''
      },
      replyFormRules: {
        content: [
          {required: true, message: "评论内容不能为空！"},
          {min: 0, max: 100, message: "评论内容不超过100字！"}
        ]
      },
      rpActiveId: -1,
      blogId: 0,
      wechart: 'https://myblog-zhou.oss-cn-beijing.aliyuncs.com/mm_facetoface_collect_qrcode_1701531271755.png',
      alipay: 'https://myblog-zhou.oss-cn-beijing.aliyuncs.com/1701760460582.jpg',
      commentForm: {
        content: ''
      },
      loginDialogFormVisible: false,
      commentFormRules: {
        content: [
          {required: true, message: "评论内容不能为空！"},
          {min: 0, max: 100, message: "评论内容不超过100字！"}
        ]
      },
      rootCmtTree: []
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0);
    }
  },
  created() {
    this.getBlogInfomation()
  },
  computed: {
    ...mapState([
      'userInfo',
      'administrator',
    ])
  },
  methods: {
    replyComp(val) {
      this.$message({message: "评论发表成功", type: 'success', offset: 80});
      this.rpActiveId = -1
      this.getBlogInfomation()
    },
    cancel(val) {
      // console.log(val)
      this.rpActiveId = val
    },
    // 获取博客详情信息
    async getBlogInfomation() {
      const {
          data: res
      } = await this.$blog.get(`/blog/${this.$route.query.id}`)
      this.blog = res.data
      this.blogId = this.$route.params.id
      let parents = this.blog.comments.filter(value => value.parentComment === null).sort((a, b) => {
        return a.createTime.localeCompare(b.createTime)
      })
      let children = this.blog.comments.filter(value => value.parentComment !== null)
      let translator = (parents, children) => {
        parents.forEach(parent => {
          children.forEach((child, index) => {
            if (child.parentComment.id === parent.id) {
              let temp = JSON.parse(JSON.stringify(children))
              temp.splice(index, 1)
              translator([child], temp)
              typeof parent.children != 'undefined' ? parent.children.push(child) : parent.children = [child]
            }
          })
        })
      }
      translator(parents, children)

      let getChildList = (children) => {
        let cds = []
        let dfs = (children) => {
          if (children === undefined) return
          children.forEach((child) => {
            cds.push(child)
            if (child.children === undefined) return
            dfs(child.children)
          })
        }
        dfs(children)
        return cds.sort((a, b) => {
          return a.createTime.localeCompare(b.createTime)
        })
      }
      parents.forEach((parent) => {
        parent.children = getChildList(parent.children)
      })
      this.rootCmtTree = parents

      setTimeout(() => {
        Prism.highlightAll()
      }, 0)
    },

    // 提交评论
    submitCmt() {
      this.$refs.commentFormRef.validate(valid => {
        if (!valid) return
        this.submit(-1)
      })
    },
    async submit() {
      let comment = {}
      comment.content = this.commentForm.content
      comment.blogId = this.blog.id
      if (this.$store.state.userInfo === null) {
        this.$store.commit('showLFV')
      } else {
        const {data: res} = await this.$blog.post('comments', {
          content: comment.content,
          blogId: comment.blogId,
          userId: this.$store.state.userInfo.id,
          parentId: -1
        })
        if (res.code === 200) {
          this.getBlogInfomation()
          this.$message({message: res.message, type: 'success', offset: 80});
        } else {
          this.$message({message: "评论发表失败！", type: 'error', offset: 80});
        }
      }
    },
    // 回复博客
    reply(parentId) {
      this.$refs.replyFormRef.validate(valid => {
        if (!valid) return
        this.submit(parentId)
      })
    },
    // 删除评论
    async deleteComment(id) {
      const {data: res} = await this.$blog.get(`/comments/${id}/delete`)
      if (res.code === 200) {
        this.getBlogInfomation()
        this.$message({message: res.message, type: 'success', offset: 80});
      } else {
        this.$message({message: "删除评论失败！", type: 'error', offset: 80});
      }
    }
  },

}
</script>

<style scoped lang="less">


  .el-card {
    width: 100%;
  }

  .el-popper /deep/ {
    box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%),
  }

  .first-card {
    border-radius: 10px 10px 0 0;
    position: relative;
    padding-bottom: 100px;
    /*text-align: center;*/
    font: 300 1em/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;

    .blog-pic {
      border-radius: 8px;
    }
  }

  hr.style-one {
    width: 100%;
    background-image: linear-gradient(to right, rgba(64, 158, 255, 0), rgba(64, 158, 255, 0.75), rgba(64, 158, 255, 0));
  }

  .commmet-reply {
    position: relative;

    .auth-info {
      position: absolute;
      left: 0;
    }

    .submit {
      text-align: center;
    }

  }

  .appreciate {
    text-align: center;
  }

  .give-money {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #409eff;
    border-radius: 10px;

    .give-money-item {
      border-radius: 10px;
      padding: 10px;
      width: 50%;
      text-align: center;

      .el-image {
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 5px;
        margin-right: 5px;
      }

      p {
        font-size: smaller;
        font-weight: bold;
        color: #3a8ee6;
        display: block;
        line-height: 20px;
        margin: 0;
      }
    }
  }

  .tags {
    display: flex;
    align-items: center;
    margin-left: 50px;
  }

  .tag-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 20px;
  }

  .tag {
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    background-color: #ecf5ff;
    border: 1px solid #409eff;
    color: #409eff;
    display: flex;
  }

  .sjx-outer {
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid #409eff;
    position: relative;
  }

  .sjx-inner {
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid #ecf5ff;
    top: -7px;
    left: 1px;
    position: absolute;
  }

  .author {
    text-align: left;
    background-color: #fcfff5;
    box-shadow: 0 0 0 1px #a3c293 inset;
    color: #2c662d;
    width: 100%;
    position: absolute;
    left: 0;
    margin: 20px 0;
    padding: 20px 0;
    font-size: small;
    font-family: PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
  }

  .comments {
    margin-top: 150px;
    box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%);
    border: 1px solid rgba(34, 36, 38, .15);
    border-top: 2px solid #409EFF;
    text-align: left;

    .reply {
      margin-left: 40px;
      font-size: 12px;
      color: rgba(0, 0, 0, .5);
    }

    .reply:hover {
      color: rgba(0, 0, 0, 1);
      cursor: pointer;
    }

    .delete {
      margin-left: 10px;
      font-size: 12px;
      color: rgba(0, 0, 0, .5);
    }

    .delete:hover {
      color: rgba(0, 0, 0, 1);
      cursor: pointer;
    }


    .header {
      font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
      font-weight: 700;
      font-size: 1.28571429rem;
      color: rgba(0, 0, 0, .87);
    }

  }


  .write-commmet {
    margin-top: 20px;
  }

  .blog-pic {
    width: 100%;
  }

  .blog-title {
    text-align: center;
  }

  .blog-info {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, .4);
    font-size: 13px;

    .blog-date {
      margin-right: 5px;
    }

    .user-info {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-right: 15px;

      .el-avatar {
        margin-right: 5px;
        width: 22px;
        height: 22px;
      }

      .header {
        text-decoration: none;
        color: #3a8ee6;
        font-weight: bold;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .tags {
      margin-left: 0;
    }

    hr {
      display: none;
    }

    .comment-content {
      font-size: 12px !important;
    }
  }

  @media only screen and (max-width: 480px) {
    h2 {
      font-weight: normal;
    }

    code, pre {
      font-size: 13px !important;
    }
  }
</style>
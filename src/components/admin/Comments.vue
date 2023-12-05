<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div class="el-card__header" style="text-align: left;padding: 0">
                <h1 style="margin: 0;">评论管理</h1>
            </div>
            <ul style="padding: 0;" class="comment-list">
                <li class="comment" v-for="cmt in commentList" :key="cmt.id">
                    <el-avatar :src="cmt.avatar"></el-avatar>
                    <div class="content">
                        <div style="display: flex;justify-content: space-between;width: 100%">
                            <div class="nkname">
                                <span class="name">{{cmt.nickname}} </span>
                                <span class="date">{{cmt.createTime | dataFormat3}}</span>
                                <span class="rp">回复了你的文章</span>
                                <span @click="getBlogInfo(cmt.blog.id)" class="blog">{{cmt.blog.title}}</span>
                            </div>
                            <div class="op">
                                <span class="del" @click="deleteCommentById(cmt.id)">删除</span>
                            </div>
                        </div>
                        <p class="reply">{{cmt.content}}</p>
                    </div>
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editing: false,
            commentList:[],
        }
    },
    created(){
        this.getCommentList()
    },
    methods: {
        // 获取评论列表
        async getCommentList(){
            const {data: res} = await this.$blog.get('/admin/getCommentList')
            // console.log(res)
            this.commentList = res.data
        },
        // 删除评论
        async deleteCommentById(id){
            // 弹出对话框
            const confirmResult = await this.$confirm(
                    '此操作将永久删除该评论, 是否继续',
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
            const {data: res} = await this.$blog.get(`/comments/${id}/delete`)
            if (res.code !== 200){
               return  this.$message.error('删除失败！')
            }
            await this.getCommentList()
            return  this.$message.success('删除成功！')
        },
        // 跳转到博客详情页
        getBlogInfo(blogId) {
            this.$router.push({path: '/blogInfo', query: {id: blogId}});
        },
    }
}
</script>

<style scoped lang="less">
    .comment{
        border-bottom: 1px dashed #ccc;
        margin: 10px 0;
        display: flex;
    }
    .el-avatar{
        width: 35px;
        height: 35px;
        border: 2px solid white;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, .06);
        flex-shrink: 0;
    }
    .content{
        text-align: left;
        font-size: 14px;
        flex-grow: 1;
        .nkname{
            margin-left: 10px;
            max-width: 530px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .rp,.date{
                color: #999;
                margin-left: 10px;
            }
            .blog{
                color: #349edf;
                margin-left: 10px;
                cursor: pointer;
            }
        }
        .reply{
            margin-left: 10px;
        }
        .op{
            color: #ddd;
            font-weight: lighter;
            .rep{
                color: #349edf;
            }
            .del{
                color: red;
            }
        }
        .op:hover{
            cursor: pointer;
        }
    }

</style>
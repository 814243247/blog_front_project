<template>
    <el-form :model="replyForm" :rules="replyFormRules" ref="replyFormRef">
        <el-form-item prop="content" style="margin-bottom: 2px">
            <el-input v-model="replyForm.content" type="textarea" placeholder="请输入内容"
                      autosize></el-input>
        </el-form-item>
        <el-form-item style="text-align: right; margin-bottom: 2px">
            <el-button size="small" @click="quit">取消</el-button>
            <el-button size="small" type="primary" @click="reply()"> 回复</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props:['id','blogId'],
    data(){
        return {
            replyForm: {
                content: ''
            },
            replyFormRules: {
                content: [
                    {required: true, message: "评论内容不能为空！"},
                    {min: 0, max: 100, message: "评论内容不超过100字！"}
                ]
            },
        }
    },
    methods:{
        // 回复博客
        reply() {
            this.$refs.replyFormRef.validate( async valid => {
                if (!valid) return
                let comment = {}
                comment.content = this.replyForm.content
                comment.blogId = this.blogId
                this.userInfo = JSON.parse(window.sessionStorage.getItem('user'))
                if (this.userInfo === null) {
                    this.$message({message: "请您登录后再发表评论！", type: 'error', offset: 80});
                } else {
                    const {data: res} = await this.$blog.post('comments', {
                        content: comment.content,
                        blogId: comment.blogId,
                        userId: this.userInfo.id,
                        parentId: this.id
                    })
                    if (res.code === 200) {
                        this.$emit('newCmt',res.data)
                    } else {
                        this.$message({message: "评论发表失败！", type: 'error', offset: 80});
                    }
                }
            })
        },
        quit(){
            this.$emit('quit','-1')
        }
    }
}
</script>

<style scoped>

</style>
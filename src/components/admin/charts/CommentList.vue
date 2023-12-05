<template>
    <el-table :data="commentlist" class="comment-list"
              style="width: 100%;padding-top: 15px;height: 450px;overflow: auto">
        <el-table-column label="最新评论">
            <template slot-scope="scope">
                <div style="display: flex">
                    <el-avatar :src="scope.row.avatar" style="flex-shrink: 0"></el-avatar>
                    <div class="content" style="margin-left: 10px">
                        <div style="display: flex;justify-content: space-between;width: 100%">
                            <div class="nkname">
                                <span class="name">{{scope.row.nickname}} </span>
                                <span class="date">{{scope.row.createTime | dataFormat3}}</span>
                            </div>
                        </div>
                        <p class="reply">{{scope.row.content}}</p>
                    </div>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {

    data() {
        return {
            editing: false,
            commentlist: [],
            title: '最新评论'
        }
    },
    created() {
        this.getCommentList()
    },
    methods: {
        async getCommentList() {
            const {data: res} = await this.$blog.get('/admin/getCommentList')
            // console.log(res)
            this.commentlist = res.data
        },
        async deleteCommentById(id) {
            const {data: res} = await this.$blog.get('/admin/deleteCommentById', {
                params: id
            })
        }

    }
}
</script>

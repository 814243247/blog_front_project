<template>
    <div class="comment" >
        <el-avatar class="avatar" :src="rp.avatar" size="small"></el-avatar>
        <div class="right-con">
            <div class="comment-title">
                <a class="comment-author">
                    <span>{{rp.nickname}}</span>
                    <el-tag v-if="rp.adminComment === true" effect="plain" size="mini">作者</el-tag>
                    <span v-if="rp.parentComment!==null">回复</span>
                    <span v-if="rp.parentComment!=null&&rp.parentComment.id!==parentId"> {{rp.parentComment.nickname}}</span>
                </a>
                <div class="comment-data">
                    <span class="date">{{rp.createTime | dataFormat3}}</span>
                </div>
            </div>
            <div class="comment-content">
                {{rp.content}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['cmt', 'parentId'],
    data() {
        return {
            rp: this.cmt,
        }
    },
}
</script>

<style scoped lang="less">
    .comment {
        border-top: 1px solid #eee;
        padding-top: 20px;
        padding-bottom: 10px;
        display: flex;
        align-items: flex-start;
        font-size: 12px;

        .avatar {
            margin-right: 15px;
            margin-top: 5px;
            flex-shrink: 0;
        }

        .right-con {
            flex-grow: 1;
        }

        .comment-title {
            color: black;
            display: flex;

            .comment-author {
                font-weight: bold;
                font-size: 13px;

                span {
                    margin-right: 8px;
                }
            }

            .comment-data {
                color: rgba(0, 0, 0, .5);
            }
        }

        .reply {
            color: rgba(0, 0, 0, .5);
        }

        .reply:hover {
            color: rgba(0, 0, 0, 1);
            cursor: pointer;
        }

        .comment-content {
            font-size: 14px;
            letter-spacing: 2px;
            font-family: "微软雅黑", Arial, sans-serif;
        }
    }
</style>
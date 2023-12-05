<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card1" shadow="never" style="text-align: left">
            <div class="el-card__header" style="text-align: left;padding: 0;">
                <h1 style="margin: 0;">博客管理</h1>
            </div>
            <el-input style="width: 200px;margin-right: 20px;margin-top: 10px" placeholder="标题"
                      v-model="queryInfo.title"></el-input>
            <el-select v-model="type" @change="selectType " placeholder="分类" style="margin-right: 20px">
                <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-button @click="clearSearh">清除</el-button>
            <el-button type="primary" @click="getBlogList">搜索</el-button>
            <el-table :data="blogList" border stripe >
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div class="blog-information">
                            <el-row :gutter="20">
                                <el-col class="left-item" :sm="12" :lg="8">
                                    <el-card shadow="never" >
                                        <div class="firstPicture" >
                                            <h1 style="margin: 5px auto">博客首图 &nbsp;&nbsp;<el-button size="mini" circle type="primary" @click="editPic(scope.row)" ><i class="el-icon-edit"></i></el-button></h1>
                                            <el-image class="img" :src="scope.row.firstPicture"></el-image>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col class="middle-item" :sm="12" :lg="8">
                                    <el-card shadow="never">
                                        <h1 style="margin: 5px auto">描述</h1>
                                        <div style="word-break:break-all;">{{scope.row.description}}</div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title">
                    <template slot-scope="scope">
                        <p @click="getBlogInfo(scope.row.id)" class="change-type">{{scope.row.title}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="分类" prop="type.name" width="110px">
                    <template slot-scope="scope">
                        <div @click="changeBlogType(scope.row)" class="change-type">{{scope.row.type.name}}
                            <i class="el-icon-edit"></i></div>
                    </template>
                </el-table-column>
                <el-table-column label="标签" prop="tags" width="250px">
                    <template slot-scope="scope">
                        <el-tag size="medium" v-for="(tag, i) in scope.row.tags" :key="tag.id" closable
                                @close="handleClose(i,scope.row)">{{tag.name}}
                        </el-tag>
                        <el-input size="small" style="width: 100px;" class="input-new-tag" v-if="scope.row.inputVisible"
                                  v-model="scope.row.inputValue" ref="saveTagInput"
                                  @keyup.enter.native="handleInputConfirm(scope.row)"
                                  @blur="handleInputConfirm(scope.row)">
                        </el-input>
                        <el-button v-else size="mini" class="button-new-tag" @click="showInput(scope.row)">+ New Tag
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="阅读量" prop="views" width="70px"></el-table-column>
                <el-table-column label="更新时间" prop="updateTime" width="150px">
                    <template slot-scope="scope">
                        {{scope.row.updateTime | dataFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="90px">
                    <template slot-scope="scope">
                        <!--            修改按钮-->
                        <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                circle
                                @click="editBlogByid(scope.row)"
                        ></el-button>
                        <!--            删除按钮-->
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                circle
                                @click="removeBlogById(scope.row.id)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pagesize"
                    :current-page="pagenum"
                    :layout="pagLayout"
                    :total="totalcount">
            </el-pagination>
            <el-dialog class="publish_dialog" title="修改文章分类" :visible.sync="editTypeDialogFormVisible">
                <el-form style="text-align: left" ref="editTypeFormRef" :model="editTypeForm" :rules="editTypeFormRules"
                         class="edit_type_form">
                    <el-form-item label="文章分类" prop="type">
                        <el-select v-model="editTypeForm.typeId" placeholder="请选择文章分类" style="margin-right: 10px">
                            <el-option v-for="type in typeList" :label="type.name" :value="type.id"></el-option>
                        </el-select>
                        <el-button>+ 新建分类</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="backPage">取消</el-button>
                    <el-button type="primary" @click="changeTypeSubmit">提交修改</el-button>
                </div>
            </el-dialog>
            <el-dialog class="pic_dialog" title="修改文章首图" center :visible.sync="editPicDialogFormVisible" style="width: 800px;margin: 0 auto">
                <el-form  ref="editPicFormRef"
                         class="edit_pic_form">
                    <el-form-item style="text-align: center">
                        <el-upload
                                ref="upload"
                                action="http://localhost:8080/upload"
                                list-type="picture-card"
                                :limit="1"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-success="handleSuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="backPage2">取消</el-button>
                    <el-button type="primary" @click="changePicSubmit">确定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                title: '',
                typeId: null
            },
            pagenum: 1,
            pagesize: 8,
            blogList: [],
            totalcount: 0,
            editing: false,
            commentList: [],
            typeList: [],
            tagList: [],
            editTypeForm: {
                typeId: null
            },
            blog:null,
            editTypeDialogFormVisible: false,
            editTypeFormRules: {
                type: [
                    {required: true, message: '请选择类型', trigger: 'blur'}
                ],
            },
            type: '',
            inputValue: '',
            inputVisible: false,
            editPicDialogFormVisible:false,
            dialogVisible:false,
            dialogImageUrl:'',
            screenWidth: document.documentElement.clientWidth,  //实时屏幕宽度
        }
    },
    computed:{
        pagLayout(){
            if (this.screenWidth<768){
                return 'prev, pager, next'
            } else {
                return 'total, prev, pager, next, jumper'
            }
        }
    },
    created() {
        this.getBlogList()
        this.getFullTypeList()
        this.getFullTagList()
    },
    methods: {
        handleRemove() {
            this.dialogImageUrl = ''
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        async handleSuccess(res) {
            this.dialogImageUrl = res.data.dialogImageUrl
        },
        // 点击取消按钮
        backPage2() {
            this.editPicDialogFormVisible = false
            this.$refs.upload.clearFiles()
            this.$refs.editPicFormRef.resetFields()
        },
        // 修改博客首图
        async changePicSubmit(){
            this.blog.firstPicture = this.dialogImageUrl
            const {data: res} = await this.$blog.post('/admin/blogs', {
                blog: this.blog
            })
            // console.log(res)
            if (res.code === 200) {
                this.editPicDialogFormVisible = false

                return this.$message.success('修改首图成功！')
            } else {
                this.editPicDialogFormVisible = false
                return this.$message.error('修改首图失败！')
            }
        },
        editPic(row){
            this.blog = row
            // console.log(this.blog)
            this.editPicDialogFormVisible = true
        },
        // 跳转到博客详情页
        getBlogInfo(blogId) {
            this.$router.push({path: '/blogInfo', query: {id: blogId}});
        },
        // 修改当前页码
        handleCurrentChange(newSize) {
            this.pagenum = newSize
            this.getBlogList()
        },
        // 修改当前页大小
        handleSizeChange(newSize) {
            this.pagesize = newSize
            this.getGoodsList()
        },
        // 获取博客列表
        async getBlogList() {
            const {data: res} = await this.$blog.post('/admin/getBlogList', {
                title: this.queryInfo.title,
                typeId: this.queryInfo.typeId,
                pagenum: this.pagenum,
                pagesize: this.pagesize,
            })
            res.data.content.forEach(item => {
                // 控制文本框的显示与隐藏
                item.inputVisible = false
                // 文本框中输入的值
                item.inputValue = ''
                // 标签值转为字符串
            })
            this.blogList = res.data.content
            this.totalcount = res.data.totalElements
            // console.log(this.blogList)
        },
        // 删除博客
        async removeBlogById(id) {
            // 弹出对话框
            const confirmResult = await this.$confirm(
                '此操作将永久删除该博客, 是否继续',
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
            const {data: res} = await this.$blog.get('/admin/blogs/' + id + '/delete')
            if (res.code !== 200) return this.$message.error('删除博客失败！')
            this.$message.success('删除博客成功！')
            this.getBlogList()
        },
        // 编辑博客
        editBlogByid(blog) {
            // console.log(blog)
            this.$router.push({
                path: "/admin/blog-input",
                query: {blog: JSON.stringify(blog)}
            })
        },
        // 得到所有的分类
        async getFullTypeList() {
            const {data: res} = await this.$blog.get('/admin/getFullTypeList')
            this.typeList = res.data
        },
        // 得到所有的标签
        async getFullTagList() {
            const {data: res} = await this.$blog.get('/admin/getFullTagList')
            this.tagList = res.data
        },
        // 修改博客分类
        async changeBlogType(blog) {
            this.editTypeDialogFormVisible = true
            this.editTypeForm.blog = blog
        },
        // 点击取消按钮
        backPage() {
            this.$refs.editTypeFormRef.resetFields()
            this.editTypeDialogFormVisible = false
        },
        // 提交类型修改
        async changeTypeSubmit() {
            let blog = this.editTypeForm.blog
            blog.type = this.typeList.find(item => item.id === this.editTypeForm.typeId)
            // console.log(blog)
            const {data: res} = await this.$blog.post('/admin/blogs', {
                blog: blog
            })
            if (res.code === 200) {
                this.editTypeDialogFormVisible = false
                return this.$message.success('修改博客分类成功！')
            } else {
                this.editTypeDialogFormVisible = false
                return this.$message.error('修改博客分类失败！')
            }
        },
        // 点击按钮,展示文本输入框
        showInput(row) {
            row.inputVisible = true
            //   让输入框自动获取焦点
            // $nextTick方法的作用：当页面元素被重新渲染之后，才会至指定回调函数中的代码
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        // 文本框失去焦点,或按下了Enter都会触发
        async handleInputConfirm(row) {
            // 输入的内容为空时，清空
            if (row.inputValue.trim().length === 0) {
                row.inputValue = ''
                row.inputVisible = false
                return
            }
            const newTag = this.tagList.find(item => item.name === row.inputValue.trim())
            if (newTag !== undefined) {
                row.tags.push(newTag)
                row.tagIds = row.tags.map(item => {
                    return item.id
                }).toString().replace(/\[|]/g, '');
                // console.log(row)
                const res = await this.uploadBlog(row)
                if (res === true) {
                    row.inputValue = ''
                    row.inputVisible = false
                    return this.$message.success('修改博客标签成功！')
                } else {
                    this.$message.error('修改博客标签失败！')
                }
            } else {
                const res1 = await this.createTag(row.inputValue.trim())
                if (res1 === null) {
                    this.$message.error('修改博客标签失败！')
                } else {
                    row.tags.push(res1)
                    row.tagIds = row.tags.map(item => {
                        return item.id
                    }).toString().replace(/\[|]/g, '');
                    const res2 = await this.uploadBlog(row)
                    if (res2 === true) {
                        row.inputValue = ''
                        row.inputVisible = false
                        return this.$message.success('修改博客标签成功！')
                    } else {
                        this.$message.error('修改博客标签失败！')
                    }
                }
            }
        },
        // 创建新标签
        async createTag(newTag) {
            const {data: res} = await this.$blog.post('/admin/tags', {
                tag: {name: newTag}
            })
            if (res.code !== 200) {
                return null
            } else  {
                return res.data
            }
        },
        async uploadBlog(inputBlog) {
            // 提交数据库，保存修改
            const {data: res} = await this.$blog.post('/admin/blogs', {
                blog: inputBlog
            })
            // console.log(res)
            return res.code === 200;
        },

        // 删除对应的参数可选项
        async handleClose(i, row) {
            let tag = row.tags[i]
            // console.log(tag)
            row.tags.splice(i, 1)
            row.tagIds = row.tags.map(item => {
                return item.id
            }).toString().replace(/\[|]/g, '');
            const res = await this.uploadBlog(row)
            if (res===true){
                const res2 = await this.dealDeletedTag(tag)
                if (res2 === true){
                    return this.$message.success('修改博客标签成功！')
                } else {
                    this.$message.error('修改博客标签失败！')
                }
            }
        },
        // 删除博客标签后将多余标签级联删除
        async dealDeletedTag(tag){
            const {data: res} = await this.$blog.get(`/admin/dealDeletedTag/${tag.id}`)
            return res.code === 200
        },
        // 选择类型
        selectType() {
            this.queryInfo.typeId = this.typeList.find(item => item.name === this.type).id
        },
        // 清空搜索内容
        clearSearh() {
            this.queryInfo.typeId = null
            this.queryInfo.title = ''
            this.type = ''
            this.getBlogList()
        }
    }
}
</script>

<style scoped lang="less">
    .el-tag {
        margin: 2px;
    }

    .blog-information {
        width: 100%;

        .firstPicture {
            text-align: center;
            h1{
                display: flex;
                justify-content: center;
                align-items: center;
                .el-button{
                    margin-left: 20px;
                }
            }
            /*padding-right: 20px;*/
            /*border-right: 1px dashed #999;*/
            /*box-sizing: border-box;*/

            .img {
                margin: 10px 0;
                width: 90%;
                border-radius: 10px;
            }
        }

        .middle-item {
            /*padding-right: 20px;*/
            /*border-right: 1px dashed #999;*/
            height: 100%;
            /*box-sizing: border-box;*/

            h1 {
                text-align: center;
            }

        }

        .right-item {
            /*margin-left: 20px;*/

            .comment {
                border-bottom: 1px dashed #ccc;
                margin: 10px 0;
                display: flex;
            }

            .el-avatar {
                width: 35px;
                height: 35px;
                border: 2px solid white;
                box-shadow: 0 0 10px 2px rgba(0, 0, 0, .06);
                flex-shrink: 0;
            }

            .content {
                text-align: left;
                font-size: 14px;
                flex-grow: 1;

                .nkname {
                    margin-left: 10px;
                    max-width: 530px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    .rp, .date {
                        color: #999;
                        margin-left: 10px;
                    }

                    .blog {
                        color: #349edf;
                        margin-left: 10px;
                    }
                }

                .reply {
                    margin-left: 10px;
                }

                .op {
                    color: #ddd;
                    font-weight: lighter;

                    .rep {
                        color: #349edf;
                    }

                    .del {
                        color: red;
                    }
                }

                .op:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .change-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .change-type:hover {
        cursor: pointer;
        color: #409eff;
    }

    @media screen and (max-width: 748px){
        .el-input,.el-select{
            width: 100% !important;
            margin-bottom: 20px;
        }
        .blog-information{
            .left-item{
                width: 40%;
            }
            .middle-item{
                width: 30%;
            }
            .right-item{
                width: 30%;
            }
        }
    }

</style>
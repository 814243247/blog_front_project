<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="never">
            <el-button type="primary" @click="createTypeDialogFormVisible = true">新建分类</el-button>
            <el-table :data="typeList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="图片" prop="pic_url" width="150px">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.pic_url"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="博客数量" prop="blogs.length"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--            修改按钮-->
                        <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="editBlogDialog(scope.row)"
                        >编辑
                        </el-button>
                        <!--            删除按钮-->
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeBlogById(scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="分类修改" :visible.sync="createTypeDialogFormVisible">
            <el-form style="text-align: left" ref="createTypeFormRef" :model="createTypeForm"
                     :rules="createTypeFormRules" label-width="80px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="createTypeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="封面图片">
                    <el-upload
                            ref="upload"
                            action="http://localhost:8080/upload"
                            list-type="picture-card"
                            :limit="1"
                            :file-list="fileList"
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
                <el-button @click="backPage">取消</el-button>
                <el-button type="primary" @click="createType">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            typeList: [],
            createTypeDialogFormVisible: false,
            dialogImageUrl: '',
            createTypeForm: {
                name: ''
            },
            createTypeFormRules: {
                name: [
                    {required: true, message: '分类名称不能为空', trigger: 'blur'}
                ],
            },
            type: {
                id: null,
                name: '',
                pic_url: ''
            },
            fileList: [],
            dialogVisible: false
        }
    },
    created() {
        this.getFullTypeList();
    },
    methods: {

        compare(property) {
            return function (a, b) {
                let value1 = a[property].length;
                let value2 = b[property].length;
                return value2 - value1;
            }
        },
        // 得到所有的分类
        async getFullTypeList() {
            const {data: res} = await this.$blog.get('/admin/getFullTypeList')
            this.typeList = res.data.sort(this.compare('blogs'))
        },

        selectCard(id) {
            this.selectedCard = id
            // console.log(this.selectedCard)
        },
        createType() {
            this.$refs.createTypeFormRef.validate(async valid => {
                if (!valid) return
                this.type.name = this.createTypeForm.name
                this.type.pic_url = this.dialogImageUrl
                // console.log(this.type)
                const {data: res} = await this.$blog.post('/admin/types', {
                    type: this.type
                })
                // console.log(res)
                if (res.code === 200) {
                    this.createTypeDialogFormVisible = false
                    await this.getFullTypeList()
                    return this.$message.success(res.message)
                } else {
                    this.createTypeDialogFormVisible = false
                    return this.$message.error(res.message)
                }
            })
        },
        async removeBlogById(row) {
            const {data: res} = await this.$blog.get(`/admin/types/${row.id}/delete`)
            // console.log(res)
            if (res.code === 200) {
                this.createTypeDialogFormVisible = false
                await this.getFullTypeList()
                return this.$message.success(res.message)
            } else {
                return this.$message.error(res.message)
            }
        },
        handleRemove() {
            this.dialogImageUrl = ''
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        async handleSuccess(res) {
            console.log(res);
            this.dialogImageUrl = res.data.dialogImageUrl
        },
        backPage() {
            this.$refs.upload.clearFiles()
            this.blog.firstPicture = ''
            this.createTypeDialogFormVisible = false
            this.createTypeForm.name = ''
            this.$refs.createTypeFormRef.resetFields()
        },
        editBlogDialog(row) {
            this.type = row
            // console.log(this.type)
            if (row.pic_url!=''){
                this.dialogImageUrl = row.pic_url
            }
            this.fileList = [{name: row.pic_url, url: row.pic_url}]
            this.createTypeForm.name = row.name
            this.createTypeDialogFormVisible = true
        }
    },
}
</script>

<style scoped>

</style>
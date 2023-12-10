<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>撰写博客</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="5">
            <el-col :span="21">
                <el-input placeholder="请输入文章标题" v-model="blog.title"></el-input>
            </el-col>
            <el-col :span="3">
                <el-button style="border-radius: 20px" type="danger" @click="submit">发布文章</el-button>
            </el-col>
        </el-row>
        <el-row>
            <mavon-editor v-model="blog.content" style="margin: 10px auto;min-height: 70vh"
            ref="md" @imgAdd="imgAdd" @imgDel="imgDel"
            />
        </el-row>
        <el-row align="right" type="flex" justify="end">

        </el-row>
        <el-dialog class="publish_dialog" title="发布文章" :visible.sync="publishDialogFormVisible">
            <el-form style="text-align: left" ref="publishFormRef" :model="publishForm" :rules="publishFormRules"
                     class="publish_form">
                <el-form-item label="文章分类" prop="type">
                    <el-select size="small" v-model="publishForm.type" placeholder="请选择文章分类" style="margin-right: 10px"
                               @change="setBlogType">
                        <el-option v-for="type in typeList" :label="type.name" :value="type.id" :key="type.id"></el-option>
                    </el-select>
<!--                    <el-button size="small">+ 新建分类</el-button>-->
                </el-form-item>
                <el-form-item label="文章标签" prop="tags">
                    <el-card shadow="never" style="height: 120px; overflow: auto">
                        <el-checkbox-group v-model="publishForm.tags">
                            <el-checkbox v-for="tag in tagList" :label="tag.id" :key="tag.id">{{tag.name}}</el-checkbox>
                        </el-checkbox-group>
<!--                        <el-button size="mini">+ 新建标签</el-button>-->
                    </el-card>
                </el-form-item>
                <el-form-item label="文章类型" prop="flag">
                    <el-select size="small" v-model="publishForm.flag">
                        <el-option
                                v-for="item in flags"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章首图">
                    <el-upload
                            ref="upload"
                            action="http://www.suenaga.top:8080/upload"
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
                <el-button @click="backPage">取消</el-button>
                <el-button type="primary" @click="publishBlog">发布文章</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
export default {
    data() {
        return {
            blog: {
                id:null,
                content: "",
                flag: "",
                title: "",
                type: {},
                tagIds: '',
                firstPicture: "",
                appreciation: 0,
                user: {},
                views: 0,
                commentabled: true
            },
            dialogImageUrl:'',
            flags: [
                {value: "原创", label: "原创"},
                {value: "转载", label: "转载"},
                {value: "翻译", label: "翻译"}
            ],
            publishDialogFormVisible: false,
            publishForm: {
                // type: {},
                tags: [],
                flag:'原创'
            },
            typeList: [],
            tagList: [],
            publishFormRules: {
                type:[
                    {required: true,message: '请选择类型',trigger: 'blur'}
                ],
                tags:[
                    {required: true,message: '请选择至少一种标签',trigger: 'blur'}
                ],
                flag:[
                    {required: true,message: '请选择文章类型',trigger: 'blur'}
                ],
            },
            dialogVisible: false
        }
    },
    created(){
      if (typeof this.$route.query.blog !== 'undefined'){
          this.blog = JSON.parse(this.$route.query.blog)
      }
    },
    methods: {
        async imgAdd(pos, $file) {
            // console.log($file)
            let formdata = new FormData();
            formdata.append('file', $file);
            const {data: res} = await this.$blog.post('/upload', formdata)
            if (res.code === 200) {
                this.$refs.md.$img2Url(pos, res.data.dialogImageUrl)
            }
        },
        async imgDel(pos) {
            // console.log(pos[0])
            let len = pos[0].split('/').length
            let filename = pos[0].split('/')[len - 1]
            // console.log(filename)
            const {data: res} = await this.$picture.get(`/delete/${filename}`)
        },
        // 获取博客类型列表
        async getTypeList() {
            const {data: res} = await this.$blog.get('/admin/getFullTypeList')
            // console.log(res)
            this.typeList = res.data
        },
        // 获取博客标签列表
        async getTagList() {
            const {data: res} = await this.$blog.get('/admin/getFullTagList')
            // console.log(res)
            this.tagList = res.data
        },
        async submit() {
            if (this.blog.id!==null){
                const {data: res} = await this.$blog.post('/admin/blogs', {
                    blog: this.blog
                })
                // console.log(res)
                if (res.code === 200) {
                    this.publishDialogFormVisible = false
                    this.$router.go(-1);
                    return this.$message.success('修改博客成功！')
                } else {
                    this.publishDialogFormVisible = false
                    return this.$message.error('修改博客失败！')
                }
            } else {
                await this.getTypeList()
                await this.getTagList()
                this.publishDialogFormVisible = true
            }
        },
        async handleSuccess(res) {
            this.dialogImageUrl = res.data.dialogImageUrl
        },
         async publishBlog() {
            await this.$refs.publishFormRef.validate(async valid => {
                if (!valid) return
                this.blog.firstPicture = this.dialogImageUrl
                this.blog.tagIds = this.publishForm.tags.toString().replace(/\[|]/g, '');
                this.blog.flag = this.publishForm.flag
                // console.log(this.blog.content)
                this.blog.user = JSON.parse(window.sessionStorage.getItem('user'))
                const {data: res} = await this.$blog.post('/admin/blogs', {
                    blog: this.blog
                })
                // console.log(res)
                if (res.code === 200) {
                    this.publishDialogFormVisible = false
                    return this.$message.success('发布博客成功！')
                } else {
                    this.publishDialogFormVisible = false
                    return this.$message.error('发布博客失败！')
                }
            })

        },
        handleRemove() {
            this.dialogImageUrl = ''
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        setBlogType(res) {
            this.blog.type = this.typeList.find(item => item.id === res)
        },
        backPage(){
            this.$refs.upload.clearFiles()
            this.blog.firstPicture = ''
            this.publishDialogFormVisible = false
            this.$refs.publishFormRef.resetFields()
        }
    }
}
</script>

<style scoped lang="less">
    .el-form /deep/ .el-form-item__content {
        line-height: 23px;
    }

    .el-card /deep/ .el-card__body {
        padding: 10px;
    }

</style>
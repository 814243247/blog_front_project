<template>
    <el-dialog class="login_dialog" title="请登录" :visible.sync="loginFormVisiable" @close="resetLoginForm" width="400px" center>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="60px" class="login_form">
            <!--        用户名-->
            <el-form-item prop="username" label="账号">
                <el-input v-model="loginForm.username">
                </el-input>
            </el-form-item>
            <!--        密码-->
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button @click="resetLoginForm">取消</el-button>
                <el-button type="primary" @click="userLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data() {
        return {
            user:{
                username:'',
                password:'',
                loginProvince:'陕西省',
                loginCity:'咸阳市',
                loginLat:34.27, //纬度
                loginLng:108.08, //经度
            },
            // 表单数据绑定对象
            loginForm: {
                username: '',
                password: ''
            },
            // 表单验证规则对象
            loginFormRules: {
                // 验证用户是否合法
                username: [
                    // 必填，提示消息，鼠标焦点消失时触发
                    {required: true, message: "请输入用户名", trigger: "blur"},
                    {min: 2, max: 10, message: "长度在2-10个字符之间"}
                ],
                // 验证密码是否合法
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                    {min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur"}
                ]
            },
        }
    },
    computed:{
       ...mapState([
           'loginFormVisiable'
       ])
    },
    methods: {
        resetLoginForm() {
            this.$store.commit('cancelLFV')
            this.$refs.loginFormRef.resetFields()
        },
        // 用户登录
        userLogin() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return;
                this.user.username = this.loginForm.username
                this.user.password = this.$md5(this.loginForm.password)
                let local = await this.getLocalCity()
                this.user.loginProvince = local.result.ad_info.province
                this.user.loginCity = local.result.ad_info.city
                this.user.loginLat = local.result.location.lat
                this.user.loginLng = local.result.location.lng
                const {data: res} = await this.$blog.post('/login', {
                    user:this.user
                });
                if (res.code !== 200) return this.$message({message: '用户名或密码错误', type: 'error', offset: 80})
                this.$message({message: '登录成功', type: 'success', offset: 80});
                this.$refs.loginFormRef.resetFields()
                window.sessionStorage.setItem("token", JSON.stringify(res.data.token));
                window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
                this.$store.commit('getUserInfo')
                this.$store.commit('cancelLFV')
            })
        },
        async getLocalCity(){
            let data = {
                key: 'IUTBZ-UHAKU-PD6VI-BZEEY-N3YT3-SCB6J',
                output:'jsonp'
            }
            let url = 'https://apis.map.qq.com/ws/location/v1/ip'
            // console.log(this.$jsonp(url, data))
            const res = await this.$jsonp(url, data)
            return res
        }
    }
}
</script>

<style lang="less" scoped>

    .login_form {
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_dialog{
        opacity: 1;
    }

</style>

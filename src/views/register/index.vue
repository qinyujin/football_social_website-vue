<template>
<div>
    注册页面
    <br/>

    名称:<el-input placeholder="请输入想要注册的名称" v-model="name"></el-input>
    账号:<el-input placeholder="请输入账号，之后就用它来登录哦!" v-model="num"></el-input>
    密码:<el-input placeholder="请输入密码" type="password" v-model="password"></el-input>
    确认密码:<el-input placeholder="请确认您的密码" type="password" v-model="confirmPassword"></el-input>

    <el-button @click="register">注册</el-button>
    {{num}}/{{password}}/{{confirmPassword}}
</div>
</template>

<script>
import {register} from '@/api/user.js'

export default {
    data() {
        return {
            name:'',
            num:null,
            password:null,
            confirmPassword:null
        }
    },
    methods:{
        register(){
             if(this.confirmPassword == this.password){
                 console.log("准备注册")
            register({
                name:this.name,
                num:this.num,
                password:this.password,
            })
            .then(resp => {
                if(resp.code == 200){
                    this.$message.success(resp.message)
                    //成功之后重定向到登录，延时1s
                    setTimeout(() => {
                        this.$router.replace('/login')
                    }, 1000);
                }
                else{
                    this.$message.error(resp.message)
                }
             })    
            }
            else{
                this.$message.error('两次密码输入不一致!');
            }
        }
    }
}
</script>
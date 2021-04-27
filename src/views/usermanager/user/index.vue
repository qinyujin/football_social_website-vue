<template>
    <div>
        <!-- 弹出框 -->
        <el-dialog
        title="添加用户"
        :visible.sync = "loginDialogVisible"
        width="30%"
        >
        <!-- 添加表单(框) -->
        <el-form ref="loginForm" :model="loginForm" label-width="80px">
            <!-- name -->
            <el-form-item label="名称">
                <el-input 
                type="text"
                placeholder="请输入用户的名称"
                v-model="loginForm.name"
                />
            </el-form-item>

            <!-- num -->
            <el-form-item label="账号">
                <el-input 
                type="text"
                placeholder="请输入用户的账号"
                v-model="loginForm.num"
                />
            </el-form-item>

            <!-- password -->
            <el-form-item label="密码">
                <el-input 
                type="text"
                placeholder="请输入用户的密码"
                v-model="loginForm.password"
                />
            </el-form-item>

            <!-- icon -->
            <el-form-item label="头像">
                <el-input
                placeholder="test"
                v-model="loginForm.icon"
                />
            </el-form-item>

            
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button style="primary" @click="saveUser(),loginDialogVisible = true">
                确定
            </el-button>

            <el-button @click="loginDialogVisible = false" style="margin-right:0px">
                取消
            </el-button>
        </span>

        </el-dialog>

        <!-- 编辑用户 -->
        <el-dialog
        title="编辑用户"
        :visible.sync="editDialogVisible"
        width="30%"
        >
        <el-form ref="loginForm" :model="loginForm" label-width="80px">
            <!-- name -->
            <el-form-item label="名称">
                <el-input 
                type="text"
                placeholder="请输入用户的名称"
                v-model="loginForm.name"
                />
            </el-form-item>

            <!-- password -->
            <el-form-item label="密码">
                <el-input 
                type="text"
                placeholder="请输入用户的密码"
                v-model="loginForm.password"
                />
            </el-form-item>

            <!-- icon -->
            <el-form-item label="头像">
                <el-input
                placeholder="test"
                v-model="loginForm.icon"
                />
            </el-form-item>

            
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button style="primary" @click="updateUser(),editDialogVisible = false">
                确定
            </el-button>

            <el-button @click="editDialogVisible = false" style="margin-right:0px">
                取消
            </el-button>
        </span>

        </el-dialog>
        
        <!-- 设置角色 -->
        <el-dialog
        title="设置用户角色"
        :visible.sync="setRoleDialogVisible"
        >
        <el-form label-width="80px" label-position="left">
        <el-form-item label="当前用户">{{ uid }}</el-form-item>

        <el-form-item label="选择角色">
          <el-select v-model="rid" placeholder="请选择">
            <el-option
              v-for="r in roles"
              :key="r.index"
              :label="r.name"
              :value="r.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="已有角色">
          <el-select v-model="rid" placeholder="请选择">
            <el-option
              v-for="r in acessedRoles"
              :key="r.id"
              :label="r.name"
              :value="r.id"
            />
          </el-select>
          <el-button
            size="mini"
            type="danger"
            class="el-icon-delete"
            style="margin-left: 10px"
            @click="deleteUserRole()"
          >删除角色</el-button>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            setRoleDialogVisible = false;
            setRole(rid)
          "
        >确 定</el-button>
      <el-button @click="setRoleDialogVisible = false">取 消</el-button>
      </span>
        </el-dialog>

        <el-button style="margin-left:25px;margin-top:15px" @click="loginDialogVisible = true">
            添加用户
        </el-button>

        <el-table
        :data="userTableData"
        style="width:100%"
        >
        <el-table-column
        prop="id"
        label="用户id"
        width="180"
        >
        </el-table-column>

        <el-table-column
        prop="num"
        label="用户账号"
        width="180"
        >
        </el-table-column>


        <el-table-column
        prop="name"
        label="名称"
        width="180"
        >
        </el-table-column>
        <el-table-column
        prop="icon"
        label="用户头像path"
        width="180"
        >
        </el-table-column>

        <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            class="el-icon-edit"
            size="mini"
            @click="(editDialogVisible = true), (id = scope.row.id)"
          >编辑</el-button>

          <el-button
            size="mini"
            class="el-icon-setting"
            @click="
              (setRoleDialogVisible = true),
                (uid = scope.row.id),
                fetchUserRole(scope.row.id)
            "
          >设置角色</el-button>

          <el-button
            size="mini"
            type="danger"
            class="el-icon-delete"
            @click="deleteUser(scope.row.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {saveUser,listUser,updateUser,deleteUser,fetchUserRole,listRole,deleteUserRole,setRole} from "@/api/user";
import {Message} from "element-ui";

export default {
    inject: ['reload'],
    created(){
        console.log("页面初始化回调函数")
        listUser().then(resp =>{
            resp.code == 200 ? this.userTableData = JSON.parse(resp.data) : Message.error("系统出错，请联系管理员")
        })
        listRole().then(resp =>{
            this.roles = resp.data
        })
    },
    data:() =>({
        //对话框
        loginDialogVisible:false,
        editDialogVisible:false,
        setRoleDialogVisible:false,

        //用户数据
        userTableData:[
            {
                id:null,
                name:'',
                icon:'',
                num:''
            }
        ],

        //角色
        

        //更新用户
        id:null,
        uid:null,
        rid:null,
        rids:null,
        roles:{},
        acessedRoles:[],

        //用户拥有的角色

        //登录表单
        loginForm:{
            name:'',
            num:'',
            password:'',
            icon:''
        }
    }),
    methods:{
        saveUser(){
            saveUser(
                this.loginForm
            ).then(resp => {
                console.log("添加用户成功.返回消息：",resp.message);
                resp.code == 200 ? Message.success(resp.message) : Message.error(resp.message)
                this.reload()
            })
        },
        updateUser(){
            updateUser({
                id:this.id,
                name:this.loginForm.name,
                num:this.loginForm.num,
                password:this.loginForm.password,
                icon:this.loginForm.icon
            }).then(resp =>{
                resp.code == 200 ? Message.success(resp.message) : Message.error(resp.message)
                this.reload()
            })
        },
        deleteUser(id){
            deleteUser(id).then(resp => {
                console.log(resp)
                resp.code == 200 ? Message.success(resp.message) : Message.error(resp.message)
                this.reload()
            })
        },
        fetchUserRole(uid){
            fetchUserRole(uid).then(resp =>{
                //获取到每个用户所拥有的角色集合
                this.rids = JSON.parse(resp.data)
                //获取到集合之后，通过和权限列表进行过滤，得到当前的用户所拥有的权限列表
                let intersection =this.roles.filter(r => this.rids.includes(r.id))
                this.acessedRoles = intersection
                console.log(this.acessedRoles)
            })
        },
        deleteUserRole(){
            deleteUserRole({
                uid:this.uid,
                rid:this.rid
            }).then(resp =>{
                resp.code == 200 ? Message.success(resp.message) : Message.error(resp.data)
                this.reload()
            })
        },
        setRole(){
            setRole({
                userId:this.uid,
                roleId:this.rid
            }).then(resp =>{
                resp.code == 200 ? Message.success(resp.message) : Message.error(resp.message)
            })
        }

    }
}
</script>
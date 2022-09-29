<template>
  <div class="card_login">
    <el-card :class="{show : isTea}">
      <div class="sign"><h2>老师登录</h2></div>
        <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="70px" class="userForm">
            <el-form-item label="用户名" prop="user">
                <el-input type="username" v-model="userForm.user" ></el-input>
            </el-form-item>
             <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="userForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
                <el-button @click="resetForm('userForm')">重置</el-button>
                <el-button type="info" plain @click="changeStu">学生登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card :class="{show : isStu}">
      <div class="sign"><h2>学生登录</h2></div>
        <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="70px" class="userForm">
            <el-form-item label="用户名" prop="user">
                <el-input type="username" v-model="userForm.user" ></el-input>
            </el-form-item>
             <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="userForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitFormStu('userForm')">提交</el-button>
                <el-button @click="resetForm('userForm')">重置</el-button>
                <el-button type="info" plain @click="changeTea">老师登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    </div>
</template>

<script>
import '../assets/css/login.css'
import {login} from '../../server/index'
import {loginStu} from '../../server/index'
 export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
       var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        userForm: {
          pass: '',
          user: ''
        },
        isTea: false,
        isStu: true,
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          user: [
            { validator: validateUser, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
              /* this.$http.get('http://127.0.0.1/login',{
                params: {
                  name: this.userForm.user,
                  password: this.userForm.pass
                }
              }) */
              login({
                  name: this.userForm.user,
                  password: this.userForm.pass
              }).then((res) => {
                      if (res.data.status === 100) {
                        window.sessionStorage.setItem('token',res.data.token)
                          // user:that.userForm.account
                         /*  that.$store.commit('updateUserName', that.userForm.account)*/
                          this.$router.push('/main')
                          console.log('登录成功')
                      } else{
                          alert("登录失败，用户名不存在或者密码错误")
                      }
                  })
                  .catch(function (error) {
                      console.log(error)
                  });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitFormStu(userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
              /* this.$http.get('http://127.0.0.1/login',{
                params: {
                  name: this.userForm.user,
                  password: this.userForm.pass
                }
              }) */
              loginStu({
                  name: this.userForm.user,
                  password: this.userForm.pass
              }).then((res) => {
                      if (res.data.status === 100) {
                        window.sessionStorage.setItem('token',res.data.token)
                          // user:that.userForm.account
                         /*  that.$store.commit('updateUserName', that.userForm.account)*/
                          this.$router.push({
                            path: '/stuMain',
                            query: {
                              id: this.userForm.user
                            }
                          })
                          console.log('登录成功')
                      } else {
                          alert("登录失败，用户名不存在或者密码错误")
                      }
                  })
                  .catch(function (error) {
                      console.log(error)
                  });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(userForm) {
        this.$refs[userForm].resetFields();
      },
      changeStu(){
        this.isTea = true
        this.isStu = false
      },
      changeTea(){
        this.isTea = false
        this.isStu = true
      }
    }
  }
</script>
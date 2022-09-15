<!-- eslint-disable prettier/prettier -->
<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleActive(item)"
          :class="{ 'active': item.current }"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单开始 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm login-from">

        <el-form-item prop="username" class="login-from-el">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="login-from-el">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="login-from-el" v-show="modle === 'register'">
          <label>再次输入密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="login-from-el">
          <label>验证码</label>
          <el-row :gutter="10" class="el-form-row-width">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="block">提交</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validateEmail,
  validatePassword,
  validateVcode,
} from "@/utils/validate.js";
export default {
  name: "loginView",
  data() {
    // 验证码验证
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (!validateVcode(value)) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    // 邮箱验证
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!validateEmail(value)) {
        callback(new Error("请输入正确格式邮箱"));
      } else {
        callback();
      }
    };
    // 密码验证
    var validatePass = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePassword(value)) {
        callback(new Error("密码为6~20位的数字+字母"));
      } else {
        callback();
      }
    };
    // 重复密码验证
    var validatePass2 = (rule, value, callback) => {
      // 如果当前模块值为 login ,则不需要验证
      if (this.modle === "login") {
        callback();
      }
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    //表单结束
    return {
      menuTab: [
        { txt: "登录", current: true, modle: "login" },
        { txt: "注册", current: false, modle: "register" },
      ],
      // 模块值
      modle: "login",
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwords: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
      //表单数据结束
    };
  },
  methods: {
    toggleActive(data) {
      this.modle = data.modle;
      this.menuTab.forEach((e) => {
        e.current = false;
      });
      // console.log(data);
      data.current = true;
    },
    // 表单方法
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  padding-top: 250px;
  width: 100%;
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  text-align: center;
  margin: 0px auto;
  color: #fff;
  font-size: 14px;
  li {
    display: inline-block;
    width: 88px;
    height: 36px;
    margin-bottom: 39px;
    vertical-align: center;
    line-height: 36px;
    border-radius: 2px;
    cursor: pointer;
  }
  .active {
    background-color: #2f4255;
  }
  .login-from {
    height: 330px;
  }
  label {
    display: block;
    height: 14px;
    line-height: 14px;
  }
  .login-from-el {
    height: 69px;
    margin-bottom: 20px;
  }
  .el-form-row-width {
    width: 340px;
    // margin: 0 0;
    margin-left: 0px;
    margin-right: 0px;
  }
  .block {
    display: block;
    width: 100%;
  }
}
</style>

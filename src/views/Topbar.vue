<template>
  <div class="topbar w">
    <h2>网易云音乐</h2>
    <div class="top-mid">
      <div>
        <!-- <button>&lt;</button>
        <button>&gt;</button>-->
      </div>
      <input class="search" type="text" placeholder="音乐、视频、歌手" />
    </div>
    <div class="top-right">
      <span class="login" v-if="okay" @click="login">登录</span>
      <span v-else>{{nickname}}  <span>退出账号</span> </span>
      <div ref="login" class="login-wrap">
       <i  class="el-icon-close close" @click="close"></i>
        <div class="login-contend">
          <div>
            <el-input placeholder="请输入手机号码" v-model="pnum" clearable></el-input>
          </div>
          <div>
            <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
          </div>
          <div class="loading">
            <el-button type="danger" round @click="loading">登录</el-button>
            <el-button type="danger" round >注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Topbar",
  data() {
    return {
      pnum: "",
      pwd: "",
      okay: true,
      nickname: "",
    };
  },
  methods: {
    //点击显示登录框
    login() {
      this.$refs.login.style.display = "block";
    },
    close() {
      this.$refs.login.style.display = "";
    },
    //登录
    loading() {
      axios
        .post("/login/cellphone", {
          phone: this.pnum,
          password: this.pwd,
        })
        .then((res) => {
          this.nickname = res.data.profile.nickname;
          this.okay = false, 
          this.$refs.login.style.display = "";
          console.log(res);
          //保存cookie值和token值，后面访问都要用到
          sessionStorage.setItem("cookie",res.data.cookie) 
          sessionStorage.setItem("token",res.data.token) 
         
        })
        .catch((err) => {
          alert("账号或密码错误");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  color: #fff;
  background-color: #c62f2f;
}
.top-mid {
  display: flex;
  button {
    background-color: #c62f2f;
    border: 1px solid black;
    color: #fff;
    height: 25px;
    width: 30px;
    outline: none;
    line-height: 20px;
    margin-right: 2px;
    font-size: 16px;
  }
}
.search {
  box-sizing: border-box;
  width: 220px;
  height: 20px;
  margin-left: 20px;
  background-color: #a82828;
  border: none;
  border-radius: 10px;
  outline: none;
  padding: 3px 5px;
  color: #fff;
  &::-webkit-input-placeholder {
    color: rgba($color: #fff, $alpha: 0.5);
    font-size: 14px;
    padding: 3px 5px;
  }
}

.login-wrap {
  display: none;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 300px;
  background-color: #fafafa;
  color: #000;
  z-index: 999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  .close {
    position: absolute;
    top: 3px;
    right: 0;
  }
}
.login-contend {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  
  
  //  text-align: center;
  //  padding: 100px 0px;
  //  div{
  //      width: 300px;
  //      margin: 0 auto;
  //  }
  input {
    width: 200px;
    height: 20px;
    margin: 5px;
  }
}
.loading {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
</style>
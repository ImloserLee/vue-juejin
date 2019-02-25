<template>
  <transition name="animate">
    <div class="login">
      <div class="back">
        <span  @click="hanldeGoBack">
          <svg-icon iconClass="return"></svg-icon>
        </span>
      </div>
      <div class="logo">
        <img src="./../../assets/images/logo.png" alt="">
      </div>
      <div class="input">
        <div class="username">
          <input type="text" class="username_ipt" placeholder="手机号" v-model="username">
        </div>
        <div class="password">
          <input type="password" placeholder="密码" v-model="password">
          <svg-icon iconClass="eye" class="icon"></svg-icon>
        </div>
      </div>
      <div class="submit">
        <button @click="hanldeLogin">登陆</button>
      </div>
      <div class="other">
        <p class="txt">其他登陆方式</p>
        <span><svg-icon iconClass="weibo"></svg-icon></span>
        <span class="wechat"><svg-icon iconClass="wechat"></svg-icon></span>
        <span><svg-icon iconClass="github"></svg-icon></span>
      </div>
    </div>
  </transition>
  
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    hanldeLogin() {
      if (this.username === '') {
        alert('手机号不能为空')
        return false
      }
      if (this.password === '') {
        alert('密码不能为空!')
        return false
      }
      let data = {
        data: {
          phoneNumber: this.username,
          password: this.password
        }
      }
      this.$store.dispatch('login', data).then(() => {
        this.hanldeGoBack()
      })
    },
    hanldeGoBack() {
      if (this.$route.query && this.$route.query.url) {
        let { url } = this.$route.query
        this.$router.push(url)
      } else {
        this.$router.push('/person')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .login {
    .fixed(@background-color: #fff);
    .logo {
      margin: 80px auto;
      width: 130px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .input {
      padding: 5px 0;
      border-top: 1px solid @border-color;
      border-bottom: 1px solid @border-color;
      font-size: 36px;
      .username, .password {
        position: relative;
        margin-left: 54px;
        input {
          width: 100%;
          height: 96px;
          border: none;
          &.username_ipt {
            border-bottom: 1px solid  @border-color;
          }
        }
        .icon {
          position: absolute;
          top: 30px;
          right: 40px;
          font-size: 48px;
        }
      }
    }
    .submit {
      padding: 0 54px;
      margin-top: 32px;
      button {
        width: 100%;
        line-height: 75px;
        font-size: 36px;
        color: rgba(255, 255, 255, .8);
        border: none;
        border-radius: 10px;
        background-color: @base-color;
      }
    }
    .other {
      margin: 250px auto 0 auto;
      text-align: center;
      .txt {
        margin-bottom: 34px;
        font-size: 32px;
      }
      .wechat {
        margin: 0 40px;
      }
    }
  }
  
</style>

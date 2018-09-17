<template>
  <div class="home">
    <header class="header">
      <div class="header_left">
        <span class="title">首页</span>
      </div>
      <div class="header_right">
        <span class="icon"><svg-icon iconClass="category"></svg-icon></span>
        <span class="icon"><svg-icon iconClass="add"></svg-icon></span>
      </div>
      <i class="bar"></i>
    </header>
    <div class="logincard" v-if="!isLogin">
      <div class="logincard_left">
        <p class="title">登陆账号</p>
        <p class="desc">收藏文章,同步阅读记录,数据永不消失</p>
      </div>
      <div class="logincard_right">
        <p class="login">登陆</p>
      </div>
    </div>
    <div class="content">
      <hot-recomment></hot-recomment>
    </div>
  </div>
</template>

<script>
import HotRecomment from 'components/HotRecomment'
import { mapGetters } from 'vuex'
import API from 'api/api'
export default {
  name: 'Home',
  components: {
    HotRecomment
  },
  created() {
    console.log(this.auth)
    // this.getEntryByHotRecomment()
  },
  methods: {
    getEntryByHotRecomment() {
      let data = {
        params: {
          ...this.auth
        }
      }
      API.getEntryByHotRecomment(data)
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'auth'
    ])
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .home {
    margin-top: 120px;
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      .flex;
      padding: 0 40px;
      height: 100px;
      font-size: 38px;
      border-bottom: 1px solid #c7c5c5;
      background-color: @bg-color;
      .bar {
        position: absolute;
        bottom: 0;
        left: 3%;
        width: 120px;
        height: 3px;
        border-radius: 2px;
        background-color: @base-color;
      }
      &_left {
        flex: 1;
        .title {
          display: inline-block;
          color: @base-color;
        }
      }
      &_right {
        flex: 1;
        .flex(@justify-content: flex-end);
        .icon {
          display: inline-block;
          font-size: 56px;
          &:first-child {
            margin-right: 10px;
          }
        }
      }
    }
    .logincard {
      .flex;
      padding: 0 40px;
      height: 140px;
      font-size: 36px;
      background-color: #fff;
      &_left {
        flex: 3;
        .title {
          margin-bottom: 30px;
          font-size: 36px;
        }
        .desc {
          color: @font-color;
          font-size: 28px;
        }
      }
      &_right {
        flex: 1;
        .flex(@justify-content: flex-end);
        color: @base-color;
      }
    }
    .content {
      margin-top: 20px;
    }
  }
</style>

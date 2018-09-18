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
    <section class="section">
      <div class="logincard" v-if="!isLogin">
        <div class="logincard_left">
          <p class="title">登陆账号</p>
          <p class="desc">收藏文章,同步阅读记录,数据永不消失</p>
        </div>
        <div class="logincard_right">
          <span class="login" @click="handleToLogin">登陆</span>
        </div>
      </div>
      <div class="content">
        <hot-recomment :recomment="hotRecommentData"></hot-recomment>
      </div>
    </section>
  </div>
</template>

<script>
import HotRecomment from 'components/HotRecomment'
import { mapGetters } from 'vuex'
import API from 'api/api'
const LIMIT = 20
export default {
  name: 'Home',
  data() {
    return {
      hotRecommentData: []
    }
  },
  components: {
    HotRecomment
  },
  created() {
    // console.log(this.auth)
    this.getEntryByHotRecomment()
  },
  methods: {
    async getEntryByHotRecomment() {
      let data = {
        params: {
          src: 'web',
          limit: LIMIT,
          ...this.auth
        }
      }
      let res = await API.getEntryByHotRecomment(data)
      if (res.m === 'ok') {
        this.hotRecommentData = res.d.entry.entrylist.slice(0, 3)
      }
      console.log(this.hotRecommentData)
    },
    handleToLogin() {
      this.$router.push({ path: '/login'})
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
    position: relative;
    width: 100%;
    height: 100%;
    .header {
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
    .section {
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
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
  }
</style>

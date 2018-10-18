<template>
  <div class="person">
    <header class="header">我</header>
    <section class="section">
      <div class="information" @click="handleToLogin">
        <div class="left">
          <div class="avatar">
            <img v-lazy="personData.avatarLarge" alt="" v-if="auth">
            <img src="./../../assets/images/avatar.png" alt="" v-else>
          </div>
          <div class="info" v-if="auth">
            <p class="username">{{personData.username}}</p>
            <p class="job">{{personData.jobTitle}}</p>
          </div>
          <div class="info" v-else>
            <p class="text">登陆/注册</p>
          </div>
        </div>
        <div class="right">
          <span class="icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
        </div>
      </div>
      <div class="card">
        <ul>
          <li class="list">
            <span class="item icon"><svg-icon iconClass="message"></svg-icon></span>
            <span class="item">消息中心</span>
            <span class="item modifier"></span>
            <span class="item number"></span>
          </li>
          <li class="list">
            <span class="item icon"><svg-icon iconClass="feidian"></svg-icon></span>
            <span class="item">我赞过的</span>
            <span class="item modifier">篇</span>
            <span class="item number">{{personData.collectedEntriesCount || 0}}</span>
          </li>
          <li class="list">
            <span class="item icon"><svg-icon iconClass="star-yellow"></svg-icon></span>
            <span class="item">收藏集</span>
            <span class="item modifier">个</span>
            <span class="item number">{{personData.collectionSetCount || 0}}</span>
          </li>
          <li class="list">
            <span class="item icon"><svg-icon iconClass="buy"></svg-icon></span>
            <span class="item">已购小册</span>
            <span class="item modifier">本</span>
            <span class="item number">{{personData.purchasedBookletCount || 0}}</span>
          </li>
          <li class="list">
            <span class="item icon"><svg-icon iconClass="money"></svg-icon></span>
            <span class="item">我的钱包</span>
            <span class="item number">{{personData.likedPinCount || 0}}</span>
          </li>
          <li class="list" @click="handleToDetailPage('article')">
            <span class="item icon"><svg-icon iconClass="eye"></svg-icon></span>
            <span class="item">阅读过的文章</span>
            <span class="item modifier">篇</span>
            <span class="item number">{{personData.viewedEntriesCount || 0}}</span>
          </li>
          <li class="list">
            <span class="item icon"><svg-icon iconClass="tag"></svg-icon></span>
            <span class="item">标签管理</span>
            <span class="item modifier">个</span>
            <span class="item number">{{personData.subscribedTagsCount || 0}}</span>
          </li>
        </ul>
      </div>
      <div class="card setting">
        <ul>
          <li class="list">
            <span class="item icon"><svg-icon iconClass="feedback"></svg-icon></span>
            <span class="item">意见反馈</span>
          </li>
          <li class="list" @click="handleToDetailPage('setting')">
            <span class="item icon"><svg-icon iconClass="setting"></svg-icon></span>
            <span class="item">设置</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import API from 'api/api'
import { mapGetters } from 'vuex'
import Scroll from 'components/Scroll'
export default {
  name: 'Person',
  data() {
    return {
      personData: {}
    }
  },
  components: {
    Scroll
  },
  /* activated() {
    this.getUserInfo()
  }, */
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      let data = {
        params: {
          src: 'ios',
          ...this.auth
        }
      }
      let res = await API.getUserInfo(data)
      if (res.m === 'ok') {
        this.personData = res.d
      }
    },
    handleToLogin() {
      this.$router.push({path: '/homepage'})
    },
    handleToDetailPage(type) {
      this.$router.push({path: `/${type}`})
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ])
  },
  watch: {
    $route(to, from) {
      if (from.path === '/login') {
        this.getUserInfo()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .person {
    position: relative;
    width: 100%;
    height: 100%;
    .header {
      .flex();
      height: 100px;
      font-size: 36px;
      border-bottom: 1px solid #c7c5c5;
      background-color: @bg-color;
    }
    .section {
      height: calc(100vh - 200px);
      overflow-y: scroll;
      .information {
        margin-top: 40px;
        padding: 40px;
        .flex();
        height: 200px;
        box-sizing: border-box;
        background-color: #fff;
        .left {
          flex: 2;
          .avatar {
            float: left;
            width: 110px;
            height: 110px;
            border-radius: 100%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            float: left;
            margin-left: 35px;
            width: 200px;
            height: 110px;
            .username {
              margin-top: 8px;
              margin-bottom: 18px;
              font-size: 36px;
            }
            .job {
              color: @font-color;
              font-size: 32px;
            }
            .text {
              margin-top: 30px;
              font-size: 36px;
            }
          }
        }
        .right {
          flex: 1;
          .icon {
            float: right;
          }
        }
      }
      .card {
        margin-top: 40px;
        font-size: 32px;
        background-color: #fff;
        .list {
          height: 94px;
          line-height: 94px;
          padding: 0 40px;
          border-bottom: 1px solid @border-color;
          .item {
            float: left;
            &.icon {
              margin-right: 50px;
              font-size: 48px;
            }
            &.number {
              float: right;
              color: @font-color;
            }
            &.modifier {
              float: right;
              color: @font-color;
            }
          }
        }
        &.setting {
          margin-top: 40px;
        }
      }
    }
  }
</style>

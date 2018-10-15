<template>
  <transition name="animate">
    <div class="home_page">
      <v-header :showRightIcon="showRightIcon" @goBack="handleBack"></v-header>
      <div class="info_panel">
        <div class="info_panel_t">
          <div class="avatar">
            <img :src="personInfo.avatarLarge" v-if="personInfo.avatarLarge">
            <img src="../../assets/images/avatar.png" v-else>
          </div>
          <div class="txt">
            <div class="name">{{personInfo.username}}</div>
            <div class="title">{{personInfo.jobTitle}}</div>
          </div>
        </div>
        <div class="info_panel_b">
          <div class="l">
            <p class="number">{{personInfo.followeesCount}}</p>
            <p class="type">关注</p>
          </div>
          <div class="l">
            <p class="number">{{personInfo.followersCount}}</p>
            <p class="type">关注者</p>
          </div>
          <div class="r">
            <span class="edit">编辑</span>
          </div>
        </div>
      </div>
      <div class="card">
        <ul>
          <li class="list no-border">
            <span class="item">动态</span>
            <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          </li>
          <li class="list">
            <span class="item">沸点</span>
            <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
            <span class="item number">{{personInfo.pinCount}}</span>
          </li>
          <li class="list">
            <span class="item">原创文章</span>
            <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
            <span class="item number">{{personInfo.postedPostsCount}}</span>
          </li>
          <li class="list">
            <span class="item">分享文章</span>
            <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
            <span class="item number">{{personInfo.postedEntriesCount}}</span>
          </li>
          <li class="list no-border">
            <span class="item">收藏集</span>
            <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
            <span class="item number">{{personInfo.collectionSetCount}}</span>
          </li>
          <li class="list">
            <span class="item">赞过的文章</span>
            <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
            <span class="item number">{{personInfo.collectedEntriesCount}}</span>
          </li>
          <li class="list no-border">
            <span class="item">关注的标签</span>
            <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
            <span class="item number">0</span>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import VHeader from 'components/Header'
import { mapGetters } from 'vuex'
import API from 'api/api'
export default {
  name: 'HomePage',
  data() {
    return {
      personInfo: {},
      showRightIcon: true
    }
  },
  components: {
    VHeader
  },
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
        this.personInfo = res.d
      }
    },
    handleBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ])
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .home_page {
    .fixed();
    .info_panel {
      padding: 20px 30px;
      background-color: #fff; 
      &_t {
        .flex(@justify-content: flex-start);
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .txt {
          margin-left: 20px;
          height: 100px;
          font-size: 36px;
          .name {
            font-weight: bold;
            margin-bottom: 15px;
          }
        }
      }
      &_b {
        .flex(@justify-content: flex-start);
        margin-top: 15px;
        .l {
          width: 120px;
          font-size: 36px;
          .type {
            margin-top: 10px;
            font-size: 32px;
            color: @font-color;
          }
        }
        .r {
          flex: 1;
          .flex(@justify-content: flex-end);
          font-size: 32px;
          color: @base-color;
          .edit {
            display: block;
            padding: 12px 40px;
            border: 2px solid @base-color;
            border-radius: 7px;
          }
        }
      }
    }
    .card {
      margin-top: 40px;
      font-size: 32px;
      .list {
        height: 94px;
        line-height: 94px;
        padding: 0 30px;
        background-color: #fff;
        border-bottom: 1px solid @border-color;
        &.no-border {
          border-bottom: none;
          margin-bottom: 20px;
        }
        .item {
          float: left;
          &.icon {
            float: right;
            font-size: 48px;
          }
          &.number {
            float: right;
            color: @font-color;
          }
        }
      }
    }
  }
</style>



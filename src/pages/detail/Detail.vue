<template>
  <transition name="animate">
    <div class="detail">
      <header class="header">
          <div class="left">
            <div class="icon" @click="handleGoBack"><svg-icon iconClass="return"></svg-icon></div>
            <div class="info">
              <span class="avatar">
                <img v-lazy="userInfo.avatarLarge">
              </span>
              <span class="name">{{userInfo.username}}</span>
            </div>
          </div>
          <div class="right">
            <span class="icon"><svg-icon iconClass="shenluehao"></svg-icon></span>
          </div>
      </header>
      <div v-html="content" class="content"></div>
      <footer class="footer">
        <span><svg-icon iconClass="like"></svg-icon></span>
        <span><svg-icon iconClass="pinlun"></svg-icon></span>
      </footer>
    </div>
  </transition>
</template>

<script>
import API from 'api/api'
import { mapGetters } from 'vuex'
export default {
  name: 'Detail',
  data() {
    return {
      content: '',
      userInfo: '',
    }
  },
  mounted() {
    this.getDetailData(1)
    this.getDetailData(2)
  },
  methods: {
    async getDetailData(typeNum) {
      let { id, type } = this.$route.query
      let { token = '', uid = '', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          uid: uid,
          device_id: device_id,
          token: token,
          src: 'web',
          type: typeNum === 1 ? 'entryView' : 'entry',
          postId: id
        }
      }
      let res = await API.getDetailData(data)
      if (res.s === 1) {
        if (typeNum === 1) {
          this.content = res.d.content
        } else {
          this.userInfo = res.d.user
        }
        
      }
    },
    handleGoBack() {
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
  .detail {
    .fixed(@background-color: #fff);
    .header {
      position: relative;
      padding: 0 40px;
      .flex();
      height: 100px;
      font-size: 36px;
      border-bottom: 1px solid #c7c5c5;
      background-color: @bg-color;
      .left {
        flex: 1;
        .flex();
        .icon {
          flex: 1;
          font-size: 56px;
          .svg-icon {
            margin-left: -10px;
          }
        }
        .info {
          flex: 3;
          .flex(@justify-content: flex-start);
          .avatar {
            display: inline-block;
            width: 45px;
            height: 45px;
            border-radius: 100%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            display: inline-block;
            margin-left: 20px;
            font-size: 28px;
          }
        }
      }
      .right {
        flex: 1;
        .flex(@justify-content: flex-end);
        .icon {
          font-size: 64px;
        }
      }
    }
    .content {
      width: 100%;
      height: calc(100vh - 200px);
      padding: 20px;
      margin-bottom: 100px;
      font-size: 36px;
      background-color: #fff;
      overflow-y: scroll;
      /deep/ img {
        width: 100%;
      }
    }
    .footer {
      .flex(@justify-content: flex-start);
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 0 40px;
      background-color: @bg-color;
      height: 100px;
      font-size: 64px;
      span {
        margin-right: 15px;
      }
    }
  }
  .animate-enter-active, .animate-leave-active {
    transition: all .5s;
  }
  .animate-enter, .animate-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
</style>

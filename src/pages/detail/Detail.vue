<template>
  <transition name="animate">
    <div class="detail">
      <header class="header">
          <div class="left">
            <div class="icon" @click="handleGoBack"><svg-icon iconClass="return"></svg-icon></div>
            <div class="info">
              <span class="avatar" v-if="userInfo.avatarLarge">
                <img :src="userInfo.avatarLarge">
              </span>
              <span class="avatar" v-else>
                <img src="../../assets/images/avatar.png">
              </span>
              <span class="name">{{userInfo.username}}</span>
            </div>
          </div>
          <div class="right">
            <span class="icon"><svg-icon iconClass="shenluehao"></svg-icon></span>
          </div>
      </header>
      <div class="scroll-content">
        <div class="screen-hot" v-if="screenshot">
          <img :src="screenshot">
        </div>
        <div v-html="content" class="content"></div>
      </div>
      <footer class="footer">
        <input type="text" class="comment" placeholder="输入评论..." />
        <span class="sl"><svg-icon iconClass="dianzan"></svg-icon></span>
        <span class="sr"><svg-icon iconClass="pinlun"></svg-icon></span>
      </footer>
    </div>
  </transition>
</template>

<script>
import API from 'api/api'
import { mapGetters } from 'vuex'
import Scroll from 'components/Scroll'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'Detail',
  data() {
    return {
      content: '',
      userInfo: '',
      screenshot: '',
      userId: ''
    }
  },
  mixins: [scrollMixin],
  components: {
    Scroll
  },
  activated() {
    this.userId = this.$route.query.id
  },
  watch: {
    userId() {
      this.init()
    }
  },
  methods: {
    init() {
      let { id, type } = this.$route.query
      if (type === 'post') {
        this.getDetailData(id, 1)
        this.getDetailData(id, 2)
      } else {
        this.getEntryView(id)
        this.getEntryByIds(id)
      }
    },
    async getDetailData(postId, type) {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          uid,
          device_id,
          token,
          src: 'ios',
          type: type === 1 ? 'entryView' : 'entry',
          postId
        }
      }
      let res = await API.getDetailData(data)
      if (res.s === 1) {
        if (type === 1) {
          this.content = res.d.content
        } else {
          this.userInfo = res.d.user
          this.screenshot = res.d.screenshot
        }
      }
    },
    async getEntryView(entryId) {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          uid: uid,
          device_id: device_id,
          token: token,
          src: 'ios',
          entryId: entryId
        }
      }
      let res = await API.getEntryView(data)
      if (res.s === 1) {
        this.content = res.d.content
      }
    },
    async getEntryByIds(entryId) {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          uid,
          device_id,
          token,
          src: 'ios',
          entryIds: entryId
        }
      }
      let res = await API.getEntryByIds(data)
      if (res.s === 1) {
        this.userInfo = res.d.entrylist[0].user
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
  input::-webkit-input-placeholder {
    color: #919196;
  }
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
          width: 50px;
          font-size: 56px;
          .svg-icon {
            margin-left: -10px;
          }
        }
        .info {
          flex: 1;
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
        width: 100px;
        .flex(@justify-content: flex-end);
        .icon {
          font-size: 64px;
        }
      }
    }
    .scroll-content {
      height: calc(100vh - 200px);
      overflow-y: scroll;
    }
    .screen-hot {
      padding-bottom: 35%;
      height: 0;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .content {
      width: 100%;
      padding: 20px;
      margin-bottom: 100px;
      font-size: 36px;
      background-color: #fff;
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
      border-top: 1px solid @border-color;
      .comment {
        width: 70%;
        height: 70%;
        border-radius: 36px;
        border: 1px solid #f1f1f2;
        background-color: #e9e9e9;
        font-size: 32px;
        text-indent: 24px;
      }
      .sl {
        margin-left: 20px;
      }
      .sr {
        margin-left: 35px;
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

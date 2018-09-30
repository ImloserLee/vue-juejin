<template>
  <div class="detail">
    <header class="header">
        <div class="left">
          <div class="icon"><svg-icon iconClass="return"></svg-icon></div>
          <div class="info">
            <span class="avatar"><img src="./../../assets/images/avatar.png" alt=""></span>
            <span class="name">酸痛与感触</span>
          </div>
        </div>
        <div class="right">
          <span class="icon"><svg-icon iconClass="fenxiang"></svg-icon></span>
        </div>
    </header>
    <div v-html="content" class="content"></div>
    <footer class="footer">这是底部</footer>
  </div>
</template>

<script>
import API from 'api/api'
import { mapGetters } from 'vuex'
export default {
  name: 'Detail',
  data() {
    return {
      content: null,
      scrollbar: true,
      scrollbarFade: true,
    }
  },
  mounted() {
    this.getDetailData()
  },
  methods: {
    async getDetailData() {
      let { id, type } = this.$route.query
      let data = {
        params: {
           ...this.auth,
          src: 'ios',
          type: type === 'post' ? 'entryView' : 'entry',
          postId: id
        }
      }
      let res = await API.getDetailData(data)
      if (res.s === 1) {
        this.content = res.d.content
      }
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
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10001;
    background-color: #fff;
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
          font-size: 48px;
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
          font-size: 56px;
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
    }
    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: @bg-color;
      height: 100px;
    }
  }
</style>

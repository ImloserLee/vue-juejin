<template>
  <div class="home">
    <v-header></v-header>
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
        <hot-recomment 
          v-if="showHotRecomment && hotRecommentData.length"
          :recomment="hotRecommentData"
          :rotate="rotate"
          @closeRecomment="handleColseRecomment"
          @refreshRecomment="handleRefreshRecomment"
        >
        </hot-recomment>
        <item-pane></item-pane>
      </div>
    </section>
  </div>
</template>

<script>
import VHeader from './header/header'
import ItemPane from './itempanel/ItemPanel'
import HotRecomment from 'components/HotRecomment'
import { mapGetters } from 'vuex'
import API from 'api/api'
const LIMIT = 20
export default {
  name: 'Home',
  data() {
    return {
      hotRecommentData: [],
      showHotRecomment: true,
      rotate: false
    }
  },
  components: {
    HotRecomment,
    VHeader,
    ItemPane
  },
  created() {
    // console.log(this.auth)
    this.getEntryByHotRecomment()
  },
  methods: {
    // 获取热门信息
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
    },
    // 前往登陆页面
    handleToLogin() {
      this.$router.push({ path: '/login'})
    },
    handleColseRecomment() {
      this.showHotRecomment = false
    },
    // 刷新热门信息 热门推荐点击刷新，将当前的 3 条文章 objectId 以 id|id|id 的格式发送请求，然后重新拉取热门推荐列表
    async handleRefreshRecomment() {
      this.rotate = true
      let timer = setTimeout(() => {
        this.rotate = false
        clearTimeout(timer)
      }, 800)
      let entryIds = this.hotRecommentData.map(item => {
        return item.objectId
      })
      entryIds = entryIds.join('|')
      let data = {
        params: {
          src: 'web',
          entryId: entryIds,
          ...this.auth
        }
      }
      let res = await API.refreshHotRecomment(data)
      if (res.m === 'ok') {
        this.getEntryByHotRecomment()
      }
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

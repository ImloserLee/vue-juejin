<template>
  <div class="home">
    <v-header></v-header>
    <scroll 
      ref="scroll"
      class="scroll"
      :data="timelineData"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp">
      <div class="section">
        <div class="logincard" v-if="!isLogin">
          <div class="logincard_left">
            <p class="title">登陆账号</p>
            <p class="desc">收藏文章,同步阅读记录,数据永不消失</p>
          </div>
          <div class="logincard_right">
            <span class="login" @click="handleToLogin">登陆</span>
          </div>
        </div>
        <hot-recomment 
          v-if="showHotRecomment && hotRecommentData.length"
          :recomment="hotRecommentData"
          :rotate="rotate"
          @closeRecomment="handleColseRecomment"
          @refreshRecomment="handleRefreshRecomment"
          @toDetail="handleToDetail"
        >
          <span slot="text" class="txt">热门推荐</span>
        </hot-recomment>
        <item-pane 
          :timeline="timelineData" 
          @toDetail="handleToDetail" 
          @toHomePage="handleToHomePage"
        >
        </item-pane>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import Scroll from 'components/Scroll'
import VHeader from './component/Header'
import ItemPane from 'components/ItemPanel'
import HotRecomment from 'components/HotRecomment'
import { mapGetters } from 'vuex'
import { scrollMixin } from 'utils/mixin'
import API from 'api/api'
const LIMIT = 20
export default {
  name: 'Home',
  data() {
    return {
      hotRecommentData: [],
      timelineData: [],
      showHotRecomment: true,
      rotate: false,
    }
  },
  mixins: [scrollMixin],
  components: {
    HotRecomment,
    Scroll,
    VHeader,
    ItemPane,
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  },
  mounted() {
    this.getEntryByHotRecomment()
    if (this.auth) {
      this.getEntryByTimeline(true)
    } else {
      this.getEntryByRank(true)
    }
  },
  methods: {
    // 获取热门信息
    async getEntryByHotRecomment() {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          src: 'ios',
          limit: 20,
          token: token,
          device_id: device_id,
          uid: uid,
        }
      }
      let res = await API.getEntryByHotRecomment(data)
      if (res.m === 'ok') {
        this.hotRecommentData = res.d.entry.entrylist.slice(0, 3)
      }
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
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          src: 'ios',
          entryId: entryIds,
          token,
          uid,
          device_id
        }
      }
      let res = await API.refreshHotRecomment(data)
      if (res.m === 'ok') {
        this.getEntryByHotRecomment()
      }
    }, 

    // 获取首页内容 用户登录状态下请求接口
    async getEntryByTimeline(reload) {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let timeline = this.timelineData
      // 下拉刷新或者刚进入页面, before的值为空
      if (!timeline.length || reload) {
        timeline = [{ verifyCreatedAt: '' }]
      }
      let rankIndex = timeline.slice(-1)[0].verifyCreatedAt || ''
      let data = {
        params: {
          src: 'ios',
          limit: LIMIT,
          before: rankIndex,
          token,
          device_id,
          uid,
        }
      }
      let res = await API.getEntryByTimeline(data)
      if (res.s === 1) {
        let entrylist = res.d.entrylist ? res.d.entrylist : []
        this.timelineData = reload ? entrylist : this.timelineData.concat(entrylist.slice(1))
      }
    },

    // 获取首页内容 用户未登录状态下请求接口
    async getEntryByRank(reload) {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let timeline = this.timelineData
      // 根据抓包接口,下拉刷新和刚进入页面时before参数对应的值为空
      if (!timeline.length || reload) {
        timeline = [{ rankIndex: '' }]
      }
      let rankIndex = (timeline.slice(-1)[0].rankIndex) || ''
      let data = {
        params: {
          src: 'ios',
          limit: LIMIT,
          uid: uid,
          device_id: device_id,
          token: token,
          before: rankIndex
        }
      }
      let res = await API.getEntryByRank(data)
      if (res.s === 1) {
        let entrylist = res.d && res.d.entrylist || []
        this.timelineData = reload ? entrylist : this.timelineData.concat(entrylist.slice(1))
      }
    },

    // 前往个人首页
    handleToHomePage(id) {
      this.$router.push({ path: '/homepage' , query: { id: id } })
    },

    // 前往登陆页面
    handleToLogin() {
      let path = this.$route.path
      this.$router.push({ path: '/login' , query: { url: path } })
    },
    handleColseRecomment() {
      this.showHotRecomment = false
    },
    
    handlePullDown() {
      if (this.auth) {
        this.getEntryByTimeline(true)
      } else {
        this.getEntryByRank(true)
      }
    },
    handlePullUp() {
      if (this.auth) {
        this.getEntryByTimeline()
      } else {
        this.getEntryByRank()
      }
    },
    handleToDetail(params) {
      this.$router.push({ path: 'home/detail', query: { id: params.id, type: params.type } })
    }
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'auth'
    ])
  },
  watch: {
    $route(to, from) {
      if (from.path === '/login') {
        this.getEntryByHotRecomment()
        if (this.auth) {
          this.getEntryByTimeline(true)
        } else {
          this.getEntryByRank(true)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .home {
    position: relative;
    width: 100%;
    height: 100%;
    .scroll {
      height: calc(100vh - 200px);
      overflow: hidden;
      .section {
        padding-top: 20px;
        .logincard {
          .flex();
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
      }
    }
    
  }
</style>

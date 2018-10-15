<template>
  <div class="search">
    <header class="header">
      <input type="text" placeholder="搜索" />
      <svg-icon iconClass="search" class="icon"></svg-icon>
    </header>
    <scroll 
      ref="scroll"
      class="scroll"
      :data="rankList"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp"
    >
      <div class="content">
        <search-swiper :list="bannerList"></search-swiper>
        <hot-recomment
          :recomment=rankList
          :hasRight=hasRightIcon
          iconName='hot-red'
          class="hot_recomment"
          @toDetail="handleToDetail"
        >
          <span slot="text" class="hot">热门文章</span>
        </hot-recomment>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import SearchSwiper from 'components/Swiper'
import HotRecomment from 'components/HotRecomment'
import Scroll from 'components/Scroll'
import API from 'api/api'
import { mapGetters } from 'vuex'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'Search',
  components: {
    SearchSwiper,
    HotRecomment,
    Scroll
  },
  data() {
    return {
      bannerList: [],
      hasRightIcon: false,
      rankList: []
    }
  },
  mixins: [scrollMixin],
  mounted() {
    this.getBannerImgList()
    this.getEntryByRank(true)
  },
  methods: {
    async getBannerImgList() {
      let data = {
        params: {
          position: 'explore',
          page: 0,
          pageSize: 20,
          platform: 'ios',
          src: 'ios',
          ...this.auth
        }
      }
      let res = await API.getBannerImgList(data)
      if (res.s === 1) {
        this.bannerList = res.d.banner
      }
    },
    async getEntryByRank(reload) {
      let token = this.auth ? this.auth.token : ''
      let device_id = this.auth ? this.auth.device_id : ''
      let uid = this.auth ? this.auth.uid : 'unlogin'
      let rankList = this.rankList
      // 根据抓包接口,下拉刷新和刚进入页面时before参数对应的值为空
      if (!rankList.length || reload) {
        rankList = [{ rankIndex: '' }]
      }
      let rankIndex = (rankList.slice(-1)[0].rankIndex) || ''
      let data = {
        params: {
          src: 'ios',
          limit: 20,
          uid: uid,
          device_id: device_id,
          token: token,
          before: rankIndex
        }
      }
      let res = await API.getEntryByRank(data)
      if (res.s === 1) {
        let entrylist = res.d && res.d.entrylist || []
        this.rankList = reload ? entrylist : this.rankList.concat(entrylist.slice(1))
      }
    },
    handleToDetail(params) {
      this.$router.push({ path: 'search/detail', query: { id: params.id, type: params.type } })
    },
    handlePullUp() {
      this.getEntryByRank()
    },
    handlePullDown() {
      this.getEntryByRank(true)
    },
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
  .search {
    width: 100%;
    height: 100%;
    .header {
      position: relative;
      .flex();
      height: 100px;
      input {
        width: 95%;
        height: 60px;
        font-size: 28px;
        text-indent: 60px;
        border: none;
        border-radius: 8px;
        background-color: #dcdde1;
      }
      .icon {
        position: absolute;
        top: 28px;
        left: 30px;
        font-size: 42px;
      }
    }
    .scroll {
      width: 100%;
      height: calc(100vh - 200px);
      .hot {
        font-size: 32px;
      }
      .hot_recomment {
        margin-top: 20px;
      }
    }
  }
</style>

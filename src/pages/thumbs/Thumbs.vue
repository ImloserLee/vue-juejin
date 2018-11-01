<template>
  <div class="thumbs">
    <v-header title="赞过的文章" @goBack="handleGoBack"></v-header>
    <scroll
      ref="scroll"
      class="scroll"
      :data="thumbsList"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp"
      v-if="thumbsList.length"
    >
      <hot-recomment 
        :hasTitle="hasTitle"
        :recomment="thumbsList"
        @toDetail="handleToDetail"
      ></hot-recomment>
    </scroll>
    <div class="no-more" v-else>
      <div class="icon"><svg-icon iconClass="file"></svg-icon></div>
      <p class="text">暂无赞过的文章</p>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/Header'
import HotRecomment from 'components/HotRecomment'
import Scroll from 'components/Scroll'
import { mapGetters } from 'vuex'
import API from 'api/api'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'Thumbs',
  components: {
    VHeader,
    HotRecomment,
    Scroll
  },
  mixins: [scrollMixin],
  data() {
    return {
      thumbsList: [],
      pageNum: 0,
      pullUp: true, //是否可以再次上拉加载更多,
      userId: ''
    }
  },
  activated() {
    this.hasTitle = false
    this.userId = this.$route.query.uid
  },
  watch: {
    // 监听userId的变化,如果不是同一个用户,就重新获取下数据,否则使用缓存
    userId() {
      this.getUserLike(true)
    }
  },
  methods: {
    async getUserLike(reload) {
      let { uid } = this.$route.query
      // 上拉加载page增加
      if (!reload) {
        this.pageNum ++
      }
      let page = this.pageNum
      let data = {
        params: {
         uid,
         page,
         pageSize: 20
        }
      }
      let res = await API.getUserLike(data)
      if (res.s === 1) {
        let entryList = res.d.entryList
        this.thumbsList = reload ? entryList : this.thumbsList.concat(entryList.slice(1))
        if (!entryList.length) {
          this.pullUp = false
          this.pageNum = 0
        }
      }
    },
    handleGoBack() {
      this.$router.go(-1)
    },
    handleToDetail(params) {
      this.$router.push({ path: 'detail', query: { id: params.id, type: params.type } })
    },
    handlePullDown() {
      this.getUserLike(true)
    },
    handlePullUp() {
      if (this.pullUp) {
        this.getUserLike()
      } else {
        this.$refs.scroll.forceUpdate()
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
  .thumbs {
    .fixed();
    .no-more {
      .flex(@flex-direction: column);
      height: 100%;
      font-size: 32px;
      color: @font-color;
      background-color: #fff;
      .icon {
        font-size: 116px;
      }
    }
  }
</style>



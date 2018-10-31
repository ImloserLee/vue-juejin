<template>
  <div class="article">
    <v-header title="收藏集" @goBack="handleGoBack"></v-header>
    <scroll
      ref="scroll"
      class="scroll"
      :data="collectionList"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp"
      v-if="collectionList.length"
    >
      <ul>
        <li v-for="item in collectionList" :key="item.csId" class="list">
          <div class="list-item">
            <div class="l">
              <img class="cover" v-lazy="item.bgImg.url">
            </div>
            <div class="m">
              <p class="title">{{item.title}}</p>
              <div class="desc">{{item.entryCount}}篇</div>
            </div>
            <div class="r">
              <span class="icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <div class="no-more" v-else>
      <div class="icon"><svg-icon iconClass="file"></svg-icon></div>
      <p class="text">暂无收藏集</p>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/Header'
import Scroll from 'components/Scroll'
import { mapGetters } from 'vuex'
import API from 'api/api'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'Article',
  components: {
    VHeader,
    Scroll
  },
  mixins: [scrollMixin],
  data() {
    return {
      collectionList: [],
      pageNum: 0,
      pullUp: true,
      userId: ''
    }
  },
  activated() {
    this.hasTitle = false
    this.userId = this.$route.query.uid
  },
  watch: {
    userId() {
      this.getUserCollectionSet(true)
    }
  },
  methods: {
    async getUserCollectionSet(reload) {
      let { token } = this.auth
      let targetUserId = this.$route.query.uid // targetUserId为选中的用户的uid
      let userId = this.auth.uid
      let clientId = this.auth.device_id
      // 下拉刷新页数自增
      if (!reload) {
        this.pageNum ++
      }
      let page = this.pageNum
      let data = {
        params: {
          src: 'ios',
          clientId,
          userId,
          targetUserId,
          token,
          page
        }
      }
      let res = await API.getUserCollectionSet(data)
      if (res.s === 1) {
        let collectionSets = res.d.collectionSets
        this.collectionList = reload ? collectionSets : this.collectionList.concat(collectionSets.slice(1))
        if (!collectionSets.length) {
          this.pullUp = false
          this.pageNum = 0
        }
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    handleGoBack() {
      this.$router.go(-1)
    },
    handlePullDown() {
      this.getUserCollectionSet(true)
    },
    handlePullUp() {
      if (this.pullUp) {
        this.getUserCollectionSet()
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
  .article {
    .fixed();
    .list {
      border-bottom: 2px solid @border-color;
    }
    .list-item {
      padding: 0 30px;
      height: 160px;
      background-color: #fff;
      .flex();
      .l {
        width: 100px;
        height: 100px;
        .cover {
          width: 100%;
          height: 100%;
        }
      }
      .m {
        flex: 1;
        margin-left: 20px;
        .title {
          margin: -10px 0 15px 0;
          font-size: 32px;
          font-weight: bold;
        }
        .desc {
          font-size: 28px;
          color: @font-color;
        }
      }
      .r {
        width: 50px;
      }
    }
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
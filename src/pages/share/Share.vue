<template>
  <div class="tag">
    <v-header title="分享文章" @goBack="handleGoBack"></v-header>
    <scroll
      ref="scroll"
      class="scroll"
      :data="shareList"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp"
      v-if="shareList.length"
    >
      <recomment :hasTitle="hasTitle" :recomment="shareList"></recomment>
    </scroll>
    <div class="no-more" v-else>
      <div class="icon"><svg-icon iconClass="file"></svg-icon></div>
      <p class="text">没有分享过任何文章呢</p>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/Header'
import Recomment from 'components/HotRecomment'
import Scroll from 'components/Scroll'
import { mapGetters } from 'vuex'
import API from 'api/api'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'Share',
  components: {
    VHeader,
    Scroll,
    Recomment
  },
  mixins: [scrollMixin],
  data() {
    return {
      shareList: [],
      userId: ''
    }
  },
  activated() {
    this.hasTitle = false
    this.userId = this.$route.query.uid
  },
  watch: {
    userId() {
      this.getEntryBySelf(true)
    }
  },
  methods: {
    async getEntryBySelf(reload) {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : {}
      let targetUid = this.$route.query.uid
      let list = this.shareList
      if (!list.length || reload) {
        list = [{ createdAt: '' }]
      }
      let before = list.slice(-1)[0].createdAt || ''
      let data = {
        params: {
         uid,
         token,
         device_id,
         targetUid,
         before,
         limit: 20,
         order: 'createdAt',
         src: 'ios',
         type: 'article'
        }
      }
      let res = await API.getEntryBySelf(data)
      if (res.s === 1) {
        let entrylist = res.d.entrylist ? res.d.entrylist : []
        this.shareList = reload ? entrylist : this.shareList.concat(entrylist.slice(1))
      }
    },
    handleGoBack() {
      this.$router.go(-1)
    },
    handlePullDown() {
      this.getEntryBySelf(true)
    },
    handlePullUp() {
      this.getEntryBySelf()
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
  .tag {
    .fixed();
    .list {
      border-bottom: 2px solid @border-color;
    }
    .list-item {
      padding: 0 30px;
      height: 140px;
      background-color: #fff;
      .flex();
      .l {
        width: 80px;
        height: 80px;
        .cover {
          width: 100%;
          height: 100%;
        }
      }
      .m {
        flex: 1;
        margin-left: 20px;
        .title {
          margin: -10px 0 10px 0;
          font-size: 32px;
          font-weight: bold;
        }
        .desc {
          font-size: 28px;
          color: @font-color;
        }
      }
      .r {
        width: 160px;
        .fouce {
          display: block;
          width: 100%;
          height: 65px;
          line-height: 65px;
          border-radius: 6px;
          text-align: center;
          color: #fff;
          background-color: #66c301;
          font-size: 28px;
        }
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
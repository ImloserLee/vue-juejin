<template>
  <div class="article">
    <v-header title="阅读过的文章" @goBack="handleGoBack"></v-header>
    <scroll
      class="scroll"
      :data="articleList"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp"
    >
      <hot-recomment 
        :hasTitle="hasTitle"
        :recomment="articleList"
      ></hot-recomment>
    </scroll>
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
  name: 'Article',
  components: {
    VHeader,
    HotRecomment,
    Scroll
  },
  mixins: [scrollMixin],
  data() {
    return {
      articleList: []
    }
  },
  created() {
    this.hasTitle = false
    this.getEntryBySelf(true)
  },
  methods: {
    async getEntryBySelf(reload) {
      let { uid } = this.auth
      let articleList = this.articleList
      if (!articleList.length || reload) {
        articleList = [{createdAt: ''}]
      }
      let createdAt = articleList.slice(-1)[0].createdAt || ''
      let data = {
        params: {
          before: createdAt,
          limit: 20,
          order: 'createdAt',
          src: 'ios',
          targetUid: uid,
          type: 'view',
          ...this.auth
        }
      }
      let res = await API.getEntryBySelf(data)
      if (res.m === 'ok') {
        let entrylist = res.d.entrylist ? res.d.entrylist : []
        this.articleList = reload ? entrylist : this.articleList.concat(entrylist.slice(1))
      }
    },
    handleGoBack() {
      this.$router.push({ path: '/person' })
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
  .article {
    .fixed();
  }
</style>



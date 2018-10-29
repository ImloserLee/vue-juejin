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
    >
      <ul>
        <li v-for="item in collectionList" :key="item.csId">
          <list :list="item"></list>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import VHeader from 'components/Header'
import Scroll from 'components/Scroll'
import List from 'components/List'
import { mapGetters } from 'vuex'
import API from 'api/api'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'Article',
  components: {
    VHeader,
    Scroll,
    List
  },
  mixins: [scrollMixin],
  data() {
    return {
      collectionList: [],
      pageNum: 0
    }
  },
  created() {
    this.hasTitle = false
  },
  mounted() {
    this.getUserCollectionSet(true)
  },
  methods: {
    async getUserCollectionSet(reload) {
      let { token } = this.auth
      let targetUserId = this.auth.uid
      let userId = this.auth.uid
      let clientId = this.auth.device_id
      // 下拉刷新页数自增
      if (!reload) {
        this.pageNum ++
      }
      let pageNum = this.pageNum
      let data = {
        params: {
          src: 'ios',
          clientId,
          userId,
          targetUserId,
          token,
          page: pageNum
        }
      }
      let res = await API.getUserCollectionSet(data)
      if (res.m === 'success') {
        let collectionSets = res.d.collectionSets
        if (reload) {
          this.collectionList = collectionSets
        } else {
          this.collectionList = this.collectionList.concat(collectionSets.slice(1))
          if (!collectionSets.length) {
            this.pageNum = 0
            this.$refs.scroll.forceUpdate()
          }
        }
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    handleGoBack() {
      this.$router.push({ path: '/person' })
    },
    handlePullDown() {
      this.getUserCollectionSet(true)
    },
    handlePullUp() {
      this.getUserCollectionSet()
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
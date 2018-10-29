<template>
  <div class="thumbs">
    <v-header title="我赞过的" @goBack="handleGoBack"></v-header>
    <scroll
      class="scroll"
      :data="thumbsList"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp"
    >
      <hot-recomment 
        :hasTitle="hasTitle"
        :recomment="thumbsList"
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
      thumbsList: [],
      pageNum: 0
    }
  },
  created() {
    this.hasTitle = false
  },
  mounted() {
    this.getUserLike()
  },
  methods: {
    async getUserLike() {
      let { uid } = this.auth
      let data = {
        params: {
         uid,
         page: this.pageNum,
         pageSize: 20
        }
      }
      console.log(uid);
      let res = await API.getUserLike(data)
      if (res.m === 'ok') {
        console.log(red);
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
  .thumbs {
    .fixed();
  }
</style>



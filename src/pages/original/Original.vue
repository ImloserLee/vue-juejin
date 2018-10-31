<template>
  <div class="original">
    <v-header title="原创文章" @goBack="handleGoBack"></v-header>
    <scroll
      ref="scroll"
      class="scroll"
      :data="originalList"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp"
      v-if="originalList.length"
    >
      <item-panel :timeline="originalList"></item-panel>
    </scroll>
    <div class="no-more" v-else>
      <div class="icon"><svg-icon iconClass="file"></svg-icon></div>
      <p class="text">没有发布过原创文章呢</p>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/Header'
import ItemPanel from 'components/ItemPanel'
import Scroll from 'components/Scroll'
import { mapGetters } from 'vuex'
import API from 'api/api'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'Original',
  components: {
    VHeader,
    ItemPanel,
    Scroll
  },
  mixins: [scrollMixin],
  data() {
    return {
      originalList: [],
      userId: ''
    }
  },
  activated() {
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
      let list = this.originalList
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
         type: 'post'
        }
      }
      let res = await API.getEntryBySelf(data)
      if (res.s === 1) {
        let entrylist = res.d.entrylist ? res.d.entrylist : []
        this.originalList = reload ? entrylist : this.originalList.concat(entrylist.slice(1))
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
  .original {
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
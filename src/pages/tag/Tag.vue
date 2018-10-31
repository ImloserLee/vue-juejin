<template>
  <div class="tag">
    <v-header title="关注标签" @goBack="handleGoBack"></v-header>
    <scroll
      ref="scroll"
      class="scroll"
      :data="tagList"
      :pullDownRefresh="pullDownRefreshObj"
      @pullingDown="handlePullDown"
    >
      <ul>
        <li v-for="item in tagList" :key="item.id" class="list">
          <div class="list-item">
            <div class="l">
              <img class="cover" v-lazy="item.icon">
            </div>
            <div class="m">
              <p class="title">{{item.title}}</p>
              <div class="desc">{{item.subscribersCount}}关注 · {{item.entryCount}}篇文章</div>
            </div>
            <div class="r">
              <span class="fouce">已关注</span>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import VHeader from 'components/Header'
import Scroll from 'components/Scroll'
import { mapGetters } from 'vuex'
import API from 'api/api'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'Tag',
  components: {
    VHeader,
    Scroll
  },
  mixins: [scrollMixin],
  data() {
    return {
      tagList: []
    }
  },
  mounted() {
    this.getTagData()
  },
  methods: {
    async getTagData() {
      let { uid } = this.auth
      let data = {
        params: {
         uid
        }
      }
      let res = await API.getTagData(data)
      if (res.s === 1) {
        this.tagList = res.d.tagList
      }
    },
    handleGoBack() {
      this.$router.push({ path: '/person' })
    },
    handlePullDown() {
      this.getTagData()
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
  }
</style>
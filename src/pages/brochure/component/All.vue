<template>
  <scroll 
      ref="scroll"
      class="scroll"
      :data="brochureList"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp">
    <div class="all">
      <div class="card" v-for="item in brochureList" :key="item._id">
        <div class="left">
          <img v-lazy="item.img" alt="">
        </div>
        <div class="mid">
          <div class="title">{{item.title}}</div>
          <div class="author">{{item.userData.username}}</div>
          <div class="number">{{item.lastSectionCount}}小节 · {{item.buyCount}}人已购买</div>
        </div>
        <div class="right">
          <span class="money">¥{{item.price}}</span>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import API from 'api/api'
import { mapGetters } from 'vuex'
import Scroll from 'components/Scroll'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'All',
  data() {
    return {
      pageNum: 1,
      brochureList: []
    }
  },
  mixins: [scrollMixin],
  components: {
    Scroll
  },
  mounted() {
    this.getBrochureInfo(true)
  },
  methods: {
    async getBrochureInfo(reload) {
      // 下拉刷新页数自增
      if (!reload) {
        this.pageNum ++
      }
      let pageNum = this.pageNum
      let data = {
        params: {
          src: 'ios',
          pageNum: pageNum,
          ...this.auth
        }
      }
      let res = await API.getBrochureInfo(data)
      if (res.s === 1) {
        this.brochureList = reload ? res.d : this.brochureList.concat(res.d.slice(1))
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    handlePullDown() {
      this.getBrochureInfo(true)
    },
    handlePullUp() {
      this.getBrochureInfo()
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
  .scroll {
    height: calc(100vh - 200px);
    overflow: hidden;
    .all {
      position: relative;
      width: 100%;
      background-color: #fff;
      .card {
        padding: 24px;
        border-bottom: 1px solid @border-color;
        .flex();
        .left {
          margin-right: 20px;
          flex: 1;
          align-self: flex-start;
          height: 100%;
          box-shadow:0 0 5px 5px rgb(229, 231, 231);
          img {
            width: 140px;
            height: 190px;
          }
        }
        .mid {
          margin-right: 20px;
          flex: 3;
          align-self: flex-start;
          height: 100%;
          .title {
            font-size: 32px;
            margin-bottom: 30px;
          }
          .author {
            font-size: 28px;
            margin-bottom: 30px;
          }
          .number {
            font-size: 24px;
            color: @font-color;
          }
        }
        .right {
          flex: 1;
          height: 100%;
          .money {
            display: block;
            width: 140px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 28px;
            color: @base-color;
            border-radius: 50px;
            background-color: #f0f7ff;
          }
        }
      }
    }
  }
</style>

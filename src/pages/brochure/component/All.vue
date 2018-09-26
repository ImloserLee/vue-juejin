<template>
  <scroll class="scroll">
    <div class="all">
      <div class="card" v-for="item in brochureList" :key="item._id">
        <div class="left">
          <img :src="item.img" alt="">
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
export default {
  name: 'All',
  data() {
    return {
      pageNum: 1,
      brochureList: []
    }
  },
  components: {
    Scroll
  },
  created() {
    this.getBrochureInfo()
  },
  methods: {
    async getBrochureInfo() {
      let data = {
        params: {
          src: 'web',
          pageNum: this.pageNum,
          ...this.auth
        }
      }
      let res = await API.getBrochureInfo(data)
      if (res.m === 'ok') {
        this.brochureList = res.d
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

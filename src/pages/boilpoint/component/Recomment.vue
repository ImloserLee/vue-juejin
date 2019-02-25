<template>
  <div class="recomment">
    <scroll 
      ref="scroll"
      class="scroll"
      :data="pinList"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp">
      <div class="swiper">
        <swiper 
          :height="height"
          :options="swiperOption"
          :list="recommentList"
          :radius="radius"
          :isImage="isImage"
        >
        </swiper>
      </div>
      <ul>
        <li class="recomment-list" v-for="item in pinList" :key="item.objectId">
          <recomment-item :item="item"></recomment-item>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Vue from 'vue'
import Swiper from 'components/Swiper'
import Scroll from 'components/Scroll'
import RecommentItem from './RecommentItem'
import { mapGetters } from 'vuex'
import { scrollMixin } from 'utils/mixin'
import API from 'api/api'
export default {
  name: 'Recomment',
  components: {
    Swiper,
    Scroll,
    RecommentItem
  },
  data() {
    return {
      height: '34%',
      radius: '5px',
      isImage: false,
      swiperOption: {
        slidesPerView: '1.1',
        centeredSlides: true,
        spaceBetween: 10,
        loop: false
      },
      recommentList: [],
      pinList: [],
    }
  },
  mixins: [scrollMixin],
  mounted() {
    this.getHotRecommendList()
    this.getPinList(true)
  },
  methods: {
    async getHotRecommendList() {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          src: 'ios',
          token: token,
          uid: uid,
          device_id: device_id
        }
      }
      let res = await API.getHotRecommendList(data)
      if (res.s === 1) {
        this.recommentList = res.d.list
      }
    },
    async getPinList(reload) {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let pinList = this.pinList
      if (!pinList.length || reload) {
        pinList = [{ createdAt: '' }]
      }
      let createdAt = (pinList.slice(-1)[0].createdAt) || ''
      let data = {
        params: {
          src: 'ios',
          token: token,
          uid: uid,
          device_id: device_id,
          before: createdAt,
          limit: 20
        }
      }
      let res = await API.getPinList(data)
      if (res.s === 1) {
        let list = res.d && res.d.list || []
        this.pinList = reload ? list : this.pinList.concat(list.slice(1))
      }
    },
    handlePullDown() {
      this.getPinList(true)
    },
    handlePullUp() {
      this.getPinList()
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
  .recomment {
    .scroll {
      height: calc(100vh - 200px);
      .swiper {
        padding-top: 20px;
      }
      .recomment-list {
        margin-top: 20px;
        padding-top: 20px;
        background-color: #fff;
      }
    }
  }
</style>

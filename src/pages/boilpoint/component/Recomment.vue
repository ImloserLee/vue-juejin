<template>
  <div class="recomment">
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
      <li class="panel" v-for="item in pinList" :key="item.objectId">
          <div class="top">
            <div class="l">
              <img :src="item.user.avatarLarge" >
            </div>
            <div class="m">
              <p class="title">{{item.user.username}}</p>
              <div class="desc">
                <span v-if="item.user.jobTitle">{{item.user.jobTitle}} @</span>
                <span v-if="item.user.company">{{item.user.company}} · </span>
                <span>1小时前</span>
              </div>
            </div>
            <div class="r">
              <div class="fouce">
                <span class="icon"><svg-icon iconClass="add-gary"></svg-icon></span>
                <span class="text">关注</span>
              </div>
              <div class="share"><svg-icon iconClass="shenluehao"></svg-icon></div>
            </div>
          </div>
          <div class="action_bar">
            <div class="action_bar_item">
              <span class="icon"><svg-icon iconClass="dianzan"></svg-icon></span>
              <span>5</span>
            </div>
            <div class="action_bar_item">
              <span class="icon"><svg-icon iconClass="pinlun"></svg-icon></span>
              <span>5</span>
            </div>
            <div class="action_bar_item">
              <span class="icon"><svg-icon iconClass="share-gary"></svg-icon></span>
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Swiper from 'components/Swiper'
import { mapGetters } from 'vuex'
import API from 'api/api'
export default {
  name: 'Recomment',
  components: {
    Swiper
  },
  data() {
    return {
      height: '34%',
      radius: '5px',
      isImage: false,
      swiperOption: {
        slidesPerView: '1.2',
        centeredSlides: true,
        spaceBetween: 10,
        loop: false
      },
      recommentList: [],
      pinList: []
    }
  },
  mounted() {
    this.getHotRecommendList()
    this.getPinList()
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
    async getPinList() {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          src: 'ios',
          token: token,
          uid: uid,
          device_id: device_id,
          before: '',
          limit: 20
        }
      }
      let res = await API.getPinList(data)
      if (res.s === 1) {
        console.log(res)
        this.pinList = res.d.list
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
  .recomment {
    .swiper {
      padding-top: 20px;
    }
    .panel {
      margin-top: 20px;
      padding: 20px 40px;
      background-color: #fff;
      .top {
        .flex();
        .l {
          width: 100px;
          height: 100px;
          border-radius: 100%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .m {
          margin-left: 20px;  
          flex: 1;
          align-self: flex-start;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .title {
            font-size: 36px;
            margin-bottom: 15px;
          }
          .desc {
            font-size: 28px;
            color: @font-color;
          }
        }
        .r {
          width: 200px;
          .flex();
          color: @font-color;
          .fouce {
            width: 120px;
            height: 55px;
            .flex();
            margin-right: 5px;
            padding: 5px;
            border: 2px solid @border-color;
            border-radius: 5px;
            .icon {
              font-size: 32px;
            }
            .text { 
              font-size: 28px;
            }
          }
          .share {
            font-size: 48px;
          }
        }
      }
      .action_bar {
        .flex();
        height: 70px;
        font-size: 32px;
        color: @font-color;
        .icon {
          font-size: 56px;
          margin-right: 5px;
        }
        &_item {
          flex: 1;
          .flex();
        }
      }
    }
  }
</style>

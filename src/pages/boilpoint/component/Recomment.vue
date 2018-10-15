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
        <li class="panel" v-for="item in pinList" :key="item.objectId">
            <div class="top">
              <div class="l">
                <img v-lazy="item.user.avatarLarge" >
              </div>
              <div class="m">
                <p class="title">{{item.user.username}}</p>
                <div class="desc">
                  <span v-if="item.user.jobTitle">{{item.user.jobTitle}} @</span>
                  <span v-if="item.user.company">{{item.user.company}} · </span>
                  <span>{{item.createdAt | timeBefore}}</span>
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
            <div class="content">
              <p class="content_txt">{{item.content}}</p>
              <div class="content_img"><img v-lazy="(item.pictures)[0]" ></div>
            </div>
            <div class="action_bar">
              <div class="action_bar_item">
                <span class="icon"><svg-icon iconClass="dianzan"></svg-icon></span>
                <span>{{item.likedCount}}</span>
              </div>
              <div class="action_bar_item">
                <span class="icon"><svg-icon iconClass="pinlun"></svg-icon></span>
                <span>{{item.commentCount}}</span>
              </div>
              <div class="action_bar_item">
                <span class="icon"><svg-icon iconClass="share-gary"></svg-icon></span>
              </div>
            </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Vue from 'vue'
import Swiper from 'components/Swiper'
import Scroll from 'components/Scroll'
import { mapGetters } from 'vuex'
import { scrollMixin } from 'utils/mixin'
import API from 'api/api'
export default {
  name: 'Recomment',
  components: {
    Swiper,
    Scroll
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
      .panel {
        margin-top: 20px;
        padding-top: 20px;
        background-color: #fff;
        .top {
          .flex();
          padding: 0 30px;
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
            .flex(@justify-content: flex-end);
            color: @font-color;
            .fouce {
              width: 120px;
              height: 55px;
              .flex();
              margin-right: 5px;
              padding: 5px;
              border: 2px solid @border-color;
              border-radius: 8px;
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
        .content {
          margin: 20px 0;
          padding: 0 30px;
          width: 100%;
          font-size: 32px;
          overflow: hidden;
          &_txt {
            margin-bottom: 20px;
          }
          &_img {
            width: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .action_bar {
          .flex();
          height: 70px;
          font-size: 32px;
          color: @font-color;
          border-top: 1px solid @border-color;
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
  }
</style>

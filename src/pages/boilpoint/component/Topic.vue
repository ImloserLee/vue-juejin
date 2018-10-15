<template>
  <div class="topic">
    <scroll class="scroll">
      <div class="swiper">
        <swiper 
          :height="height"
          :options="swiperOption"
          :list="bannerList"
          :radius="radius"
        >
        </swiper>
      </div>
      <section class="section">
        <div class="followed" v-if="followedTopicList.length > 0">
          <h6 class="more">关注的话题</h6>
          <ul>
            <li class="list" v-for="fitem in followedTopicList" :key="fitem.objectId">
              <div class="l">
                <img v-lazy="fitem.icon">
              </div>
              <div class="m">
                <p class="title">{{fitem.title}}</p>
                <span class="txt">{{fitem.followersCount}} 关注者 · {{fitem.msgsCount}} 沸点</span>
              </div>
              <div class="r">
                <span class="txt">{{fitem.msgsCount}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="unfollowed">
          <h6 class="more">更多话题</h6>
          <ul>
            <li class="list" v-for="item in unFollowedTopicList" :key="item.objectId">
              <div class="l">
                <img v-lazy="item.icon">
              </div>
              <div class="m">
                <p class="title">{{item.title}}</p>
                <span class="txt">{{item.followersCount}} 关注者 · {{item.msgsCount}} 沸点</span>
              </div>
              <div class="r">
                <span class="txt">关注</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </scroll>
  </div>
</template>

<script>
import Swiper from 'components/Swiper'
import Scroll from 'components/Scroll'
import API from 'api/api'
import { mapGetters } from 'vuex'
export default {
  name: 'Topic',
  components: {
    Swiper,
    Scroll
  },
  data() {
    return {
      height: '45%',
      radius: '5px',
      swiperOption: {
        slidesPerView: '1.2',
        centeredSlides: true,
        spaceBetween: 10
      },
      bannerList: [],
      followedTopicList: [],
      unFollowedTopicList: []
    }
  },
  mounted() {
    this.getBannerImgList()
    this.getUnFollowedTopicList()
    this.getFollowedTopicList()
  },
  methods: {
    async getBannerImgList() {
      let data = {
        params: {
          position: 'topic-banner',
          page: 0,
          pageSize: 20,
          platform: 'ios',
          src: 'ios'
        }
      }
      let res = await API.getBannerImgList(data)
      if (res.s === 1) {
        this.bannerList = res.d.banner
      }
    },
    async getUnFollowedTopicList() {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          page: 0,
          pageSize: 20,
          src: 'ios',
          token: token,
          uid: uid,
          device_id: device_id
        }
      }
      let res = await API.getUnFollowedTopicList(data)
      if (res.s === 1) {
        this.unFollowedTopicList = res.d.list
      }
    },
    async getFollowedTopicList() {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let data = {
        params: {
          page: 0,
          pageSize: 20,
          src: 'ios',
          token: token,
          uid: uid,
          device_id: device_id
        }
      }
      let res = await API.getFollowedTopicList(data)
      if (res.s === 1) {
        this.followedTopicList = res.d.list
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
  .topic {
    background-color: #fff;
    .scroll {
      height: calc(100vh - 200px);
      overflow: hidden;
      .swiper {
        padding-top: 20px;
      }
      .section {
        padding: 0 40px;
        font-size: 56px;
        .followed, .unfollowed {
          margin-bottom: 20px;
          border-top: 1px solid @border-color;
        }
        .more {
          margin: 35px 0;
        }
        .list {
          position: relative;
          .flex(@justify-content: flex-start);
          height: 160px;
          &:not(:last-of-type):before {
            content: '';
            position: absolute;
            left: 130px;
            bottom: 0;
            z-index: 0;
            width: calc(100% - 130px);
            height: 2px;
            background-color: @border-color;
          }
          .l {
            padding: 20px 0;
            width: 130px;
            height: 100%;
            margin-right: 20px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
          .m {
            flex: 1;
            .title {
              font-size: 36px;
            }
            .txt {
              font-size: 28px;
              color: @font-color;
            }
          }
          .r {
            font-size: 28px;
            color: @base-color;
            .txt {
              display: inline-block;
              width: 120px;
              height: 60px;
              line-height: 60px;
              text-align: center;
              background-color: #EFF2F5;
              border-radius: 40px;
            }
          }
        }
      }
    }
  }
</style>

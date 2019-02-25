<template>
  <div class="wrapper" :style="{paddingBottom: height}">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item of list" :key="item.objectId">
        <img class="swiper-img" :src="item.screenshot" :style="{borderRadius: radius}" v-if="isImage" />
        <div class="swiper-box" :style="{borderRadius: radius}" v-else>
          <div class="title" v-if="item.isRecommend">
            <span class="icon"><svg-icon iconClass="star-yellow"></svg-icon></span>
            <span class="txt">编辑推荐</span>
          </div>
          <div class="title" v-else>
            <span class="icon"><svg-icon iconClass="hot-red"></svg-icon></span>
            <span class="txt">热门沸点</span>
          </div>
          <div class="content">
            <div class="l">
              <p>{{item.content}}</p>
            </div>
            <div class="r" v-if="item.pictures.length > 0">
              <img :src="(item.pictures)[0]" />
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    height: {
      type: String,
      default: '34%'
    },
    options: {
      type: Object
    },
    radius: {
      type: String,
      default: '0'
    },
    // 作为轮播内容是否为图片的判断
    isImage: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        ...this.options
      }
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .wrapper {
    overflow: hidden;
    width: 100%;
    height: 0;
    .swiper-img {
      width: 100%;
    }
    .swiper-box {
      padding: 30px;
      font-size: 32px;
      background-color: #fff;
      .title {
        .icon {
          font-size: 42px;
        }
      }
      .content {
        .flex();
        height: 130px;
        .l {
          flex: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .r {
          width: 130px;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>

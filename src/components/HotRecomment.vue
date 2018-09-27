<template>
  <section class="hot">
    <div class="title">
      <div class="title_left">
        <svg-icon :iconClass="iconName"></svg-icon>
        <slot name="text"></slot>
      </div>
      <div class="title_right" v-if="hasRight">
        <span class="l" @click="handleRefreshRecomment">
          <svg-icon iconClass="refresh" :class="[rotate ? 'rotate' : '', 'icon-refresh']"></svg-icon>
        </span>
        <span class="r" @click="handleCloseRecomment"><svg-icon iconClass="close" class="icon-close"></svg-icon></span>
      </div>
    </div>
    <div class="item" v-for="item in recomment" :key=item.objectId>
      <div class="item_left">
        <p class="txt">{{item.title}}</p>
        <div class="slogan">
          <span>{{item.collectionCount}}喜欢·</span>
          <span>{{item.user.username}}·</span>
          <span>{{item.createdAt | timeBefore}}</span>
        </div>
      </div>
      <div class="item_right" v-if="item.screenshot">
        <img :src="item.screenshot" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hot',
  props: {
    recomment: {
      type: Array,
      default: function () {
        return []
      }
    },
    rotate: {
      type: Boolean,
      default: false
    },
    iconName: {
      type: String,
      default: 'home-hot'
    },
    hasRight: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCloseRecomment() {
      this.$emit('closeRecomment')
    },
    handleRefreshRecomment() {
      this.$emit('refreshRecomment')
    }
  },
  filters: {
    timeBefore: function(date) {
      if (!date) {
        return ''
      }
      let dateee = new Date(date).toJSON()
      let dateTimeStamp  = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'') 
      let sTime = new Date(dateTimeStamp).getTime()
      let now = new Date().getTime()
      let dvalue = now - sTime
      let minTime = 60 * 1000
      let hourTime = 60 * 60 * 1000
      let dayTime = 24 * hourTime
      let monthTime = 30 * dayTime
      let yearTime = 12 * monthTime
      if (dvalue < minTime) {
        return '刚刚'
      } else if (dvalue >= minTime && dvalue < hourTime) {
        return parseInt(dvalue / minTime) + '分钟前'
      } else if (dvalue >= hourTime && dvalue < dayTime) {
        return parseInt(dvalue / hourTime) + '小时前'
      } else if (dvalue >= dayTime && dvalue < monthTime) {
        return parseInt(dvalue / dayTime) + '天前'
      } else if (dvalue >= monthTime && dvalue < yearTime) {
        return parseInt(dvalue / monthTime) + '月前'
      } else if (dvalue >= yearTime) {
        return parseInt(dvalue / yearTime) + '年前'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .hot {
    background-color: #fff;
    .title {
      .flex;
      padding: 0 40px;
      height: 80px;
      font-size: 38px;
      &_left {
        flex: 1;
        .txt {
          color: @base-color;
        }
      }
      &_right {
        flex: 1;
        .flex(@justify-content: flex-end);
        span {
          display: inline-block;
          width: 40px;
          height: 40px;
          &.l {
            margin-right: 30px;
            .icon-refresh {
              font-size: 48px;
              &.rotate {
                animation: rotate .8s linear infinite;
              }
            }
          }
          &.r {
            margin-right: 5px;
            .icon-close {
              font-size: 36px;
            }
          }
        }
      }
    }
    .item {
      .flex(@align-item: flex-start);
      padding: 30px 40px;
      height: 200px;
      border-top: 1px solid @border-color;
      &_left {
        flex: 3;
        padding-right: 20px;
        height: 100%;
        .txt {
          margin-bottom: 25px;
          font-size: 32px;
        }
        .slogan {
          font-size: 28px;
          color: @font-color;
        }
      }
      &_right {
        width: 150px;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>

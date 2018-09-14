<template>
  <section class="hot">
    <div class="title">
      <div class="title_left">
        <svg-icon iconClass="home-hot"></svg-icon>
        <span class="txt">热门推荐</span>
      </div>
      <div class="title_right">
        <span class="l"><svg-icon iconClass="refresh" class="icon-refresh"></svg-icon></span>
        <span class="r"><svg-icon iconClass="close" class="icon-close"></svg-icon></span>
      </div>
    </div>
    <div class="item">
      <div class="item_left">
        <p class="txt">如何保证前端代码质量</p>
        <p class="slogan">266人喜欢</p>
      </div>
      <div class="item_right"></div>
    </div>
    <div class="item">
      <div class="item_left">
        <p class="txt">如何保证前端代码质量</p>
        <p class="slogan">266人喜欢</p>
      </div>
      <div class="item_right"></div>
    </div>
    <div class="item">
      <div class="item_left">
        <p class="txt">如何保证前端代码质量</p>
        <p class="slogan">266人喜欢</p>
      </div>
      <div class="item_right"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hot'
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
        padding-right: 40px;
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
        background-color: orange;
      }
    }
  }
</style>

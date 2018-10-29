<template>
  <div class="common-list">
    <div class="l">
      <img class="cover" v-lazy="list.bgImg.url">
    </div>
    <div class="m">
      <p class="title">{{list.title}}</p>
      <div class="desc">{{list.entryCount}}篇 · PanghuLi</div>
    </div>
    <div class="r">
      <span class="icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'List',
  props: {
    list: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .common-list {
    padding: 0 30px;
    height: 160px;
    background-color: #fff;
    .flex();
    .l {
      width: 100px;
      height: 100px;
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
        font-size: 36px;
        font-weight: bold;
      }
      .desc {
        font-size: 32px;
        color: @font-color;
      }
    }
    .r {
      width: 50px;
    }
  }
</style>


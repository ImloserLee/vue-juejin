<template>
  <div class="already">
    <div class="icon">
      <svg-icon iconClass="book"></svg-icon>
    </div>
    <div class="text">暂无已购小册</div>
  </div>
</template>

<script>
export default {
  name: 'Already'
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .already {
    .flex(@flex-direction: column);
    position: relative;
    width: 100%;
    height: calc(100vh - 200px);
    background-color: #fff;
    .icon {
      font-size: 220px;
    }
    .text {
      font-size: 32px;
      color: @font-color;
    }
  }
</style>

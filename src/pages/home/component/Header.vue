<template>
  <header class="header">
    <div class="header_left">
      <span class="title">首页</span>
    </div>
    <div class="header_right">
      <span class="icon"><svg-icon iconClass="category"></svg-icon></span>
      <span class="icon"><svg-icon iconClass="add"></svg-icon></span>
    </div>
    <i class="bar"></i>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .header {
    position: relative;
    height: 100px;
    .flex;
    padding: 0 40px;
    height: 100px;
    font-size: 38px;
    border-bottom: 1px solid #c7c5c5;
    background-color: @bg-color;
    .bar {
      position: absolute;
      bottom: 0;
      left:0;
      width: 150px;
      height: 4px;
      border-radius: 2px;
      background-color: @base-color;
    }
    &_left {
      flex: 1;
      .title {
        display: inline-block;
        color: @base-color;
      }
    }
    &_right {
      flex: 1;
      .flex(@justify-content: flex-end);
      .icon {
        display: inline-block;
        font-size: 56px;
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
</style>

<template>
  <div class="boil">
    <header class="header">
      <router-link :to="{path: `/brochure/all`}" tag="div" class="item">
        全部
      </router-link>
      <router-link :to="{path: `/brochure/already`}" tag="div" class="item">
        已购
      </router-link>
      <i class="bar" :style="{left: $route.path.indexOf('/all') !== -1 ? '17%' : '67%'}"></i>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Brochure',
  data() {
    return {
      barPos: '17%'
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .boil {
    width: 100%;
    height: 100%;
    .header {
      position: relative;
      .flex();
      height: 100px;
      font-size: 36px;
      border-bottom: 1px solid #c7c5c5;
      background-color: @bg-color;
      .item {
        flex: 1;
        text-align: center;
        &.router-link-active {
          color: @base-color;
        }
      }
      .bar {
        position: absolute;
        bottom: 0;
        width: 120px;
        height: 6px;
        border-radius: 2px;
        background-color: @base-color;
        transition: all .5s;
      }
    }
    
  }
</style>

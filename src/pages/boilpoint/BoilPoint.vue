<template>
  <div class="boil">
    <header class="header">
      <router-link :to="{path: `/boil/topic`}" tag="div" class="item">
        话题
      </router-link>
      <router-link :to="{path: `/boil/recomment`}" tag="div" class="item">
        推荐
      </router-link>
      <router-link :to="{path: `/boil/dynamic`}" tag="div" class="item">
        动态
      </router-link>
      <i class="bar" :style="{left: barPos}"></i>
    </header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Boil',
  data() {
    return {
      barPos: '13%'
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (val.path.indexOf('/topic') !== -1) {
          this.barPos = '13%'
        } else if(val.path.indexOf('/recomment') !== -1) {
          this.barPos = '43%'
        } else {
          this.barPos = '73%'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .boil {
    .header {
      position: relative;
      .flex();
      height: 100px;
      font-size: 36px;
      padding: 0 40px;
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
        width: 100px;
        height: 6px;
        border-radius: 2px;
        background-color: @base-color;
        transition: all .5s;
      }
    }
  }
</style>

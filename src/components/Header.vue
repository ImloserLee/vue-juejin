<template>
  <header class="header">
    <div class="header_l" @click="handleBack">
      <svg-icon iconClass="return"></svg-icon>
    </div>
    <div class="header_m">{{title}}</div>
    <div class="header_r">
      <svg-icon iconClass="yinpin" v-if="showRightIcon"></svg-icon>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '个人主页'
    },
    showRightIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleBack() {
      this.$emit('goBack')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .header {
    .flex();
    padding: 0 10px;
    height: 100px;
    border-bottom: 1px solid #c7c5c5;
    background-color: @bg-color;
    &_l, &_r {
      width: 80px;
    }
    &_m {
      flex: 1;
      text-align: center;
      font-size: 36px;
    }
  }
</style>



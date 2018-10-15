<template>
  <div class="setting">
    <v-header></v-header>
  </div>
</template>

<script>
import VHeader from 'components/Header'
export default {
  name: 'Setting',
  components: {
    VHeader
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .setting {
    .fixed();
  }
</style>



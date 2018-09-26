<template>
  <div class="search">
    <header class="header">
      <input type="text" placeholder="搜索" />
    </header>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .search {
    width: 100%;
    height: 100%;
    .header {
      // padding: 20px;
      .flex();
      height: 100px;
      input {
        width: 95%;
        height: 60px;
        font-size: 28px;
        border: none;
        border-radius: 8px;
        background-color: #dcdde1;
      }
    }
  }
</style>

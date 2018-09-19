<template>
  <div class="panel">
    <div class="header">
      <div class="header_left">
        <div class="avatar">
          <img src="" />
        </div>
        <div class="name">
          Wernei
        </div>
      </div>
      <div class="header_right">
        <span>javascript</span>
        <span>/世界</span>
      </div>
    </div>
    <div class="content">
      <h4>2019你需要知道的前端知识</h4>
      <div class="text">2019你需要知道的前端知识2019你需要知道的前端知识2019你需要知道的前端知识2019你需要知道的前端知识</div>
    </div>
    <div class="bar">

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .panel {
    padding: 40px 40px;
    width: 100%;
    height: 354px;
    background-color: #fff;
    .header {
      margin-bottom: 30px;
      .flex();
      font-size: 32px;
      &_left {
        flex: 1;
        .flex();
      }
      &_right {
        flex: 1;
        .flex(@justify-content: flex-end);
        span {
          color: @font-color;
        }
      }
    }
    .content {
      font-size: 32px;
      .text {
        margin-top: 20px;
        height: 120px;
      }
    }
  }
</style>

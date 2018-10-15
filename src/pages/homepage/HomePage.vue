<template>
  <div class="home_page">
    <header class="header">
      <div class="header_l">
        <svg-icon iconClass="return"></svg-icon>
      </div>
      <div class="header_m">个人主页</div>
      <div class="header_r">
        <svg-icon iconClass="yinpin"></svg-icon>
      </div>
    </header>
    <div class="info_panel">
      <div class="info_panel_t">
        <div class="avatar">
          <img src="../../assets/images/avatar.png" >
        </div>
        <div class="txt">
          <div class="name">Phulio</div>
          <div class="title">前端</div>
        </div>
      </div>
      <div class="info_panel_b">
        <div class="l">
          <p class="number">12</p>
          <p class="type">关注</p>
        </div>
        <div class="l">
          <p class="number">12</p>
          <p class="type">关注者</p>
        </div>
        <div class="r">
          <span class="edit">编辑</span>
        </div>
      </div>
    </div>
    <div class="card">
      <ul>
        <li class="list no-border">
          <span class="item">动态</span>
          <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          <span class="item number">0</span>
        </li>
        <li class="list">
          <span class="item">沸点</span>
          <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          <span class="item number">0</span>
        </li>
        <li class="list">
          <span class="item">原创文章</span>
          <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          <span class="item number">0</span>
        </li>
        <li class="list">
          <span class="item">分享文章</span>
          <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          <span class="item number">0</span>
        </li>
        <li class="list no-border">
          <span class="item">收藏集</span>
          <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          <span class="item number">0</span>
        </li>
        <li class="list">
          <span class="item">赞过的文章</span>
          <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          <span class="item number">0</span>
        </li>
        <li class="list no-border">
          <span class="item">关注的标签</span>
          <span class="item icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          <span class="item number">0</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .home_page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 998;
    background-color: #f0f0f1;
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
    .info_panel {
      padding: 20px 30px;
      background-color: #fff;
      &_t {
        .flex(@justify-content: flex-start);
        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .txt {
          margin-left: 20px;
          height: 100px;
          font-size: 36px;
          .name {
            font-weight: bold;
            margin-bottom: 15px;
          }
        }
      }
      &_b {
        .flex(@justify-content: flex-start);
        margin-top: 15px;
        .l {
          width: 120px;
          font-size: 36px;
          .type {
            margin-top: 10px;
            font-size: 32px;
            color: @font-color;
          }
        }
        .r {
          flex: 1;
          .flex(@justify-content: flex-end);
          font-size: 36px;
          color: @base-color;
          .edit {
            display: block;
            padding: 12px 40px;
            border: 2px solid @base-color;
            border-radius: 7px;
          }
        }
      }
    }
    .card {
      margin-top: 40px;
      font-size: 32px;
      .list {
        height: 94px;
        line-height: 94px;
        padding: 0 30px;
        background-color: #fff;
        border-bottom: 1px solid @border-color;
        &.no-border {
          border-bottom: none;
          margin-bottom: 20px;
        }
        .item {
          float: left;
          &.icon {
            float: right;
            font-size: 48px;
          }
          &.number {
            float: right;
            color: @font-color;
          }
        }
      }
    }
  }
</style>



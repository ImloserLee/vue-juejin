<template>
  <div class="person">
    <header class="header">我</header>
    <section class="information">
      <div class="left">
        <div class="avatar"></div>
        <div class="info">
          <p class="username">Panghuli</p>
          <p class="job">前端</p>
        </div>
      </div>
      <div class="right">
        <span class="icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
      </div>
    </section>
    <section class="card">
      <ul>
        <li class="list" v-for="item in typeList" :key="item.icon">
          <span class="item icon"><svg-icon :iconClass="item.icon"></svg-icon></span>
          <span class="item">{{item.text}}</span>
          <span class="item modifier">{{item.modifier}}</span>
          <span class="item number">{{item.number}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data() {
    return {
      typeList: [
        {icon: 'message', text: '消息中心', number: 2, modifier: '条'},
        {icon: 'love', text: '我喜欢的', number: 2, modifier: '篇'},
        {icon: 'collection', text: '收藏集', number: 2, modifier: '个'},
        {icon: 'buy', text: '已购小册', number: 2, modifier: '本'},
        {icon: 'money', text: '我的钱包', number: 2, modifier: ''},
        {icon: 'feidian', text: '赞过的沸点', number: 2, modifier: '篇'},
        {icon: 'eye', text: '阅读过的文章', number: 2, modifier: '篇'},
        {icon: 'tag', text: '标签管理', number: 2, modifier: '个'},
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .person {
    width: 100%;
    height: 100%;
    .header {
      .flex();
      height: 100px;
      font-size: 48px;
      border-bottom: 1px solid #c7c5c5;
      background-color: @bg-color;
    }
    .information {
      padding: 40px;
      margin: 40px 0;
      .flex();
      height: 200px;
      box-sizing: border-box;
      background-color: #fff;
      .left {
        flex: 2;
        .avatar {
          float: left;
          width: 110px;
          height: 110px;
          border-radius: 100%;
          background-color: red;
        }
        .info {
          float: left;
          margin-left: 15px;
          width: 200px;
          height: 110px;
          background-color: yellow;
          .username {
            margin-bottom: 18px;
            font-size: 36px;
          }
          .job {
            color: @font-color;
            font-size: 32px;
          }
        }
      }
      .right {
        flex: 1;
        .icon {
          float: right;
        }
      }
    }
    .card {
      padding: 0 40px;
      font-size: 32px;
      background-color: #fff;
      .list {
        height: 94px;
        line-height: 94px;
        .item {
          float: left;
          &.icon {
            margin-right: 50px;
            font-size: 48px;
          }
          &.number {
            float: right;
            color: @font-color;
          }
          &.modifier {
            float: right;
            color: @font-color;
          }
        }
      }
    }
  }
</style>

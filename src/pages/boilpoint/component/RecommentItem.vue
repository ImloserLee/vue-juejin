<template>
  <div>
    <div class="top">
      <div class="l">
        <img v-lazy="item.user.avatarLarge" >
      </div>
      <div class="m">
        <p class="title">{{item.user.username}}</p>
        <div class="desc">
          <span v-if="item.user.jobTitle">{{item.user.jobTitle}} @</span>
          <span v-if="item.user.company">{{item.user.company}} · </span>
          <span>{{item.createdAt | timeBefore}}</span>
        </div>
      </div>
      <div class="r">
        <div class="fouce">
          <span class="icon"><svg-icon iconClass="add-gary"></svg-icon></span>
          <span class="text">关注</span>
        </div>
        <div class="share"><svg-icon iconClass="shenluehao"></svg-icon></div>
      </div>
    </div>
    <div class="content">
      <p class="content_txt">{{item.content}}</p>
      <div class="content_img"><img v-lazy="(item.pictures)[0]" ></div>
    </div>
    <div class="action_bar">
      <div class="action_bar_item">
        <span class="icon"><svg-icon iconClass="dianzan"></svg-icon></span>
        <span>{{item.likedCount}}</span>
      </div>
      <div class="action_bar_item">
        <span class="icon"><svg-icon iconClass="pinlun"></svg-icon></span>
        <span>{{item.commentCount}}</span>
      </div>
      <div class="action_bar_item">
        <span class="icon"><svg-icon iconClass="share-gary"></svg-icon></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .top {
    .flex();
    padding: 0 30px;
    .l {
      width: 100px;
      height: 100px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .m {
      margin-left: 20px;  
      flex: 1;
      align-self: flex-start;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .title {
        font-size: 36px;
        margin-bottom: 15px;
      }
      .desc {
        font-size: 28px;
        color: @font-color;
      }
    }
    .r {
      width: 200px;
      .flex(@justify-content: flex-end);
      color: @font-color;
      .fouce {
        width: 120px;
        height: 55px;
        .flex();
        margin-right: 5px;
        padding: 5px;
        border: 2px solid @border-color;
        border-radius: 8px;
        .icon {
          font-size: 32px;
        }
        .text { 
          font-size: 28px;
        }
      }
      .share {
        font-size: 48px;
      }
    }
  }
  .content {
    margin: 20px 0;
    padding: 0 30px;
    width: 100%;
    font-size: 32px;
    overflow: hidden;
    &_txt {
      margin-bottom: 20px;
    }
    &_img {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .action_bar {
    .flex();
    height: 70px;
    font-size: 32px;
    color: @font-color;
    border-top: 1px solid @border-color;
    .icon {
      font-size: 56px;
      margin-right: 5px;
    }
    &_item {
      flex: 1;
      .flex();
    }
  }
</style>



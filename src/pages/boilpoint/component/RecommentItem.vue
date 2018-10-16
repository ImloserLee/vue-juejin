<template>
  <div class="recomment-item">
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
        <div class="focus">
          <span class="icon"><svg-icon iconClass="add-gary"></svg-icon></span>
          <span class="text">关注</span>
        </div>
        <div class="share"><svg-icon iconClass="shenluehao"></svg-icon></div>
      </div>
    </div>
    <div class="content">
      <p class="content_txt">{{item.content}}</p>
      <div class="content_img" v-if="item.pictures.length > 0"><img v-lazy="(item.pictures)[0]" ></div>
    </div>
    <div class="action-bar">
      <div class="action-bar_item">
        <span class="icon"><svg-icon iconClass="dianzan"></svg-icon></span>
        <span class="text" v-if="item.likedCount">{{item.likedCount}}</span>
        <span class="text" v-else>赞</span>
      </div>
      <div class="action-bar_item">
        <span class="icon"><svg-icon iconClass="pinlun"></svg-icon></span>
        <span class="text" v-if="item.commentCount">{{item.commentCount}}</span>
        <span class="text" v-else>评论</span>
      </div>
      <div class="action-bar_item">
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
  .recomment-item {
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
        .focus {
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
        width: 50%;
        img {
          width: 100%;
          // height: 100%;
        }
      }
    }
    .action-bar {
      .flex();
      height: 70px;
      font-size: 28px;
      color: @font-color;
      border-top: 1px solid @border-color;
      &_item {
        flex: 1;
        .flex();
        .icon {
          font-size: 48px;
          margin-right: 5px;
        }
        .text {
          margin-top: 7px;
        }
      }
    }
  }
</style>
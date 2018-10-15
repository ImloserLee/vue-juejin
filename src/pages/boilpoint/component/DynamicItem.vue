<template>
  <div class="dynamic-item">
    <div class="avatar">
      <img v-lazy="dynamicItemData.follow.follower.avatarLarge" >
    </div>
    <div class="txt">
      <div class="txt_t">
        <span class="f_large">{{dynamicItemData.follow.follower.username}}</span>
        <span class="c_gary">关注了</span>
        <span class="f_small">{{dynamicItemData.follow.followee.username}}</span>
      </div>
      <div class="txt_b">{{dynamicItemData.follow.createdAt | timeBefore}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dynamicItemData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  created() {
    console.log(this.dynamicItemData)
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .dynamic-item {
    .flex(@justify-content: flex-start);
    .avatar {
      width: 100px;
      height: 100px;
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
      &_t {
        margin-bottom: 15px;
        .c_gary {
          color: @font-color;
        }
        .f_small {
          font-size: 32px;
        }
      }
      &_b {
        font-size: 32px;
        color: @font-color;
      }
    }
  }
</style>


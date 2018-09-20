<template>
  <div class="panel">
    <div class="header">
      <div class="header_left">
        <div class="avatar">
          <img :src="timeline.user.avatarLarge" />
        </div>
        <div class="name">
          {{timeline.user.username}}
        </div>
      </div>
      <div class="header_right">
        <span>{{timeline.tags | splitTag}}</span>
      </div>
    </div>
    <div class="content">
      <h4>{{timeline.title}}</h4>
      <div class="text">
        <p>{{timeline.content}}</p>
      </div>
    </div>
    <div class="bar">
      <div class="live">
        <span class="icon"><svg-icon iconClass="like"></svg-icon></span>
        <span class="text">20</span>
      </div>
      <div class="comment">
        <span class="icon"><svg-icon iconClass="comment"></svg-icon></span>
        <span class="text">评论</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeline: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  filters: {
    splitTag: function(arr) {
      let tagArr = arr.slice(0, 2)
      let tag = tagArr.map((item, index) => {
        return item.title
      }).join('/')
      return tag
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .panel {
    margin-top: 20px;
    padding: 40px 40px;
    width: 100%;
    height: 374px;
    background-color: #fff;
    .header {
      margin-bottom: 30px;
      .flex();
      font-size: 32px;
      &_left {
        flex: 1;
        .flex(@justify-content:flex-start);
        .avatar {
          margin-right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 100%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
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
        color: #4E5154;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
    .bar {
      margin-top: 15px;
      .flex(@justify-content: flex-start);
      font-size: 32px;
      .icon {
        font-size: 36px;
      }
      .text {
        color: @font-color;
      }
      .live {
        margin-right: 80px;
      }
    }
  }
</style>

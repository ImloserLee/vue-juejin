<template>
  <ul>
    <li v-for="item in timeline" :key="item.objectId" class="list">
      <div class="panel">
        <div class="header">
          <div class="header_left" @click="handleToHomePage(item)">
            <div class="avatar">
              <img v-lazy="item.user.avatarLarge" />
            </div>
            <div class="name">
              {{item.user.username}}
            </div>
          </div>
          <div class="header_right" @click="handleToDetail(item)">
            <span>{{item.tags | splitTag}}</span>
          </div>
        </div>
        <div class="content" @click="handleToDetail(item)">
          <div class="content_left">
            <h4>{{item.title}}</h4>
            <div class="text">
              <p>{{item.content}}</p>
            </div>
          </div>
          <div class="content_right" v-if="item.screenshot">
            <img v-lazy="item.screenshot">
          </div>
        </div>
        <div class="bar">
          <div class="like">
            <span class="icon" @click="handleCancelUserLike(item)" v-if="item.isCollected"><svg-icon iconClass="dianzan-fill"></svg-icon></span>
            <span class="icon" @click="handleSetUserLike(item)" v-else><svg-icon iconClass="dianzan"></svg-icon></span>
            <span class="text" :class="item.isCollected ? 'like-text': ''" v-if="item.collectionCount">{{item.collectionCount}}</span>
            <span class="text" v-else>点赞</span>
          </div>
          <div class="comment">
            <span class="icon"><svg-icon iconClass="pinlun"></svg-icon></span>
            <span class="text" v-if="item.commentsCount">{{item.commentsCount}}</span>
            <span class="text" v-else>评论</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { getUrlParam } from 'utils/utils'
export default {
  props: {
    timeline: {
      type: Array,
      default: function() {
        return []
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
  },
  methods: {
    // 详情页需要的参数根据type值不同进行区分
    // type = 1 传postId type = 2 传递objectId
    handleToDetail(item) {
      let postId = getUrlParam(item.originalUrl)
      let objectId = item.objectId
      let type = item.type;
      let id = type === 'post' ? postId : objectId
      let params = {
        id: id,
        type: type
      }
      this.$emit('toDetail', params)
    },
    handleToHomePage(item) {
      let objectId = item.user.objectId
      this.$emit('toHomePage', objectId)
    },
    handleSetUserLike(item) {
      // 点赞操作接口需要参数objectId
      let objectId = item.objectId
      this.$emit('setUserLike', objectId)
    },
    handleCancelUserLike(item) {
      // 取消点赞操作接口需要参数objectId
      let objectId = item.objectId
      this.$emit('cancelUserLike', objectId)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .list {
    padding-top: 20px;
  }
  .panel {
    padding: 30px 40px;
    width: 100%;
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
      .flex(@align-item: flex-start);
      font-size: 32px;
      &_left {
        flex: 3;
        .text {
          margin-top: 20px;
          color: #4E5154;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      &_right {
        flex:1;
        height: 160px;
        img {
          width:100%;
          height: 100%;
        }
      }
    }
    .bar {
      margin-top: 15px;
      .flex(@justify-content: flex-start);
      font-size: 28px;
      color: @font-color;
      .like, .comment {
        .flex();
        margin-right: 30px;
        .icon {
          font-size: 48px;
        }
        .text {
          margin-top: 9px;
          &.like-text {
            color: #6cbd45;
          }
        }
      }
    }
  }
</style>

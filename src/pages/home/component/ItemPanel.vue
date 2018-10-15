<template>
  <ul>
    <li v-for="item in timeline" :key="item.objectId" class="list">
      <div class="panel">
        <div class="header" @click="handleToDetail(item)">
          <div class="header_left">
            <div class="avatar">
              <img v-lazy="item.user.avatarLarge" />
            </div>
            <div class="name">
              {{item.user.username}}
            </div>
          </div>
          <div class="header_right">
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
          <div class="live">
            <span class="icon"><svg-icon iconClass="love2"></svg-icon></span>
            <span class="text">{{item.collectionCount}}</span>
          </div>
          <div class="comment">
            <span class="icon"><svg-icon iconClass="comment"></svg-icon></span>
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
      let type = item.type === 'post' ? 1 : 2
      let id = type === 1 ? postId : objectId
      let params = {
        id: id,
        type: type
      }
      this.$emit('toDetail', params)
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
    padding: 40px 40px;
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

<template>
  <div class="dynamic">
    <scroll 
      ref="scroll"
      class="scroll"
      :data="dynamicPinList"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp">
      <ul>
        <li class="list" v-for="item in dynamicPinList" :key="item.follow.objectId">
          <div class="avatar">
            <img v-lazy="item.follow.follower.avatarLarge" >
          </div>
          <div class="txt">
            <div class="txt_t">
              <span class="f_large">{{item.follow.follower.username}}</span>
              <span class="c_gary">关注了</span>
              <span class="f_small">{{item.follow.followee.username}}</span>
            </div>
            <div class="txt_b">{{item.follow.createdAt | timeBefore}}</div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/Scroll'
import { mapGetters } from 'vuex'
import { scrollMixin } from 'utils/mixin'
import API from 'api/api'
export default {
  name: 'Dynamic',
  components: {
    Scroll
  },
  mixins: [scrollMixin],
  data() {
    return {
      dynamicPinList: []
    }
  },
  mounted() {
    this.getDynamicPinList(true)
  },
  methods: {
    async getDynamicPinList(reload) {
      let { token = '', uid = 'unlogin', device_id = '' } = this.auth ? this.auth : ''
      let dynamicPinList = this.dynamicPinList
      if (!dynamicPinList.length || reload) {
        dynamicPinList = [{ createdAt: '' }]
      }
      let createdAt = (dynamicPinList.slice(-1)[0].createdAt) || ''
      let data = {
        params: {
          src: 'ios',
          token: token,
          uid: uid,
          device_id: device_id,
          before: createdAt,
          limit: 20
        }
      }
      let res = await API.getDynamicPinList(data)
      if (res.s === 1) {
        let list = res.d && res.d.list || []
        // 这里简化了列表的渲染,只展示了关注这一块
        list = list.filter((item) => {
          return item.type === 'follow'
        })
        this.dynamicPinList = reload ? list : this.dynamicPinList.concat(list.slice(1))
      }
    },
    handlePullDown() {
      this.getDynamicPinList(true)
    },
    handlePullUp() {
      this.getDynamicPinList()
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ])
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .dynamic {
    .scroll {
      height: e("calc(100vh - 200px)");
    }
    .list {
      .flex(@justify-content: flex-start);
      margin-top: 20px;
      padding: 20px;
      background: #fff;
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
  }
</style>


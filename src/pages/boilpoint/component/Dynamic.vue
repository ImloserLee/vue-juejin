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
      <ul class="dynamic-ul">
        <li class="dynamic-list" 
            v-for="danamic in dynamicPinList" 
            :key="danamic.type === 'follow' ? danamic.follow.objectId : danamic.pin.objectId"
        >
          <dynamic-item :dynamicItemData="danamic" v-if="danamic.type === 'follow'"></dynamic-item>
          <recomment-item :item="danamic.pin" v-else></recomment-item>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/Scroll'
import DynamicItem from './DynamicItem'
import RecommentItem from './RecommentItem'

import { mapGetters } from 'vuex'
import { scrollMixin } from 'utils/mixin'
import API from 'api/api'
export default {
  name: 'Dynamic',
  components: {
    Scroll,
    DynamicItem,
    RecommentItem
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
    height: e("calc(100vh - 200px)");
    .dynamic-ul {
      padding-top: 20px;
      .dynamic-list {
        margin-top: 20px;
        background: #fff;
        &:first-child {
           margin-top: 0;
        }
      }
    }
  }
</style>


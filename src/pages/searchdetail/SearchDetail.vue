<template>
  <div class="search-detail">
    <v-header title="搜索" @goBack="handleToSearch"></v-header>
    <div class="search-ipt">
      <input type="text" placeholder="搜索" class="input" v-model="inputValue" @input="handleSearch" />
      <svg-icon iconClass="search" class="s-icon"></svg-icon>
      <span class="c-icon" v-if="isShow" @click="handleClearInput">
        <svg-icon iconClass="clear"></svg-icon>
      </span>
    </div>
    <scroll
      class="scroll"
      :data="listData"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      @pullingDown="handlePullDown"
      @pullingUp="handlePullUp"
    >
      <recomment 
        :hasTitle="hasTitle" 
        :recomment="listData" 
        v-if="listData.length"
        @toDetail="handleToDetail"
      ></recomment>
    </scroll>
  </div>
</template>

<script>
import VHeader from 'components/Header'
import Recomment from 'components/HotRecomment'
import Scroll from 'components/Scroll'
import API from 'api/api'
import { _debounce } from 'utils/utils'
import { scrollMixin } from 'utils/mixin'
export default {
  name: 'SearchDetail',
  components: {
    VHeader,
    Recomment,
    Scroll
  },
  mixins: [scrollMixin],
  data() {
    return {
      hasTitle: false,
      inputValue: '',
      listData: [],
      pageNum: 0
    }
  },
  methods: {
    async getSearchData(reload) {
      if (!reload) {
        this.pageNum ++
      }
      let pageNum = this.pageNum
      let data = {
        params: {
          page: pageNum,
          query: this.inputValue,
          src: 'ios',
          raw_result: false
        }
      }
      let res = await API.getSearchData(data)
      if (res.s === 1) {
        this.listData = reload ? res.d : this.listData.concat(res.d.slice(1))
      }
    },
    handleSearch: _debounce(function() {
      this.getSearchData(true)
    }),
    handleToSearch() {
      this.$router.go(-1)
    },
    handleClearInput() {
      this.inputValue = ''
    },
    handlePullDown() {
      this.getSearchData(true)
    },
    handlePullUp() {
      this.getSearchData()
    },
    handleToDetail(params) {
      this.$router.push({ path: 'detail', query: { id: params.id, type: params.type } })
    }
  },
  computed: {
    isShow() {
      return this.inputValue ? true : false
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
   input::-webkit-input-placeholder {
    color: #919196;
  }
  .search-detail {
    .fixed();
    background-color: #fff;
    .search-ipt {
      position: relative;
      .flex();
      height: 100px;
      .input {
        width: 95%;
        height: 70px;
        font-size: 28px;
        text-indent: 60px;
        border: none;
        border-radius: 10px;
        background-color: #f1f1f2;
      }
      .s-icon {
        position: absolute;
        top: 28px;
        left: 30px;
        font-size: 42px;
      }
      .c-icon {
        position: absolute;
        top: 5px;
        right: 15px;
      }
    }
    .scroll {
      height: calc(100vh - 200px);
    }
  }
</style>



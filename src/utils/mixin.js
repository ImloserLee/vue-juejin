import { ScrollConfig } from './scrollConfig'
import Vue from 'vue'

export const scrollMixin = {
  data() {
    return {
      scrollbar: true,
      scrollbarFade: true,
      pullDownRefresh: true,
      pullUpLoad: true
    }
  },
  methods: {
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  },
  watch: {
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
  },
  computed: {
    scrollbarObj: function () {
      return this.scrollbar ? {fade: this.scrollbarFade} : false
    },
    pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(ScrollConfig.pullDownRefreshThreshold),
        stop: parseInt(ScrollConfig.pullDownRefreshStop),
        txt: ScrollConfig.pullDownRefreshTxt
      } : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(ScrollConfig.pullUpLoadThreshold),
        txt: {more: ScrollConfig.pullUpLoadMoreTxt, noMore: ScrollConfig.pullUpLoadNoMoreTxt}
      } : false
    },
  }
}
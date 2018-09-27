<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    click: {
      type: Boolean,
      default: true
    },
    pullup: {
      type: Boolean,
      default: false
    },
    pulldown: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    scrollbar: {
      type: null,
      default: false
    }
  },
  mounted() {
    this._initScroll()
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        scrollX: this.scrollX,
        click: this.click,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
      })
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.$emit('pullingDown')
      })
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

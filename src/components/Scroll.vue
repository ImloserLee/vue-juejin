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
        click: this.click
      })
    },
    refresh() {
      this.scroll && this.scroll.refresh()
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

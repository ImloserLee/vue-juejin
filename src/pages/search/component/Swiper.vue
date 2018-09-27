<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item of list" :key="item.objectId">
        <img class="swiper-img" :src="item.screenshot" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 34%;
    background: #eee;
    .swiper-img {
      width: 100%
    }
  }
</style>

<template>
  <div class="dynamic">
    <scroll 
      ref="scroll"
      class="scroll"
      :scrollbar="scrollbarObj">
      <ul>
        <li class="list">
          <div class="avatar">
            <img src="../../../assets/images/avatar.png" >
          </div>
          <div class="txt">
            <div class="txt_t">
              <span class="f_large">杨明</span>
              <span class="c_gary">关注了</span>
              <span class="f_small">策士</span>
            </div>
            <div class="txt_b">11小时前</div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/Scroll'
export default {
  name: 'Dynamic',
  components: {
    Scroll
  },
  data() {
    return {
      scrollbar: true,
      scrollbarFade: true,
    }
  },
  computed: {
    scrollbarObj: function () {
      return this.scrollbar ? {fade: this.scrollbarFade} : false
    },
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  .dynamic {
    .scroll {
      height: calc(100vh - 200px);
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


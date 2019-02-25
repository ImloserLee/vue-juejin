<template>
  <div id="app">
    <keep-alive>
      <router-view id="view" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view id="view" v-if="!$route.meta.keepAlive"></router-view>
    <div class="footer">
      <router-link to="/home" tag="div" class="item">
        <div class="icon">
          <svg-icon :iconClass="$route.path.indexOf('/home') !== -1 ? 'home-fill' : 'home'">
          </svg-icon>
        </div>
        <div class="txt">首页</div>
      </router-link>
      <router-link to="/search" tag="div" class="item">
        <div class="icon">
          <svg-icon :iconClass="$route.path.indexOf('/search') !== -1 ? 'search-fill' : 'search'">
          </svg-icon>
        </div>
        <div class="txt">发现</div>
      </router-link>
      <router-link to="/boil" tag="div" class="item">
        <div class="icon">
          <svg-icon :iconClass="$route.path.indexOf('/boil') !== -1 ? 'boil-fill' : 'boil'">
          </svg-icon>
        </div>
        <div class="txt">沸点</div>
      </router-link>
      <router-link to="/brochure" tag="div" class="item">
        <div class="icon">
          <svg-icon :iconClass="$route.path.indexOf('/brochure') !== -1 ? 'brochure-fill' : 'brochure'">
          </svg-icon>
        </div>
        <div class="txt">小册</div>
      </router-link>
      <router-link to="/person" tag="div" class="item">
        <div class="icon">
          <svg-icon :iconClass="$route.path.indexOf('/person') !== -1 ? 'person-fill' : 'person'">
          </svg-icon>
        </div>
        <div class="txt">我</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Login from 'pages/login/Login'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      animate: ''
    }
  },
  components: {
    Login
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  }
}
</script>

<style lang="less" scoped>
  @import '~style/mixin.less';
  #app {
    width: 100%;
    height: 100%;
    #view {
      width: 100%;
      height: 100%;
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }
    .footer {
      .flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background-color: @bg-color;
      border-top: 1px solid #c7c5c5;
      z-index: 99;
      .item {
        flex: 1;
        .flex(@flex-direction: column);
        .icon {
          font-size: 56px;
        }
        .txt {
          font-size: 24px;
          color: @font-color;
        }
        &.router-link-active {
          .txt {
            color: @base-color;
          }
        }
      }
    }
  }
  .animate-enter-active, .animate-leave-active {
    transition: all .5s;
  }
  .animate-enter, .animate-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
</style>

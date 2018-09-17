<template>
  <div id="app">
    <router-view/>
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
    <transition name="lg">
      <login v-if="isLogin"></login>
    </transition>
  </div>
</template>

<script>
import Login from 'pages/login/Login'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
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
    .footer {
      .flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background-color: @bg-color;
      border-top: 1px solid #c7c5c5;
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
  .lg-enter-active
  .lg-leave-active {
    opacity: 0;
  }
  .lg-enter {
    transform: translateX(100%);
  }
  .lg-leave-active {
    transform: translateX(-100%);
    opacity: 1;
  }

</style>

<template>
  <div class="setting">
    <v-header title="设置" @goBack="handleGoBack"></v-header>
    <section class="setting-panel">
      <ul class="list-ul">
        <li class="list">
          <div class="l">手机</div>
          <div class="r">
            <span class="tel">{{settingInfo.mobilePhoneNumber}}</span>
            <span class="icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          </div>
        </li>
        <li class="list">
          <div class="l">邮箱</div>
          <div class="r">
            <span class="tel">{{settingInfo.email}}</span>
            <span class="icon"><svg-icon iconClass="arrow-right"></svg-icon></span>
          </div>
        </li>
        <li class="list sign-out" @click="handleSignOut">
          <p class="txt">退出账号</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import VHeader from 'components/Header'
import { mapGetters } from 'vuex'
import API from 'api/api'
export default {
  name: 'Setting',
  components: {
    VHeader
  },
  data() {
    return {
      settingInfo: []
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      let data = {
        params: {
          src: 'ios',
          ...this.auth
        }
      }
      let res = await API.getUserInfo(data)
      if (res.m === 'ok') {
        this.settingInfo = res.d
      }
    },
    handleGoBack() {
      this.$router.push({ path: '/person' })
    },
    handleSignOut() {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push('/boil')
      })
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
  .setting {
    .fixed();
    .setting-panel {
      margin-top: 30px;
      .list {
        .flex();
        height: 90px;
        font-size: 36px;
        background-color: #fff;
        border-bottom: 1px solid @border-color;
        .l {
          padding-left: 20px;
          flex: 1;
        }
        .r {
          padding-right: 20px;
          flex: 1;
          .flex(@justify-content: flex-end);
          .tel {
            color: @font-color;
          }
          .icon {
            font-size: 48px;
          }
        }
        &.sign-out {
          border-top: 1px solid @border-color;
          margin-top: 40px;
          .txt {
            color: #fe5342;
          }
        }
      }
    }
  }
</style>



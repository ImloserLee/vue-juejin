import Server from './server'
import apiconfig from './config'
class API extends Server {
  // 热们推荐
  async getEntryByHotRecomment(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.timeline}/get_entry_by_hot_recomment`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch(err) {
      throw err
    }
  }

  // 首页内容块
  async getEntryByTimeline(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.timeline}/get_entry_by_timeline`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }
  // 刷新热门推荐
  async refreshHotRecomment(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.timeline}/user_filter_entry`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 登陆
  async login(params = {}) {
    try{
      let result = await this.axios('post', `${apiconfig.auth}`, params)
      return result
    }catch(err){
      throw err;
    }
  }

  // 获取个人信息
  async getUserInfo(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.userinfo}/getUserInfo`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取其他个人信息
  async getMultiUser(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.lccro}/get_multi_user`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取小册信息
  async getBrochureInfo(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.brochure}/getListByLastTime`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取搜索页banner
  async getBannerImgList(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.banner}/get_banner`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取搜索页热门文章
  async getEntryByRank(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.timeline}/get_entry_by_rank`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取详情页内容
  async getDetailData(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.storage}/getDetailData`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  async getEntryView(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.entryview}/getEntryView`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  async getEntryByIds(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.timeline}/get_entry_by_ids`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取已关注话题
  async getFollowedTopicList(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.short}/topicList/followed`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取更多话题
  async getUnFollowedTopicList(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.short}/topicList/unfollowed`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 沸点页推荐栏banner数据
  async getHotRecommendList(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.short}/getHotRecommendList`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 沸点页推荐数据
  async getPinList(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.short}/pinList/recommend`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 沸点页动态栏数据
  async getDynamicPinList(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.short}/pinList/dynamic`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 阅读过的文章接口数据
  async getEntryBySelf(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.timeline}/get_entry_by_self`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 搜索接口
  async getSearchData(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.search}/search`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取我赞过的接口数据
  async getUserLike(params = {}) {
    try {
      let { uid } = params.params
      delete params.params.uid
      let result = await this.axios('get', `${apiconfig.userlike}/user/${uid}/like/entry`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取收藏集接口数据
  async getUserCollectionSet(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.collection}/getUserCollectionSet`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取标签管理接口数据
  async getTagData(params = {}) {
    try {
      let { uid } = params.params
      delete params.params.uid
      let result = await this.axios('get', `${apiconfig.tag}/user/${uid}/subscribe`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 获取分享文章
  async getEntryBySelf(params = {}) {
    try {
      let result = await this.axios('get', `${apiconfig.timeline}/get_entry_by_self`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }

  // 点赞接口
  async setUserLike(params = {}) {
    try {
      let { objectId, uid, device_id, token } = params
      let headers = {'X-Juejin-Uid': uid, 'X-Juejin-Client': device_id, 'X-Juejin-Token': token }
      let result = await this.axios('put', `${apiconfig.userlike}/user/like/entry/${objectId}`, {}, headers)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }
  // 取消点赞接口
  async cancelUserLike(params = {}) {
    try {
      let { objectId, uid, device_id, token } = params
      let headers = {'X-Juejin-Uid': uid, 'X-Juejin-Client': device_id, 'X-Juejin-Token': token }
      let result = await this.axios('delete', `${apiconfig.userlike}/user/like/entry/${objectId}`, {}, headers)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }
}

export default new API()

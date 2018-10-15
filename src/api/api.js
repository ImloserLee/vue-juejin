import Server from './server'
class API extends Server {
  // 热们推荐
  async getEntryByHotRecomment(params = {}) {
    try {
      let result = await this.axios('get', `/timeline/get_entry_by_hot_recomment`, params)
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
      let result = await this.axios('get', `/timeline/get_entry_by_timeline`, params)
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
      let result = await this.axios('get', `/timeline/user_filter_entry`, params)
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
      let result = await this.axios('post', `/auth`, params)
      return result
    }catch(err){
      throw err;
    }
  }

  // 获取个人信息
  async getUserInfo(params = {}) {
    try {
      let result = await this.axios('get', `/userinfo/getUserInfo`, params)
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
      let result = await this.axios('get', `/brochure/getListByLastTime`, params)
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
      let result = await this.axios('get', `/banner/get_banner`, params)
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
      let result = await this.axios('get', `/timeline/get_entry_by_rank`, params)
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
      let result = await this.axios('get', `/storage/getDetailData`, params)
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
      let result = await this.axios('get', `/short/topicList/followed`, params)
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
      let result = await this.axios('get', `/short/topicList/unfollowed`, params)
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
      let result = await this.axios('get', `/short/getHotRecommendList`, params)
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
      let result = await this.axios('get', `/short/pinList/recommend`, params)
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
      let result = await this.axios('get', `/short/pinList/dynamic`, params)
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      throw err
    }
  }
}

export default new API()

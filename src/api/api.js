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
}

export default new API()

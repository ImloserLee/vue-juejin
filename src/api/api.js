import Server from './server'
import config from './config'
class API extends Server {
  // 热们推荐
  async getEntryByHotRecomment (params = {}) {
    console.log(params)
    try {
      let result = await this.axios('get', `${config.timelineRequestUrl}/get_entry_by_hot_recomment`, params)
      if (result && result.m === 'ok') {
        return result.d
      }
    } catch (err) {
      throw err
    }
  }
}

export default new API()

import Server from './server'
class API extends Server {
  // 热们推荐
  async getEntryByHotRecomment(params = {}) {
    try {
      let result = await this.axios('get', `/timeline/get_entry_by_timeline`, params)
      if (result && result.m === 'ok') {
        return result.d
      }
    } catch(err) {
      throw err
    }
  }

  // 登陆
  async login(params = {}){
    try{
      let result = await this.axios('post', `/auth`, params)
      return result
    }catch(err){
      throw err;
    }
  }
}

export default new API()

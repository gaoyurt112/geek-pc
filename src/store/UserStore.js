import { makeAutoObservable, runInAction } from "mobx"
import { http } from '@/utils/http'

class UserStore {
  //定义一个变量接收用户信息
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  //获取用户信息的方法
  async getUserInfo () {
    const res = await http.get('http://geek.itheima.net/v1_0/user/profile')
    // console.log(res)
    //严格模式错误处理
    runInAction(() => {
      this.userInfo = res.data
    })

  }


}
const userStore = new UserStore()
export default userStore
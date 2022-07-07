import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
import { getToken, setToken, clearToken } from '@/utils/token'

class LoginStore {
  //登陆时调用获取本地存储token或空
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  //设置登陆的方法
  login = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    console.log(res)
    this.token = res.data.token
    // 设置token
    setToken(res.data.token)
  }
  loginOut = () => {
    this.token = ''
    clearToken()
  }
}

const loginStore = new LoginStore()
export default loginStore
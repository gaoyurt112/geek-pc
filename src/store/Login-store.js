import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
class LoginStore {
  token = ''
  constructor() {
    makeAutoObservable(this)
  }
  login = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    console.log(res)
    this.token = res.data.token
  }

}

const loginStore = new LoginStore()
export default loginStore
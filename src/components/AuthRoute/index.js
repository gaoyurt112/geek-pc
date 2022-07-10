import { getToken } from '@/utils/token'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  //接收token变量
  const isToken = getToken()
  //如果token为true
  if (isToken) {
    // 返回子组件
    return <>{children}</>
  } else {
    //重定向登录页
    return <Navigate to='/login'></Navigate>
  }
}

export {
  AuthRoute
}
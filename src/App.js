import Login from "@/pages/Login"
import Layout from "@/pages/Layout"
import Home from "./pages/Home"
import Artical from "./pages/Artical"
import Publish from "./pages/Publish"
import './App.css'
import { HistoryRouter, history } from './utils/history'
//导入路由模块
import { Routes, Route } from 'react-router-dom'
//导入路由鉴权组件
import { AuthRoute } from '@/components/AuthRoute'

function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          {/* 路由鉴权使用自定义组件包裹要跳转的组件 */}
          <Route path='/*' element={
            <AuthRoute>
              <Layout></Layout>
            </AuthRoute>
          }>
            {/* 配置二级路由 index为默认页面*/}
            <Route index element={<Home></Home>}></Route>
            <Route path='artical' element={<Artical></Artical>}></Route>
            <Route path='publish' element={<Publish></Publish>}></Route>
          </Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App

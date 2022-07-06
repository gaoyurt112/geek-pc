import Login from "@/pages/Login"
import Layout from "@/pages/Layout"
//导入路由模块
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App () {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<Layout></Layout>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

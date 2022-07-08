import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//引入antd
import 'antd/dist/antd.min.css'
//引入全局sass
import './index.scss'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)

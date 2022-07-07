import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store/index'
import { useEffect } from 'react'

const { Header, Sider } = Layout

const GeekLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedKeys = location.pathname
  const { userStore, loginStore } = useStore()

  useEffect(() => {
    try {
      userStore.getUserInfo()
    } catch (error) {

    }
  }, [userStore])

  const onlogOut = () => {
    loginStore.loginOut()
    navigate('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onlogOut}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[selectedKeys]}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '/',
                icon: <HomeOutlined />,
                label: '数据概览',
                // 点击跳转页面
                onClick: () => { navigate('/') }
              }, {
                key: '/artical',
                icon: <DiffOutlined />,
                label: '内容管理',
                onClick: () => { navigate('artical') }
              }, {
                key: '/publish',
                icon: <EditOutlined />,
                label: '发布文章',
                onClick: () => { navigate('publish') }
              }
            ]}
          >

          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由默认页面 */}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)
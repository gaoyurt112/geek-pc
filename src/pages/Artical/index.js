import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { values } from 'mobx'

const { Option } = Select
const { RangePicker } = DatePicker


const Article = () => {
  //频道列表数据管理
  const [channel, setChannels] = useState([])
  // console.log(channel);

  //文章列表数据管理
  const [artical, setArticalList] = useState({
    list: [],
    count: 0
  })
  console.log(artical.list)

  //参数管理
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })

  //页面渲染时获取频道数据
  useEffect(() => {
    async function getChannels () {
      const res = await http.get('/channels')
      setChannels(res.data.channels)
    }
    getChannels()
  }, [])

  //发送获取列表请求
  useEffect(() => {
    async function getArticalList () {
      const res = await http.get('/mp/articles', { params })
      // console.log(res)
      setArticalList({
        list: res.data.results,
        count: res.data.total_count
      })
    }
    getArticalList()
  }, [params])

  //筛选功能调教表单
  const onSearch = values => {
    const { status, channel_id, date } = values
    //格式化表单数据
    const _params = {}
    //格式化status
    _params.status = status
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    // 修改params参数 触发接口再次发起
    setParams({
      ...params,
      ..._params
    })
  }


  //分页功能实现
  const pageChange = (page) => {
    // 拿到当前页参数 修改params 引起接口更新
    setParams({
      ...params,
      page
    })
  }


  //列表区域列
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      {/* 筛选区域结构 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        {/* https://blog.csdn.net/qq_43690438/article/details/110523203 解决下拉框默认值报错问题*/}
        <Form
          onFinish={onSearch}
          initialValues={{ status: -1, channel_id: '选择频道' }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {/* 遍历频道数据添加下拉选项 */}
              {channel.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域结构 */}
      <Card title={`根据筛选条件共查询到 ${artical.count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={artical.list} pagination={{
          position: ['bottomCenter'],
          current: params.page,
          pageSize: params.per_page,
          onChange: pageChange
        }} />
      </Card>
    </div>
  )
}

export default Article
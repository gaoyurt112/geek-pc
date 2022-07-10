import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import './index.scss'
//引入富文本编辑器组件以及样式文件
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState, useRef } from 'react'
import { http } from '@/utils'


const { Option } = Select

const Publish = () => {
  const [channels, setChannels] = useState([])
  //设置存储图片上传的数据状态
  const [fileList, setFileList] = useState([])

  const [maxCount, setMaxCount] = useState(1)

  //暂存图片列表实现
  //声明一个暂存仓库
  const fileListRef = useRef([])

  // 图片上传成功回调
  const onUploadChange = info => {
    //遍历数据，将图片的url存储
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    // console.log(info)
    setFileList(fileList)

    //上传图片时，将所有图片存储到 ref 中
    fileListRef.current = fileList
  }



  //切换图片的上传的类型，单图三图无图 传入参数e
  const changeType = (e) => {
    //e.target.value为0，1，2
    const count = e.target.value
    //设置count属性
    setMaxCount(count)
    //单图只显示一张图
    if (count === 1) {
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      //三图展示所有图片
      setFileList(fileListRef.current)
    }

  }

  //编辑文案文案适配
  const [params] = useSearchParams()
  const articleId = params.get('id')

  //获取频道列表
  useEffect(() => {
    async function fetchChannels () {
      const res = await http.get('/channels')
      setChannels(res.data.channels)
    }
    fetchChannels()
  }, [])

  //编辑文章-回显Form
  //获取form组件实例
  const form = useRef(null)
  useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/mp/articles/${articleId}`)
      const { cover, ...formValue } = res.data
      // 动态设置表单数据
      form.current.setFieldsValue({ ...formValue, type: cover.type })
      // 格式化封面图片数据
      const imageList = cover.images.map(url => ({ url }))
      setFileList(imageList)
      setMaxCount(cover.type)
      fileListRef.current = imageList
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
  }, [articleId])

  /*
  {
     channel_id: 1
     content: "<p>测试</p>"
     cover: {
        type: 1, 
        images: ["http://geek.itheima.net/uploads/1647066600515.png"]
     },
     type: 1
     title: "测试文章"
  }
  */
  //提交数据的方法
  const navigate = useNavigate()
  const onFinish = async (values) => {
    //整理数据
    const { channel_id, content, title, type } = values
    //整理参数
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.response.data.url)
      }
    }
    if (articleId) {
      // 编辑
      await http.put(`/mp/articles/${articleId}?draft=false`, params)
    } else {
      // 新增
      await http.post('/mp/articles?draft=false', params)
    }
    navigate('/artical')
    message.success(`${articleId ? '修改成功' : '发布成功'}`)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? '修改文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ content: '', type: 1 }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channels.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType} name="type">
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {maxCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                onChange={onUploadChange}
                multiple={maxCount > 1}
                //控制最大上传数跟随maxcount属性
                maxCount={maxCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit" >
                {articleId ? '修改文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()
  //表单提交成功回调
  const onFinish = async (values) => {
    console.log('Success:', values)
    //values:放置的是所有表单项中用户输入的内容
    //todo:登录
    const { mobile, code } = values
    try {
      await loginStore.login({ mobile, code })
      navigate('/')
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }
  //表单提交失败回调
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{ remember: true }}
          //表单验证时机
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="mobile"
            rules={[
              // 手机号验证规则
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                //验证时机失去焦点
                validateTrigger: 'onBlur'
              },
              //必填规则
              {
                required: true,
                message: '请输入手机号!',
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              // 验证码校验规则 6个字符 失去焦点自动验证
              { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
              //必填校验
              {
                required: true,
                message: '请输入验证码!',
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            {/* <!-- 渲染Button组件为submit按钮 --> */}
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
import { Form, Input, Button } from 'antd'
import React from 'react'

type Props = {
  onFinish: (v: {  userName: string, userAddress: string }) => void
}

const SearchForm: React.FC<Props> = (props) => {
  const { onFinish } = props

  return (
    <Form
      layout='inline'
      style={{
        marginBottom:'16px',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='userName'
      >
        <Input
          placeholder='请输入姓名'
          allowClear
        />
      </Form.Item>

      <Form.Item
        name='userAddress'
      >
        <Input
          placeholder='请输入地区'
          allowClear
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>搜索</Button>
      </Form.Item>
    </Form>
  )
}

export default SearchForm

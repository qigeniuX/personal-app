import { Form, Input } from "antd"
import React from "react"

export interface FormValue {
  taskName?: string
}

interface Props {
  onCreate: (value: FormValue) => void
}

const CreateForm: React.FC<Props> = (props) => {
  const { onCreate } = props

  const [form] = Form.useForm<FormValue>()

  const handleSearch = () => {
    onCreate(form.getFieldsValue())
    form.setFieldValue('taskName', '')
  }

  return (
    <Form form={form} layout="inline">
      <Form.Item name='taskName'>
        <Input.Search
          placeholder="请输入今日任务" 
          enterButton='点我加数据'
          onSearch={handleSearch}
          allowClear
        />
      </Form.Item>
    </Form>
  )
}

export default CreateForm

import { Button, Drawer, Form, Input, Space } from "antd"
import React, { useState } from "react"

interface Props {
  onSave: (value : DrawerFormValue) => void,
  isVisible: boolean
}

export interface DrawerFormValue {
  inputValue?: string
}

const ModifyDrawer : React.FC<Props>= (props) => {

  const { onSave, isVisible } = props

  const handleOnclickSaveButton = () => {
    onSave(form.getFieldsValue())
  }

  const [form] = Form.useForm<DrawerFormValue>()

  return(
    <Drawer
      title="修改任务"
      width={500}
      visible={isVisible}
      extra={
        <Space>
          <Button onClick={handleOnclickSaveButton}>
            保存
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
      >
        <Form.Item
          name='inputValue'
			 	>
          <Input
					  style={{width:'100%'}}
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default ModifyDrawer


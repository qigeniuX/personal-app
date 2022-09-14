import { Button, Drawer, Form, Input, DatePicker } from "antd"
import { FieldData } from "rc-field-form/es/interface"
import React, { useEffect, useState } from "react"
import { UnfinishedTask } from "../UnfinishedTable"

interface Props {
  closeDrawer: () => void
  onChange: (changedField: FieldData) => void
  isVisible: boolean
  taskValue?: UnfinishedTask
}

export interface DrawerFormValue {
  inputValue?: string
}

const ModifyDrawer : React.FC<Props>= (props) => {
  const { onChange, closeDrawer, isVisible, taskValue } = props

  const [form] = Form.useForm<DrawerFormValue>()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const handleFormInputChange = (changedFields: FieldData[]) => {
    if ( changedFields.length !== 1 )
      throw Error('修改的值数目不为1个')

    onChange(changedFields[0])
  }

  useEffect(() => {
    // 不加的话form会在绑定之前就被调用 然后报warning
    if ( taskValue ) {
      form.setFieldValue('taskValue', taskValue?.theTask)
      form.setFieldValue('deadline',taskValue?.deadline)
    }
  }, [taskValue])

  return(
    <Drawer
      title="修改任务"
      width={500}
      visible={isVisible}
      onClose={handleCloseDrawer}
    >
      <Form
        form={form}
        onFieldsChange={handleFormInputChange}
      >
        <Form.Item
          name='taskValue'
          label='任务内容'
			 	>
          <Input
					  style={{width:'100%'}}
          />
        </Form.Item>

        <Form.Item
          name='deadline'
          label='完成时间'
        >
          <DatePicker
            showTime
          />
        </Form.Item>

      </Form>
    </Drawer>
  )
}

export default ModifyDrawer


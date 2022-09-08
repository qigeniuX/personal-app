import { Button, Drawer, Form, Input, Space } from "antd"
import { FieldData } from "rc-field-form/es/interface"
import React, { useEffect, useState } from "react"
import { TaskDataValue } from "../UnfinishedTable"

interface Props {
  onSave: (value : DrawerFormValue) => void,
  closeDrawer: () => void
  onChange: (changedFields: unknown) => void
  isVisible: boolean
  taskValue?: TaskDataValue
}

export interface DrawerFormValue {
  inputValue?: string
}

const ModifyDrawer : React.FC<Props>= (props) => {
  const { onChange, onSave, closeDrawer, isVisible, taskValue } = props

  const [form] = Form.useForm<DrawerFormValue>()

  const handleOnclickSaveButton = () => {
    onSave(form.getFieldsValue())
  }

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
    if ( taskValue )
      form.setFieldValue('taskValue', taskValue?.theTask)
  }, [taskValue])

  return(
    <Drawer
      title="修改任务"
      width={500}
      visible={isVisible}
      onClose={handleCloseDrawer}
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
      </Form>
    </Drawer>
  )
}

export default ModifyDrawer


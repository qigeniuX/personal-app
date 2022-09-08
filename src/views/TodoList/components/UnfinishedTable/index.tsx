import { Button, Drawer, Input, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import React from "react"

export interface TaskDataValue {
  key?: string,
  theTask?: string,
  theTime?: string,
  state?: string,
  actions?: any, 
}

interface Props {
  taskData: TaskDataValue[]
  onDelete: (index: number) => void
  onComplete: (index: number) => void
  onModify:(index: number, record: TaskDataValue) => void
}

const UnfinishedTable: React.FC<Props> = (props) => {
  const { taskData, onDelete, onComplete, onModify } = props

  const newTaskColumns : ColumnsType<TaskDataValue> = [
    {
      title: '未完成任务',
      dataIndex: 'theTask',
      key: 'theTask',
      width: '30%',
      ellipsis: true,
      render: (text: string) => (
        <div style={{
          maxWidth: 270,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
          {text}
        </div>
      ), 
    },
    {
      title: '添加时间',
      dataIndex: 'theTime',
      key: 'theTime',
      width: '15%',
    },
    {
      title: '来自',
      dataIndex: 'state',
      key: 'state',
      width: '10%',
    },
    {
      title: '操作',
      key: 'actions',
      width: '25%',
      // 在不做条件的情况下，直接渲染Drawer 和 Button，点开抽屉 遮罩区不透明  我直接懂又不懂
      render:(_text, record, index) => (
        <>
          { 
            <>
              <Button onClick={() => handleModifyButtonClick(index, record)}>修改</Button>
              <Button danger onClick={() => handleClickDeleteButton(index)}>删除</Button>
              <Button type="primary" onClick={() => handleClickFinishedButton(index)}>完成</Button> 
            </>
          }
        </>
      ),
    },
  ]
  
  const handleClickDeleteButton = (index : number) => {
    onDelete(index)
  }

  const handleClickFinishedButton = (index : number) => {
    onComplete(index)
  }

  const handleModifyButtonClick = (index: number, record: TaskDataValue) => {
    onModify(index, record)
  }

  return (
    <Table
      columns={newTaskColumns}
      dataSource={taskData}
    />
  )
}

export default UnfinishedTable

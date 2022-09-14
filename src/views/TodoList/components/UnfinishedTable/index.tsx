import { Button, Drawer, Input, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment, { Moment } from "moment"
import React from "react"

export interface UnfinishedTask {
  // TODO: 检查代码 把问号去掉
  key?: string,
  // TODO: 检查代码 把问号去掉
  theTask?: string,
  theTime?: string,
  deadline?: Moment,
  state?: string,
  // TODO: 检查并删除
  actions?: any, 
}

interface Props {
  taskData: UnfinishedTask[]
  onDelete: (index: number) => void
  onComplete: (index: number) => void
  onModify:(index: number, record: UnfinishedTask) => void
}

const UnfinishedTable: React.FC<Props> = (props) => {
  const { taskData, onDelete, onComplete, onModify } = props

  const newTaskColumns : ColumnsType<UnfinishedTask> = [
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
      title: '完成时间',
      dataIndex: 'deadline',
      key: 'deadline',
      width: '15%',
      render: (value?: Moment) =>{ 
        return (
          <div>
            {value?.format('YYYY-MM-DD HH:mm:ss').toLocaleString() ?? '-'}
          </div>
        )},
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

  const handleModifyButtonClick = (index: number, record: UnfinishedTask) => {
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

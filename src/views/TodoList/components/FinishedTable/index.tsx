import { Button, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import React, { useEffect, useState } from "react"

interface Props {
  finishedTaskData: FinishedTaskDataValue[],
  onRevoke: (index: number) => void
}

export interface FinishedTaskDataValue {
  key?: string,
  theTask?: string,
  theTime?: string,
  state?: string,
  actions?: any, 
}

const FinishedTable : React.FC<Props> = (props) => {

  const { finishedTaskData, onRevoke } = props
  
  // const [finishedTaskData, setFinishedTaskData] = useState<any[]>([])
  
  const finishedTaskColumns : ColumnsType<FinishedTaskDataValue> = [
    {
      title: '已完成任务',
      dataIndex: 'theTask',
      key: 'theTask',
      ellipsis: true,
      width: '30%',
      render: (text :string) => <span style={{ textDecoration: 'line-through' }}>{text}</span>,
    },
    {
      title: '完成时间',
      dataIndex: 'theTime',
      width: '15%',
      key: 'theTime',
    },
    {
      title: '操作',
      key: 'actions',
      width: '25%',
      render:(text:any, record:any, index:number) => (
        <>
          <Button onClick={() => handleClickRevokeButton(index)}>撤销</Button>
        </>
      ),
    },
  ]

  const handleClickRevokeButton = (index : number) => {
    onRevoke(index)
  }

  // useEffect(() => {
  //   if ( localStorage.getItem('todo_list__finished_tasks') === null )
  //     localStorage.setItem('todo_list__finished_tasks', '[]')
      
  //   setFinishedTaskData(JSON.parse(localStorage.getItem('todo_list__finished_tasks')!) as string[])
  // }, [])
  
  return (
    <Table
      columns={finishedTaskColumns} 
      dataSource={finishedTaskData}
    />
  )
}

export default FinishedTable

import { Button, Table } from "antd"
import React, { useEffect, useState } from "react"

const FinishedTable = () => {
  
  const [finishedTaskData, setFinishedTaskData] = useState<any[]>([])
  
  const finishedTaskColumns = [
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

  const handleClickRevokeButton = (index : number) => {}

  useEffect(() => {
    if ( localStorage.getItem('todo_list__finished_tasks') === null )
      localStorage.setItem('todo_list__finished_tasks', '[]')
      
    setFinishedTaskData(JSON.parse(localStorage.getItem('todo_list__finished_tasks')!) as string[])
  }, [])
  
  return (
    <Table
      columns={finishedTaskColumns} 
      dataSource={finishedTaskData}
    />
  )
}

export default FinishedTable

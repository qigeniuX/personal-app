import { Button, Drawer, Input, Table } from "antd"
import React, { useEffect, useState } from "react"

interface Props {
  // TODO: 正确化这里的类型
  taskData: unknown[]
}

// interface taskDataValue {
//   theTask?: string,
//   theTime?: string,
//   state?: string,
//   actions?: any, 
// }

const UnfinishedTable: React.FC<Props> = (props) => {
  const { taskData } = props
  
  const newTaskColumns = [
    {
      title: '未完成任务',
      dataIndex: 'theTask',
      key: 'theTask',
      width: '30%',
      ellipsis: true,
      render: (text:any, record: any, index: number) => (
        <div style={{
          maxWidth: 270,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }
        }
        >{text}</div>
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
      render:(text:any, record: any, index: number) => (
        <>
          { 
            <>
              {/* <Drawer
                title="Task修改"
                width={500}
                visible={drawerVisible}
                onClose={() => handleDrawerClose(index)}
                mask={false}
              >
                <Input
                  value={modifyInputValue}
                  onChange={(e) => {setModifyInputValue(e.target.value)}}
                />
              </Drawer> */}
              <Button onClick={() => handleModifyButtonClick(index, record)}>修改</Button>
              <Button danger onClick={() => handleClickDeleteButton(index)}>删除</Button>
              <Button type="primary" onClick={() => handleClickFinishedButton(index)}>完成</Button> 
            </>
          }
        </>
      ),
    },
  ]
  
  const handleClickDeleteButton = (index : number) => {}

  const handleClickFinishedButton = (index : number) => {}

  const handleModifyButtonClick = (index: number, record: any) => {
    // setModifyInputValue(taskData[index].theTask)
    // setDrawerVisible(true)
    // setCurrentEditingDatumIndex(index)

    // const newData = [...taskData]
    
    // setTaskData(newData)

    // const dataForSave = cloneDeep(newData)
    
    // localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  }
  return (
    <>
      <Table
        columns={newTaskColumns}
        dataSource={taskData}
      />

      <Drawer
        title="Task修改"
        width={500}
        // visible={drawerVisible}
        mask={false}
        // onClose={handleDrawerClose}
      >
        <Input 
          // value={modifyInputValue}
          // onChange={(e) => {setModifyInputValue(e.target.value)}}
        />
      </Drawer>
    </>
  )
}

export default UnfinishedTable

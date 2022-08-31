import { Layout, Table, Button, Input, Card, DatePicker, Drawer  } from "antd"
import { Content,  Header } from "antd/lib/layout/layout"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { add, cloneDeep } from 'lodash-es'
import './index.css'
import CreateForm, { FormValue } from "./components/CreateForm"
import UnfinishedTable from "./components/UnfinishedTable"
import FinishedTable from "./components/FinishedTable"

// TODO: 添加一个“上次修改时间” 修改后展示修改成功的时间 如果是添加或者撤回则显示添加或者撤回时间 
// TODO: 抽屉内添加一个保存按钮，点击确认所有改动。其他方式关闭抽屉则视为取消。
// TODO: 添加一个deadline功能，在用户添加未完成任务，点击修改，右侧抽屉处，添加一个datepicker用于记录deadline时间，在deadline前6小时内，所对应的任务栏标黄
// TODO: 完善抽屉内各个功能的描述
// TODO: 给card添加一个清空内容的功能
 
// 比较拓展的TODO
// TODO: 添加一个card 里面是快捷任务 点一下就可以进入未完成任务 输入input右边增加一个按钮（添加快捷任务） 点击后会进入card  done
// TODO: 添加一个输入框 输入任务的期望完成时间 分两种 1. 时间跨度 （如 下周一 ~ 下周日） 2. 时间到期 （如24小时之后到期）
// TODO: 提前完成需求的展示 未完成需求的展示
// TODO: 完善日常任务(card)功能

// TODO: 添加类型
const TodoList = () => {
  // TODO: 类型
  const [unfinishedTaskData, setUnfinishedTaskData] = useState<unknown[]>([])
  // const [finishedTaskData, setFinishedTaskData] = useState<any[]>([])
  // const [inputValue, setInputValue] = useState<string>('')
  // const [modifyInputValue, setModifyInputValue] = useState<string>('')
  // const [cardValue, setCardValue] = useState<string>('点我添加日常任务')
  // const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
  // const [currentEditingDatumIndex, setCurrentEditingDatumIndex] = useState<number>(-1)

  // // const newTaskColumns = [
  // //   {
  // //     title: '未完成任务',
  // //     dataIndex: 'theTask',
  // //     key: 'theTask',
  // //     width: '30%',
  // //     ellipsis: true,
  // //     render: (text:any, record: any, index: number) => (
  // //       <div style={{
  // //         maxWidth: 270,
  // //         overflow: 'hidden',
  // //         whiteSpace: 'nowrap',
  // //         textOverflow: 'ellipsis',
  // //       }
  // //       }
  // //       >{text}</div>
  // //     ), 
  // //   },
  // //   {
  // //     title: '添加时间',
  // //     dataIndex: 'theTime',
  // //     key: 'theTime',
  // //     width: '15%',
  // //   },
  // //   {
  // //     title: '来自',
  // //     dataIndex: 'state',
  // //     key: 'state',
  // //     width: '10%',
  // //   },
  // //   {
  // //     title: '操作',
  // //     key: 'actions',
  // //     width: '25%',
  // //     // 在不做条件的情况下，直接渲染Drawer 和 Button，点开抽屉 遮罩区不透明  我直接懂又不懂
  // //     render:(text:any, record: any, index: number) => (
  // //       <>
  // //         { 
  // //           <>
  // //             {/* <Drawer
  // //               title="Task修改"
  // //               width={500}
  // //               visible={drawerVisible}
  // //               onClose={() => handleDrawerClose(index)}
  // //               mask={false}
  // //             >
  // //               <Input
  // //                 value={modifyInputValue}
  // //                 onChange={(e) => {setModifyInputValue(e.target.value)}}
  // //               />
  // //             </Drawer> */}
  // //             <Button onClick={() => handleModifyButtonClick(index, record)}>修改</Button>
  // //             <Button danger onClick={() => handleClickDeleteButton(index)}>删除</Button>
  // //             <Button type="primary" onClick={() => handleClickFinishedButton(index)}>完成</Button> 
  // //           </>
  // //         }
  // //       </>
  // //     ),
  // //   },
  // // ]

  // // TODO: 添加类型
  // // const finishedTaskColumns = [
  // //   {
  // //     title: '已完成任务',
  // //     dataIndex: 'theTask',
  // //     key: 'theTask',
  // //     ellipsis: true,
  // //     width: '30%',
  // //     render: (text :string) => <span style={{ textDecoration: 'line-through' }}>{text}</span>,
  // //   },
  // //   {
  // //     title: '完成时间',
  // //     dataIndex: 'theTime',
  // //     width: '15%',
  // //     key: 'theTime',
  // //   },
  // //   {
  // //     title: '操作',
  // //     key: 'actions',
  // //     width: '25%',
  // //     render:(text:any, record:any, index:number) => (
  // //       <>
  // //         <Button onClick={() => handleClickRevokeButton(index)}>撤销</Button>
  // //       </>
  // //     ),
  // //   },
  // // ]

  // const handleClickFinishedButton = (index : number) => {
  //   const newData = [...taskData]
  //   const addFinData = newData.splice(index,1)
  //   const finData = [...finishedTaskData]
  
  //   addFinData[0].theTime = moment().format('YYYY-MM-DD HH:mm:ss')
  //   finData.push(...addFinData)

  //   setFinishedTaskData(finData)
  //   setTaskData(newData)
  //   const dataForSave = cloneDeep(newData)
    
  //   localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  //   localStorage.setItem('todo_list__finished_tasks', JSON.stringify(finData))
  // }

  // const handleClickRevokeButton = (index : number) => {
  //   const newData = [...taskData]
  //   const finData = [...finishedTaskData]
  //   const revokeData = finData.splice(index,1)
  //   revokeData[0].theTime = moment().format('YYYY-MM-DD HH:mm:ss')
  //   revokeData[0].state = "撤回"

  //   newData.push(...revokeData)

  //   setFinishedTaskData(finData)
  //   setTaskData(newData)

  //   const dataForSave = cloneDeep(newData)
    
  //   localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  //   localStorage.setItem('todo_list__finished_tasks', JSON.stringify(finData))
  // }

  // const handleClickDeleteButton = (index : number) => {
  //   const deleteData = [...taskData]
  //   deleteData.splice(index,1)
		
  //   setTaskData(deleteData)

  //   const dataForSave = cloneDeep(deleteData)
    
  //   localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  // }

  // const handleModifyButtonClick = (index: number, record: any) => {
  //   setModifyInputValue(taskData[index].theTask)
  //   setDrawerVisible(true)
  //   setCurrentEditingDatumIndex(index)

  //   const newData = [...taskData]
    
  //   setTaskData(newData)

  //   const dataForSave = cloneDeep(newData)
    
  //   localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  // }

  // const handleAddCardTaskButton = () => {
  //   setCardValue(inputValue)

  //   localStorage.setItem('daily_card_task',inputValue)
  // }

  // const handleCardClick = () => { 
  //   if (cardValue === '') {return}

  //   const newTask = [...taskData]
		
  //   const theKey = uuidv4()
		
  //   newTask.push({
  //     key: theKey,
  //     theTask: cardValue,
  //     state: '日常任务',
  //     theTime: moment().format('YYYY-MM-DD HH:mm:ss'),
  //   })

  //   const dataForSave = cloneDeep(newTask)

  //   setTaskData(newTask)

  //   localStorage.setItem('daily_card_task',cardValue)
  //   localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  // }

  // const handleDrawerClose = () => {
  //   const newTask = cloneDeep(taskData)
  //   newTask[currentEditingDatumIndex].theTask = modifyInputValue

  //   setTaskData(newTask)        
  //   setDrawerVisible(false)

  //   localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(newTask))
  // }

  
  // // TODO: 添加类型
  // const addDatum = (value: any) => {
  // if (value === '') { return }

  // const addTaskData: any[] = [...taskData]
  // const theKey = uuidv4()
		
  // addTaskData.push({
  //   key: theKey,
  //   theTask: value,
  //   state: '新增',
  //   theTime: moment().format('YYYY-MM-DD HH:mm:ss'),

  // })

  //   setTaskData(addTaskData)
  //   setInputValue('')

  //   const dataForSave = cloneDeep(addTaskData)

  //   localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  // }

  // const handleInputSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  //   if ((e.nativeEvent as any).data === undefined) {
  //     setInputValue('')

  //     return
  //   }

  //   setInputValue(e.target.value)
  // }

  // useEffect(() => {
  //   if ( localStorage.getItem('todo_list__unfinished_tasks') === null )
  //     localStorage.setItem('todo_list__unfinished_tasks', '[]')
    
  //   if ( localStorage.getItem('todo_list__finished_tasks') === null )
  //     localStorage.setItem('todo_list__finished_tasks', '[]')

  //   if ( localStorage.getItem('daily_card_task') === null )
  //     localStorage.setItem('daily_card_task', '')

  //   setTaskData(JSON.parse(localStorage.getItem('todo_list__unfinished_tasks')!) as string[])
  //   setFinishedTaskData(JSON.parse(localStorage.getItem('todo_list__finished_tasks')!) as string[])
  //   setCardValue(localStorage.getItem('daily_card_task')!)
  // }, [])

  const handleCreateFormCreate = (value: FormValue) => {
    if (value === '') { return }

    const addTaskData: any[] = [...unfinishedTaskData]
    const theKey = uuidv4()
		
    addTaskData.push({
      key: theKey,
      theTask: value.taskName,
      state: '新增',
      theTime: moment().format('YYYY-MM-DD HH:mm:ss'),

    })

    setUnfinishedTaskData(addTaskData)

    
    // 改数据 
    // 把改好的数据传给unfinishedtable
  }

  // TODO: 类型
  const taskData : unknown[] = unfinishedTaskData

  useEffect(() => {
    if ( localStorage.getItem('todo_list__unfinished_tasks') === null )
      localStorage.setItem('todo_list__unfinished_tasks', '[]')
    
    // TODO: 类型
    setUnfinishedTaskData(JSON.parse(localStorage.getItem('todo_list__unfinished_tasks')!) as unknown[])
  }, [])

  return (
    <>
      <CreateForm onCreate={handleCreateFormCreate} />

      <UnfinishedTable taskData={taskData} />

      <FinishedTable />

      {/* <Layout>
        <Header style={{
          display: 'flex',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Input.Search
            placeholder="请输入今日任务" 
            enterButton='点我加数据'
            value={inputValue}
            onSearch={addDatum}
            onChange={handleInputSearchChange}
            allowClear
          />
          <Button
            onClick={handleAddCardTaskButton}
          >点我添加为日常任务</Button>
          
        </Header>

        <Layout>
          <Content>
            <Table
              columns={newTaskColumns}
              dataSource={taskData}
              rowClassName={(_, index) => {
                if ( currentEditingDatumIndex >= 0 && drawerVisible && currentEditingDatumIndex === index ) return 'bg-aqua'

                return ''
              }}
            />

            <Drawer
              title="Task修改"
              width={500}
              visible={drawerVisible}
              mask={false}
              onClose={handleDrawerClose}
            >
              <Input 
                value={modifyInputValue}
                onChange={(e) => {setModifyInputValue(e.target.value)}}
              />
            </Drawer>

            <Card 
              style={{width: '250px', margin: '15px'}}
              hoverable={true}
              onClick={handleCardClick}
                
            >
              {cardValue}
            </Card>

            <Table
              columns={finishedTaskColumns} 
              dataSource={finishedTaskData}
            />
          
          </Content>
        </Layout>
      </Layout> */}
    </>
  )
}

export default TodoList

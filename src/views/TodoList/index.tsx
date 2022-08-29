import { Layout, Table, Button, Input, Card, DatePicker } from "antd"
import { Content,  Header } from "antd/lib/layout/layout"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'

// TODO: 添加一个状态 （仅仅是新任务list）表示是新增的还是撤回的 done
// TODO: 添加一个“上次修改时间” 修改后展示修改成功的时间 如果是添加或者撤回则显示添加或者撤回时间 
 
// 比较拓展的TODO
// TODO: 添加一个card 里面是快捷任务 点一下就可以进入未完成任务 输入input右边增加一个按钮（添加快捷任务） 点击后会进入card  done
// TODO: 添加一个输入框 输入任务的期望完成时间 分两种 1. 时间跨度 （如 下周一 ~ 下周日） 2. 时间到期 （如24小时之后到期）
// TODO: 提前完成需求的展示 未完成需求的展示

// TODO: 添加类型
const TodoList = () => {
  const [taskData, setTaskData] = useState<any[]>([])
  const [finishedTaskData, setFinishedTaskData] = useState<any[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [modifyInputValue, setModifyInputValue] = useState<string>('')
  const [cardValue, setCardValue] = useState<string>('点我添加日常任务')

  const newTaskColumns = [
    {
      title: '未完成任务',
      dataIndex: 'theTask',
      key: 'theTask',
      width: '30%',
      ellipsis: true,
      render: (text:any, record: any, index: number) => (
        record.isEditing ?
          <Input 
            defaultValue={text} 
            value={modifyInputValue} 
            onChange={(e) => setModifyInputValue(e.target.value)}
          /> :
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
      render:(text:any, record:any, index: number) => (
        <>
          {
            record.isEditing ? (
              <>
                <Button type="primary" onClick={() => handleCompleteButtonClick(index)}>完成修改</Button> 
                <Button onClick={() => {handleCancelButtonClick(index)}}>取消</Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleModifyButtonClick(index)}>修改</Button>
                <Button danger onClick={() => handleClickDeleteButton(index)}>删除</Button>
                <Button type="primary" onClick={() => handleClickFinishedButton(index)}>完成</Button> 
              </>
            )
          }
        </>
      ),
    },
  ]

  // TODO: 添加类型
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

  const handleClickFinishedButton = (index : number) => {
    const newData = [...taskData]
    const addFinData = newData.splice(index,1)
    const finData = [...finishedTaskData]
  
    addFinData[0].theTime = moment().format('YYYY-MM-DD HH:mm:ss')
    finData.push(...addFinData)

    setFinishedTaskData(finData)
    setTaskData(newData)
    const dataForSave = cloneDeep(newData)
    dataForSave.forEach((ele) => {
      delete ele.isEditing
    })
    
    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
    localStorage.setItem('todo_list__finished_tasks', JSON.stringify(finData))
  }

  const handleClickRevokeButton = (index : number) => {
    const newData = [...taskData]
    const finData = [...finishedTaskData]
    const revokeData = finData.splice(index,1)
    revokeData[0].theTime = moment().format('YYYY-MM-DD HH:mm:ss')
    revokeData[0].state = "撤回"

    newData.push(...revokeData)

    setFinishedTaskData(finData)
    setTaskData(newData)

    const dataForSave = cloneDeep(newData)
    dataForSave.forEach((ele) => {
      delete ele.isEditing
    })
    
    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
    localStorage.setItem('todo_list__finished_tasks', JSON.stringify(finData))
  }

  const handleClickDeleteButton = (index : number) => {
    const deleteData = [...taskData]
    deleteData.splice(index,1)
		
    setTaskData(deleteData)

    const dataForSave = cloneDeep(deleteData)
    dataForSave.forEach((ele) => {
      delete ele.isEditing
    })
    
    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  }

  const handleModifyButtonClick = (index: number) => {
    setModifyInputValue(taskData[index].theTask)

    const newData = [...taskData]
    newData[index].isEditing = true
    
    setTaskData(newData)

    const dataForSave = cloneDeep(newData)
    dataForSave.forEach((ele) => {
      delete ele.isEditing
    })
    
    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  }

  const handleCompleteButtonClick = (index: number) => {
    const newData = [...taskData]
    newData[index].isEditing = false
    newData[index].theTask = modifyInputValue
    newData[index].state = '修改'

    setTaskData(newData)

    const dataForSave = cloneDeep(newData)
    dataForSave.forEach((ele) => {
      delete ele.isEditing
    })
    
    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  }

  const handleCancelButtonClick = (index: number) => {
    const newData = [...taskData]
    newData[index].isEditing = false

    setTaskData(newData)

    const dataForSave = cloneDeep(newData)
    dataForSave.forEach((ele) => {
      delete ele.isEditing
    })

    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))

  }

  const handleAddCardTaskButton = () => {
    setCardValue(inputValue)

    localStorage.setItem('daily_card_task',inputValue)
  }

  const handleCardClick = () => { 
    if (cardValue === '') {return}

    const newTask = [...taskData]
		
    const theKey = uuidv4()
		
    newTask.push({
      key: theKey,
      theTask: cardValue,
      state: '日常任务',
      theTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    const dataForSave = cloneDeep(newTask)
    dataForSave.forEach((ele) => {
      delete ele.isEditing
    })

    setTaskData(newTask)

    localStorage.setItem('daily_card_task',cardValue)
    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  }
  
  // TODO: 添加类型
  const addDatum = (value: any) => {
    if (value === '') { return }

    const addTaskData: any[] = [...taskData]
    const theKey = uuidv4()
		
    addTaskData.push({
      key: theKey,
      theTask: value,
      state: '新增',
      theTime: moment().format('YYYY-MM-DD HH:mm:ss'),

    })

    setTaskData(addTaskData)
    setInputValue('')

    const dataForSave = cloneDeep(addTaskData)
    dataForSave.forEach((ele) => {
      delete ele.isEditing
    })

    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(dataForSave))
  }

  const handleInputSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if ((e.nativeEvent as any).data === undefined) {
      setInputValue('')

      return
    }

    setInputValue(e.target.value)
  }

  useEffect(() => {
    if ( localStorage.getItem('todo_list__unfinished_tasks') === null )
      localStorage.setItem('todo_list__unfinished_tasks', '[]')
    
    if ( localStorage.getItem('todo_list__finished_tasks') === null )
      localStorage.setItem('todo_list__finished_tasks', '[]')

    if ( localStorage.getItem('daily_card_task') === null )
      localStorage.setItem('daily_card_task', '')

    setTaskData(JSON.parse(localStorage.getItem('todo_list__unfinished_tasks')!) as string[])
    setFinishedTaskData(JSON.parse(localStorage.getItem('todo_list__finished_tasks')!) as string[])
    setCardValue(localStorage.getItem('daily_card_task')!)
  }, [])

  return (
    <Layout>
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
          <Table columns={newTaskColumns} dataSource={taskData} />
          <Card 
            style={{width: '250px', margin: '15px'}}
            hoverable={true}
            onClick={handleCardClick}
							
          >{cardValue}</Card>
          <Table
            columns={finishedTaskColumns} 
						  dataSource={finishedTaskData} 
            // onRow={record => {
            // 	return {
            // 		onMouseEnter: onMouseEnterEvent => {}
            // 	}}
            // }
          />
        </Content>
			
      </Layout>
    </Layout>
  )
}

export default TodoList
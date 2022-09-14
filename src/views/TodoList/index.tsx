import moment from "moment"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { add, cloneDeep } from 'lodash-es'
import './index.css'
import CreateForm, { FormValue } from "./components/CreateForm"
import UnfinishedTable, { UnfinishedTask } from "./components/UnfinishedTable"
import FinishedTable, { FinishedTaskDataValue } from "./components/FinishedTable"
import ModifyDrawer, { DrawerFormValue } from "./components/ModifyDrawer"
import { FieldData } from "rc-field-form/es/interface"
import ExpiredList from "./components/ExpiredList"
import { format } from "path"

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
interface UnfinishedTaskDatumForStorage {
  key: string,
  taskName: string,
  addTime: number,
  expectedExpiredTime?: number,
  origin: string,
}
// TODO: 完成它
const getUnfinishedTaskData = () => {
  const unfinishedTaskDataForStorage = JSON.parse(localStorage.getItem('todo_list__unfinished_tasks') || '[]') as UnfinishedTaskDatumForStorage[]

  const result: UnfinishedTask[] = []

  for ( let i = 0; i < unfinishedTaskDataForStorage.length; i++ ) {
    const currentTask = unfinishedTaskDataForStorage[i]
    
    result[i] = {
      key: currentTask.key,
      deadline: currentTask.expectedExpiredTime ? moment.unix(currentTask.expectedExpiredTime) : undefined,
      state: currentTask.origin,
      theTask: currentTask.taskName,
      // TODO: 正确的格式
      theTime: moment.unix(currentTask.addTime).format(),
    }
  }

  return result
}

// TODO: 完成它
const saveUnfinishedTaskData = (taskData: UnfinishedTask[]) => {
  let unfinishedTaskDataForStorage: UnfinishedTaskDatumForStorage[] = []



  localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(unfinishedTaskDataForStorage))
}

const TodoList = () => {
  // TODO: 类型
  const [unfinishedTaskData, setUnfinishedTaskData] = useState<UnfinishedTask[]>([])
  const [finishedTaskData, setFinishedTaskData] = useState<FinishedTaskDataValue[]>([])
  const [modifyTaskIndex, setModifyTaskIndex] = useState<number>(-1)
  const [isModifyDrawerVisible, setIsModifyDrawerVisible] = useState<boolean>(false)
  const [taskValue, setTaskValue] = useState<UnfinishedTask>()
  
  const saveUnfinishedTaskData = (data : UnfinishedTask[]) => {
    const taskData = cloneDeep(data)

    // 1. 遍历taskData里的值
    // 2. 每次遍历时，把taskData中的元素变为number
    // 3. 把变化过的元素替换回taskData相同index处

    // for ( let i = 0; i < taskData.length ; i++ ) {
    //   const timeStamp = moment(taskData[i].deadline).unix()

    //   taskData[i].deadline = timeStamp
    // }

    localStorage.setItem('todo_list__unfinished_tasks',JSON.stringify(data))
  }

  const saveFinishedTaskData = (data : FinishedTaskDataValue[]) => {
  
    localStorage.setItem('todo_list__finished_tasks',JSON.stringify(data))
  }

  const handleCreateFormCreate = (value: FormValue) => {
    if (value === '') { return }
 
    const addTaskData: UnfinishedTask[] = cloneDeep(unfinishedTaskData)
    const theKey = uuidv4()
		
    addTaskData.push({
      key: theKey,
      theTask: value.taskName,
      state: '新增',
      theTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    })

    setUnfinishedTaskData(addTaskData)
    saveUnfinishedTaskData(addTaskData)
  }

  const handleUnfinishedTableDelete = (index: number) => {
    const deleteData = cloneDeep(unfinishedTaskData)
    deleteData.splice(index, 1)
    
    setUnfinishedTaskData(deleteData)
    saveUnfinishedTaskData(deleteData)
  }

  const handleUnfinishedTableComplete = (index : number) => {
    const newData = cloneDeep(unfinishedTaskData)
    const addFinData = newData.splice(index, 1)
    const finData = cloneDeep(finishedTaskData)
  
    addFinData[0].theTime = moment().format('YYYY-MM-DD HH:mm:ss')
    finData.push(...addFinData)

    setFinishedTaskData(finData)
    setUnfinishedTaskData(newData)

    saveFinishedTaskData(finData)
    saveUnfinishedTaskData(newData)
  }

  const handleFinishedTableRevoke = (index : number) => {
    const newData = cloneDeep(unfinishedTaskData)
    const finData = cloneDeep(finishedTaskData)
    const revokeData = finData.splice(index,1)
    revokeData[0].theTime = moment().format('YYYY-MM-DD HH:mm:ss')
    revokeData[0].state = "撤回"

    newData.push(...revokeData)

    setFinishedTaskData(finData)
    setUnfinishedTaskData(newData)

    saveFinishedTaskData(finData)
    saveUnfinishedTaskData(newData)
  }

  const handleUnfinishedTableModify = (index : number, record : any) => {
    setModifyTaskIndex(index)
    // FIXME: 不可以直接set容器类型的值
    setTaskValue(unfinishedTaskData[index])
    setIsModifyDrawerVisible(true)
  }

  // const handleModifyDrawerSave = (value: DrawerFormValue) => {
  //   const newData = cloneDeep(unfinishedTaskData)
  //   newData[modifyTaskIndex].theTask = value.inputValue

  //   setIsModifyDrawerVisible(false)
    
  //   setUnfinishedTaskData(newData)

  //   saveUnfinishedTaskData(newData)
  // }

  const handleDrawerClose = () => {
    setIsModifyDrawerVisible(false)
  }

  const handleDrawerChange = (changedField: FieldData) => {
    const fieldName = (changedField.name as string[])[0]
    if (fieldName === 'taskValue') {
      const taskData = cloneDeep(unfinishedTaskData)
      taskData[modifyTaskIndex].theTask = changedField.value
      setUnfinishedTaskData(taskData)
      return
    }

    if (fieldName === 'deadline') {
      const taskData = cloneDeep(unfinishedTaskData)
      taskData[modifyTaskIndex].deadline = changedField.value
      setUnfinishedTaskData(taskData)
      return
    }
  }

  useEffect(() => {
    if ( localStorage.getItem('todo_list__unfinished_tasks') === null )
      localStorage.setItem('todo_list__unfinished_tasks', '[]')
    
    if (localStorage.getItem('todo_list__finished_tasks') === null )
      localStorage.setItem('todo_list__finished_tasks', '[]')
    // TODO: 类型  
    setUnfinishedTaskData(JSON.parse(localStorage.getItem('todo_list__unfinished_tasks')!) as UnfinishedTask[])
    setFinishedTaskData(JSON.parse(localStorage.getItem('todo_list__finished_tasks')!) as FinishedTaskDataValue[])
  }, [])

  return (
    <>
      <CreateForm onCreate={handleCreateFormCreate} />

      <UnfinishedTable 
        taskData={unfinishedTaskData}
        onDelete={handleUnfinishedTableDelete} 
        onComplete={handleUnfinishedTableComplete}
        onModify={handleUnfinishedTableModify}
      />

      <FinishedTable finishedTaskData={finishedTaskData} onRevoke={handleFinishedTableRevoke}/>

      <ModifyDrawer 
        isVisible={isModifyDrawerVisible} 
        taskValue={taskValue}
        onChange={handleDrawerChange}
        closeDrawer={handleDrawerClose} 
      />

      {/* <ExpiredList /> */}


      {/* <Layout>
        <Header style={{
          display: 'flex',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Input.Search
            placeholder= "请输入今日任务" 
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

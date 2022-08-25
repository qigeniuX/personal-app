import { Layout, Table, Button, Input, Popover } from "antd"
import { Content,  Header } from "antd/lib/layout/layout"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { render } from "react-dom"
import { v4 as uuidv4 } from 'uuid'

// TODO: 解决input不能正确输入中文的bug 
// TODO: 添加一个状态 （仅仅是新任务list）表示是新增的还是撤回的
// TODO: 操作栏添加一个修改按钮 点击后可以修改任务名 table上面的字段直接变成input进行修改 修改按钮变成确认按钮 其余按钮disabled 确认后修改完成 其他按钮复原
// TODO: 添加一个“上次修改时间” 修改后展示修改成功的时间 如果是添加或者撤回则显示添加或者撤回时间

// 比较拓展的TODO
// TODO: 添加一个card 里面是快捷任务 点一下就可以进入未完成任务 输入input右边增加一个按钮（添加快捷任务） 点击后会进入card
// TODO: 添加一个输入框 输入任务的期望完成时间 分两种 1. 时间跨度 （如 下周一 ~ 下周日） 2. 时间到期 （如24小时之后到期）
// TODO: 提前完成需求的展示 未完成需求的展示

// TODO: 添加类型

const TodoList = () => {
	const [taskData, setTaskData] = useState<any[]>([])
	const [finishedTaskData, setFinishedTaskData] = useState<any[]>([])
  const [inputValue, setInputValue] = useState<string>('')

	const newTaskColumns = [
		{
			title: '未完成任务',
			dataIndex: 'theTask',
			key: 'theTask',
      ellipsis: true,
      width: 160,
			// render:(text:any, record:any, index:number) => 
		},
		{
			title: '添加时间',
			dataIndex: 'theTime',
			key: 'theTime',
		},
    {
      title: '来自',
      dataIndex: 'state',
      key: 'state'
    },
		{
			title: '操作',
			key: 'actions',
			render:(text:any, record:any, index:number) => (
				<>
					<Button onClick={() => handleClickFinishedButton(index)}>完成</Button>
					<Button onClick={() => handleClickDeleteButton(index)}>删除</Button>
				</>
			)
		},
	]

  // TODO: 添加类型
	const finishedTaskColumns = [
		{
			title: '已完成任务',
			dataIndex: 'theTask',
			key: 'theTask',
      ellipsis: true,
      width: 160,
      render: (text :string) => <span style={{ textDecoration: 'line-through' }}>{text}</span>
		},
		{
			title: '完成时间',
			dataIndex: 'theTime',
			key: 'theTime'
		},
		{
			title: '操作',
			key: 'actions',
			render:(text:any, record:any, index:number) => (
				<>
					<Button onClick={() => handleClickRevokeButton(index)}>撤销</Button>
				</>
			)
		}
	]

	const handleClickFinishedButton = (index : number) => {
		const newData = [...taskData]
		const addFinData = newData.splice(index,1)
		const finData = [...finishedTaskData]
  
		addFinData[0].theTime = moment().format('YYYY-MM-DD HH:mm:ss')
		finData.push(...addFinData)

		setFinishedTaskData(finData)
		setTaskData(newData)

    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(newData))
    localStorage.setItem('todo_list__finished_tasks', JSON.stringify(finData))
	}

	const handleClickRevokeButton = (index : number) => {
		const newData = [...taskData]
		const finData = [...finishedTaskData]
		const revokeData = finData.splice(index,1)
		revokeData[0].theTime = moment().format('YYYY-MM-DD HH:mm:ss')

		newData.push(...revokeData)

		setFinishedTaskData(finData)
		setTaskData(newData)

    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(newData))
    localStorage.setItem('todo_list__finished_tasks', JSON.stringify(finData))
	}

	const handleClickDeleteButton = (index : number) => {
		const deleteData = [...taskData]
		deleteData.splice(index,1)
		
		setTaskData(deleteData)

    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(deleteData))
	}

  // TODO: 添加类型
	const addDatum = (value: any) => {
		if (value === '') { return }

		const addTaskData: any[] = [...taskData]
		const theKey = uuidv4()
		
		addTaskData.push({
      key: theKey,
      theTask: value,
      theTime: moment().format('YYYY-MM-DD HH:mm:ss')
    })

		setTaskData(addTaskData)
    setInputValue('')

    localStorage.setItem('todo_list__unfinished_tasks', JSON.stringify(addTaskData))
	}

  const handleInputSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if ((e.nativeEvent as any).data === undefined) {
      setInputValue('')

      return
    }
    if ((e.nativeEvent as any).data === null) {
      setInputValue(inputValue.slice(0,inputValue.length -1))

      return
    }

    setInputValue(inputValue + (e.nativeEvent as any).data)
  }

  useEffect(() => {
    if ( localStorage.getItem('todo_list__unfinished_tasks') === null )
      localStorage.setItem('todo_list__unfinished_tasks', '[]')
    
    if ( localStorage.getItem('todo_list__finished_tasks') === null )
      localStorage.setItem('todo_list__finished_tasks', '[]')

    setTaskData(JSON.parse(localStorage.getItem('todo_list__unfinished_tasks')!) as string[])
    setFinishedTaskData(JSON.parse(localStorage.getItem('todo_list__finished_tasks')!) as string[])
  }, [])

	return (
		<Layout>
			<Header style={{
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
				<Input.Search
					placeholder="请输入今日任务" 
					onSearch={addDatum}
					enterButton='点我加数据'
          value={inputValue}
          onChange={handleInputSearchChange}
          allowClear
				/>
			</Header>

			<Layout>
				<Content>
						<Table columns={newTaskColumns} dataSource={taskData}></Table>
						<Table columns={finishedTaskColumns} 
						dataSource={finishedTaskData} 
						// onRow={record => {
						// 	return {
						// 		onMouseEnter: onMouseEnterEvent => {}
						// 	}}
						// }
						></Table>
				</Content>
			</Layout>
		</Layout>
	)
}

export default TodoList
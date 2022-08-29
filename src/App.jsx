import React, { useEffect, useState } from 'react'
import './App.css'
import MutiChart from './views/MutiChart'
import YangHuiTringle from './views/YangHuiTringle'
import { Button, Layout, Menu, Space } from 'antd'
import TestButton from './views/TestButton'
import DemoList from './views/DemoList'
import DemoForm from './views/DemoForm'
import axios from 'axios'
import TsTest from './views/TsTest'
import TodoList from 'views/TodoList'

const { Header, Sider, Content } = Layout

function App() {
  const [currentView, setCurrentView] = useState()

  const [imgSrc, setImgSrc] = useState('')

  const [catImgSrc, setCatImgSrc] = useState('')

  const items = [
    { label: '乘法表', key: 'mutiChart', view: <MutiChart /> }, 
    { label: '杨辉三角', key: 'yangHui', view: <YangHuiTringle /> }, 
    { label: '按钮*3', key: 'testButton', view: <TestButton /> },
    { label: '演示列表', key: 'demoList', view: <DemoList /> },
    { label: '演示表单', key: 'demoForm', view:  <DemoForm /> },
    { label: '测试ts', key: 'tsTest', view: <TsTest /> },
    { label: 'TODO列表', key: 'todoList', view: <TodoList /> },
  ]

  const handleMenuClick = (e) => {
    const currentItem = items.find((item) => item.key === e.key)
  
    setCurrentView(currentItem.view)
  }

  const getCatImg = async() => {
    const { data } = await axios.get('https://api.thecatapi.com/v1/images/search')

    setCatImgSrc(data[0].url)
  }

  const getDogImg = async () => {
    const { data } = await axios.get('https://dog.ceo/api/breeds/image/random')

    setImgSrc(data.message)
  }

  const getImgs = async () => {
    await getDogImg()
    getCatImg()   
  }
  
  useEffect(() => {
    getImgs()
  }, [])

  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          backgroundColor: 'pink',
        }}
      >
        <img
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'green',
          }}
          src={imgSrc}
        />
        <img
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'red',
          }}
          src={catImgSrc}
        />
      </Header>

      <Layout>
        <Sider theme='light'>
          <Menu items={items} onClick={handleMenuClick} />
        </Sider>

        <Content
          style={{
            padding:'12px',
          }}
        >
          {currentView}
        </Content>
      </Layout>
    </Layout>
  )
}

export default App

import { useState, useEffect } from "react"
import ListTable, { ListTableDatum } from "./components/ListTable"
import SearchForm from "./components/SearchForm"
import { Button } from 'antd'
import React from "react"

const data: ListTableDatum[] = [
    {
        key:'1',
        userName:'杰克屎',
        userAge: 58,
        userAddress:'上海'
    },
    {
        key:'2',
        userName:'Z摩托',
        userAge: 12,
        userAddress:'北京'
    },
    {
        key:'3',
        userName:'七个牛',
        userAge: 18,
        userAddress:'南京'
    }

]

const getUserData = async () => {
  return new Promise<ListTableDatum[]>((resolve) => {
    setTimeout(() => {
        resolve(data)
    }, 1000)
  })
}

const DemoList: React.FC = () => {
  const [dataSource, setDateSource] = useState<ListTableDatum[]>([])

  const initDataSource = async () => {
    const v = await getUserData()

    setDateSource(v)
  }

  const handleFinish = ({ userName, userAddress }: { userName: string, userAddress: string }) => {
    const newDataSource =
    data.filter((datum) => {
        if ( userName && userName !== datum.userName ) return false
        
        if ( userAddress && userAddress !== datum.userAddress ) return false

        return true
      })
    
    setDateSource(newDataSource)
  }

  useEffect(() => {
    initDataSource()
  }, [])

  return (
    <>
      <SearchForm onFinish={handleFinish} />

      <ListTable dataSource={dataSource} />
    </>
  )
}

export default DemoList

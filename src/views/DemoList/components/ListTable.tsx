import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import React from 'react'

export type ListTableDatum = {
  userName?: string,
  userAddress?: string,
  userAge: number,
  key: string
}

const columns: ColumnsType<ListTableDatum> = [
  {
    title: '姓名',
    dataIndex:'userName',
    key:'userName',
  },
  {
    title:'地区',
    dataIndex:'userAddress',
    key:'userAddress',
  },
  {
    title:'年龄',
    dataIndex:'userAge',
    key:'userAge',
  },
]

type Props = {
  dataSource: ListTableDatum[]
}

const ListTable: React.FC<Props> = (props) => {
  const { dataSource } = props

  return (
    <Table columns={columns} dataSource={dataSource}/>
  )
}

export default ListTable

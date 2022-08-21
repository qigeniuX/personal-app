import React, { useState } from 'react'

import { Moment } from 'moment'

import { isObject, isString } from 'lodash-es'

import { Button, Form, Input, Radio, Cascader, Checkbox, DatePicker, Space, Switch, TimePicker, TreeSelect  } from 'antd'

import { Upload, message } from 'antd'

import { UploadOutlined } from '@ant-design/icons';
import { EventArgs, ValidateErrorEntity } from 'rc-field-form/lib/interface'

import { GlobalContext } from '../../index'

const { TreeNode } = TreeSelect

const { RangePicker } = DatePicker

const isAlpha = (str: string) => {
  const judgeReg = /[a-zA-Z]/

  for (const char of str) {
    if ( !judgeReg.test(char) ) return false
  }

  return true
}

type FormValue = {
  userName?: string,
  preferPositions?: string[],
  gameTimes?: [Moment, Moment] | null,
  gameName?: string,
  cityName?: string[],
  playerSwitch?: boolean,
  playerOnlineTime?: [Moment, Moment] | null,
  selectedHero?: string,
  playerPhoto?: Record<string, any>[]
}

const DemoForm:React.FC = () => {
  const [form] = Form.useForm<FormValue>()

  const handleFinish = (values: FormValue) => {
    console.log('Success',values)
  }

  const handleFinishFailed = (errorInfo: ValidateErrorEntity<FormValue>) => {
    console.log('Failed',errorInfo)
  }

  const handleValuesChange = (changedValues: Record<string, any>, values: FormValue) => {
    console.log(changedValues)

    const field = Object.keys(changedValues)[0]

    if (field === "gameTimes") {
      console.log('gameTimes changed')
    }
  }

  const normFile = (e?: {
      file: Record<string, any>,
      fileList: any[],
      event: Record<string, any>
  }) => {
    return e?.fileList || []
  }

  const optionsWithDisabled = [
    {
      label: 'Apex英雄',
      value: 'apex',
    },
    {
      label: 'Dota2',
      value: 'dota2',
    },
    {
      label: '连连看',
      value: 'lianliankan',
      disabled: true,
    },
  ];

  const optionsCity = [
    {
      value:'shanghai',
      label:'上海',
      children: [
        {
          value:'huangpu',
          label:'黄浦区'
        },
        {
          value:'pudong',
          label:'浦东新区'
        }
      ]
    }
  ]

  const optionsManyCities = [
    {
      label:'1号位',
      value:'carry'

    },

    {
      label:'2号位',
      value:'solo'
    },

    {
      label:'3号位',
      value:'offline'
    }
  ]

//   const handleUserNameInputChange = (e) => {
//     setFormValue((oriValue) => {
//       return {
//         ...oriValue,
//         userName: e.target.value,
//       }
//     })
//   }

//   const handleGameNameInputChange = (e) => {
//     setFormValue((oriValue) => {
//         return {
//             ...oriValue,
//             gameName: e.target.value,
//         }
//     })
//   }

//   const handleGameTimeInputChange = (e) => {
//     setFormValue((oriValue) => {
//         return {
//             ...oriValue,
//             gameTime: e.target.value
//         }
//     })
//   }

    return (
      <>
        <Form
          labelCol={{span:6}}
          wrapperCol={{span:18}}
          labelAlign='left'
          form={form}
          onValuesChange={handleValuesChange}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
        >
          <Form.Item
            label="用户名"
            name='userName'
            rules={[
              { 
                required: true,
                message: '必填'
              },
              () => ({
                validator: (_, value) => {
                  if (isString(value) && isAlpha(value)) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('必须为英文字母'))
                  }
                }
              })
            ]}
          >
            <Input allowClear />
          </Form.Item>

                  <Form.Item
                    label="偏好定位"
                    name="preferPositions"
                  >
                    <Checkbox.Group
                      options={optionsManyCities}
                    />
                  </Form.Item>

                  <Form.Item
                    label="游戏时间"
                    name="gameTimes"
                  >
                    <RangePicker />
                  </Form.Item>

                  <Form.Item
                    label="游戏名"
                    name="gameName"
                  >
                    <Radio.Group
                      options={optionsWithDisabled}
                    />
                  </Form.Item>

                  <Form.Item
                    label='城市名'
                    name='cityName'
                  >
                    <Cascader options={optionsCity} allowClear />
                  </Form.Item>

                  {/* InputNumber */}

                  {/* Switch */}
                  <Form.Item
                    label='真的会玩吗'
                    name='playerSwitch'
                    valuePropName='checked'
                  >
                    <Switch
                      checkedChildren="会的会的"
                      unCheckedChildren="会..会吗？"
                      defaultChecked
                    />
                  </Form.Item>

                  {/* TimePicker */}
                  <Form.Item
                    label='就问你何时上号'
                    name='playerOnlineTime'
                  >
                    <TimePicker.RangePicker/>
                  </Form.Item>

                  {/* ☆☆☆☆☆ TreeSelect */}
                  <Form.Item
                    label='选择传奇'
                    name='selectedHero'
                  >
                    <TreeSelect
                      placeholder="请选择你的铁驭"
                      allowClear
                      showSearch
                      treeDefaultExpandAll
                      dropdownStyle={{
                        maxHeight: 200,
                        overflow: 'auto'
                      }}
                    >
                      <TreeNode value='zzy' title='章子怡' selectable={false}>
                        <TreeNode value='Hill' title='希尔'/>  
                        <TreeNode value='Roba' title='罗芭'/>                                                                                                                                                                                                   
                      </TreeNode>

                      <TreeNode value='lsq' title='李思齐' selectable={false}>
                        <TreeNode value='PowerKids' title='动力小子'/>  
                        <TreeNode value='Fuse' title='暴雷'/>                                                                                                                                                                                                     
                      </TreeNode>

                      <TreeNode value='szy' title='杰克屎' selectable={false}>
                        <TreeNode value='Mirage' title='幻象'/>  
                        <TreeNode value='Wattson' title='沃特森'/>     
                        <TreeNode value='Crypto' title='密客'/>                                                                                                                                                                                                    
                      </TreeNode>
                    </TreeSelect>
                  </Form.Item>

                  {/* Upload */}
                  <Form.Item
                    label='请上传你的自拍'
                    name='playerPhoto'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                  >
                    <Upload>
                      <Button icon={<UploadOutlined />}>Upload png only</Button>
                    </Upload>
                  </Form.Item>

          <Form.Item>
              <Button htmlType='submit'>提交</Button>
          </Form.Item>
        </Form>
      </>
    )
}

export default DemoForm

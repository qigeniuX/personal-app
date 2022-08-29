import Icon, { FontSizeOutlined, WhatsAppOutlined} from '@ant-design/icons'
import { Space, Button, Popover, Col, Row } from 'antd'
import React, { useState } from 'react'
import './index.css'


const content1 = (
  <div>
    <p>电话杰克屎邀请打π</p>
  </div>
)

const content2 = (
  <div style={{ display: 'flex' }}>
    <div style={{display:'flex', flexDirection: 'column'}}>
      <Button style={{ textAlign: 'left' }} type='text'>连载动画</Button>
      <Button style={{ textAlign: 'left' }} type='text'>完结动画</Button>
      <Button style={{ textAlign: 'left' }} type='text'>咨询asdfhsfdafshsdf</Button>
      <Button style={{ textAlign: 'left' }} type='text'>官方延伸</Button>
    </div>

    <div style={{display:'flex', flexDirection: 'column'}}>
      <Button style={{ textAlign: 'left' }} type='text'>连载动画</Button>
      <Button style={{ textAlign: 'left' }} type='text'>完结动画</Button>
      <Button style={{ textAlign: 'left' }} type='text'>咨询</Button>
      <Button style={{ textAlign: 'left' }} type='text'>官方延伸</Button>
    </div>
  </div>
)

const content3 = (
  <div>
    <p>我重伤倒地</p>
  </div>
)


const TestButton = () => {
  return(
    <Row style={{ width: '600px' }}>
      <Col span={6}>
        <Row>
          <Col style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }} span={8}>

            <Button style={{ height: '40px', width: '40px', backgroundColor: '#ff9212' }} icon={<WhatsAppOutlined style={{ fontSize: '25px', color: 'wheat' }} />} shape="circle" />

            <span style={{ display: 'block' }}>动态</span>
          </Col>

          <Col style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }} span={8}>

            <Button style={{ height: '40px', width: '40px', backgroundColor: '#ff9212' }} icon={<WhatsAppOutlined style={{ fontSize: '25px', color: 'wheat' }} />} shape="circle" />

            <span style={{ display: 'block' }}>动态</span>
          </Col>

          <Col style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }} span={8}>

            <Button style={{ height: '40px', width: '40px', backgroundColor: '#ff9212' }} icon={<WhatsAppOutlined style={{ fontSize: '25px', color: 'wheat' }} />} shape="circle" />

            <span style={{ display: 'block' }}>动态</span>
          </Col>

                
        </Row>
      </Col>

      <Col span={12}>
        <Popover overlayClassName='no-arrow' align={{ offset: [0, '6px'] }} content={content2}>
          <Button>点击为杰克屎选择传奇</Button>
        </Popover>
      </Col>

      <Col span={6}>
        <Button type="text" icon={<FontSizeOutlined />} >
                点击使用跳板
        </Button>
      </Col>
    </Row>
  )
}
export default TestButton
import React from 'react';
import { useState } from 'react';

function MutiChart() {
  const [level, setLevel] = useState(9)
  const [arr, setArr] = useState(new Array(level).fill('').map((_, i) => i + 1))

  const handleLevelInputChange = (v: any) => {
    setLevel(parseInt(v.target.value || 0))//target,value用法
  }

  const handleConfirmButtonClick = () => {
    setArr(new Array(level).fill('').map((_, i) => i + 1))
  }

  return (
    <div>
      <div>
        <label>请输入阶数：</label>

        <input defaultValue={level} onChange={handleLevelInputChange} />
        当前的level:{level}
        <button onClick={handleConfirmButtonClick}>确定</button>
      </div>
      {
        arr.map((ele) => {
          return (
            <div key={ele}>
              {
                new Array(ele)
                  .fill('') // ['', '', '']
                  .map((_, i) => i + 1) // [1, 2, 3]
                  .map((v,i) => {
                    return (
                      <span
                        key={i}
                        style={{
                          marginLeft: i === 0 ?
                            undefined:
                            '12px'
                        }}
                      >
                        {ele} * {v} = {ele * v < 10 ? `0${ele * v}` : ele * v}
                      </span>
                    )
                  })
              }  
            </div>
          )
        })
      }
    </div>
  )
}

export default MutiChart;

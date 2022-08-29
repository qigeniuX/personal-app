import React from 'react';
import { useState } from 'react';

const genTringleArr = (num: number) => {
  let arr: any[] = []

  for (let a = 0 ; a < num ; a++) {
    arr.push([])
  }

  for (let b = 0 ; b < num ; b++) {
    for (let c = 0 ; c <= b ;c++) {
      if (c === 0 || c === b) {
        arr[b][c] = 1
      } else {
        arr[b][c] = arr[b-1][c-1] + arr[b-1][c]
      }
    }
  }
  
  return arr
}

const YangHuiTringle = () => {
    const [level, setLevel] = useState(9)
    const [arr, setArr] = useState(genTringleArr(level))
  

    const handleLevelInputChange = (v: any) => {
      setLevel(parseInt(v.target.value || 0))
    }
  
    const handleConfirmButtonClick = () => {
      setArr(genTringleArr(level))
      // setArr(new Array(level).fill('').map((_, i) => i + 1))
    }
  
    return (
      <div>
        <div>
          <label>请输入层数：</label>

          <input defaultValue={level} onChange={handleLevelInputChange} />
            当前的level:{level}
          <button onClick={handleConfirmButtonClick}>确定</button>
        </div>
        
        <div>
          {
            arr.map((ele, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {ele.map((ele2: any, index2: number) => {
                    return (
                      <span key={index2} style={{marginLeft : '12px'}}>{ele2}</span>
                    )
                  })}
                </div>
              )
            })
          }
        </div>
      </div>
    )
}

export default YangHuiTringle

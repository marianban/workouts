
// 10A^2 + 2x10AB + B2 = AREA

const normalizeNumber = (number) => {
  const before = number.toString().split('.')[0]
  const after = number.toString().split('.')[1]
  let newArea = ''
  newArea += before.length%2 ? '0' + before : before
  if (after) {
    newArea += '.'
    newArea += after.length%2 ? after + '0' : after
  }
  return newArea
}

const findA = (number) => {
  const maxA = parseInt(number.substr(0, 2))
  let data = {};
  for (let i=0; i<= maxA; i++) {
    const area = (i*i)
    if (area <= maxA) {
      a = i
      data = {
        number: number,
        value: i,
        area: maxA - area,
        index: 2,
        result: i.toString()
      }
    } else {
      break
    }
  }
  return data
}

const findB = (data) => {
  if (data.number.length <= data.index) {
    if (!data.number.includes('.')) {
      data.number += '.'
    }
    data.number += '00'
  }
  if (data.number[data.index] === '.') {
    data.index += 1
    data.result += '.'
  }
  const barea = parseInt(`${data.area}${data.number.substr(data.index, 2)}`)
  let newData = {}
  for (let i=0; i<=barea; i++) {
    const nextBArea = (20*data.value*i) + (i*i)
    if (nextBArea <= barea) {
      newData = {
        number: data.number,
        value: i,
        area: barea - nextBArea,
        index: data.index + 2,
        result: data.result + i.toString()
      }
    } else {
      break
    }
  }
  return newData
}

const precision = 12
const totalArea = normalizeNumber(64)
let dataA = findA(totalArea)
let dataB = findB(dataA)
for (let i=1; i<= precision; i++) {
  dataA = { value: parseInt(`${dataA.value}${dataB.value}`), index: dataB.index, area: dataB.area, result: dataB.result, number: dataB.number }
  dataB = findB(dataA)
}
console.log('result', dataB)

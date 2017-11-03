/*
 * Created by lyarc 32237384@qq.com on 2017/7/24.
 */
import { Platform, Dimensions, PixelRatio } from 'react-native'

export const fontSizeScaler = (Size) =>{
  let _fontSizeScaler = Size
  if(Platform.OS !== 'ios'){
    _fontSizeScaler = Size / PixelRatio.getFontScale()
  }
  return _fontSizeScaler
}

export const doubleDigitize = (number) => {
  if (number < 10) { return `0${number}` }
  return number.toString()
}

export const getDate = (date) => {
  if (date === null || date === undefined) {
    return '暂无'
  }
  return date.slice(0, 10)
}

export const getTime = (date) => {
  if (date === null || date === undefined) {
    return ''
  }
  return date.slice(11, 19)
}

export const sex = [
  {value: '1', name: '男'},
  {value: '2', name: '女'},
  {value: '0', name: '保密'}
]

//返回选择类别中文
export const getSelectName = (Array, Value) => {
  let name = null
  Array.map((item, index) => {
    if(Value == item.value){
      name = item.name
    }
  })
  return name
}
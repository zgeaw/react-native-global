/**
 * Created by lyarc 32237384@qq.com on 2017/7/24.
 * itemDivider 灰色底色间隔栏
 * imgUrl 左侧显示图片
 * listText 主标题
 * subText 副标题
 * btnText 右侧文字
 * btnStyle 右侧文字样式
 * btnArrow 是否显示右侧箭头
 * btnNoArrow 不显示右侧箭头，有点击事件
 * btnAction 行点击回调事件
 * onChange 表单输入类回调事件
 * last 尾行不显示下边线
 * listContent 简介区域，与标题不在一行显示
 * txtContent 输入简介
 * button 标题文字显示为蓝色
 * big 主标题显示为大字 18号
 * toggle 滑动开关
 * inputTextLeft 左侧输入框
 * inputTextRight 右侧输入框
 * inputBig 输入框大文字显示
 * number 调用数字键盘
 * placeholder 输入框缺省文字
 * renderSelect 下拉框
 * options 下拉框数据
 * DatePicker 日历选择, 为datetime显示(2010-01-01 00:00:00), 为date显示(2010-01-01)，为time显示(00:00:00)
 * passWord 密码类加密显示
 * renderArea 选择地区控件
 * btnClose 关闭按钮
 * listDate 日期
 */
import React, { Component } from 'react'
import { TouchableOpacity, Image, Platform, Modal } from 'react-native'
import { View, Text, Icon, Switch, Input, Button } from 'native-base'
import * as colors from './constants/colors'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Picker from 'react-native-picker'
import area from './constants/area.json'
import { doubleDigitize, getDate, getTime, fontSizeScaler } from '.constants/utils'
import SelectModal from './constants/SelectModal'

const createAreaData = () => {
  let data = []
  let len = area.length
  for (let i = 0; i < len; i++) {
    let city = []
    for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
      let _city = {}
      _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area']
      city.push(_city)
    }

    let _data = {}
    _data[area[i]['name']] = city
    data.push(_data)
  }
  return data
}

class CommonList extends Component {

  state = {
    isDateTimePickerVisible: false,
    dateTime: null,
    isSelectVisible: false,
    btnText: null,
    toggle: this.props.toggle || false,
    renderAreaValue: ['北京', '北京', '朝阳区'],
    txtContentHeight: 0
  }

  //点击事件回调
  ListPress = () => {
    const { DatePicker, btnAction, renderSelect, renderArea} = this.props
    if(DatePicker){
      this.setState({isDateTimePickerVisible: true})
    }else if(renderSelect){
      this.setState({isSelectVisible: true})
    }else if(renderArea){
      this.renderArea()
    }else{
      btnAction()
    }
  }

  //列表渲染
  listView = () => {
    const {
      imgUrl, inputTextLeft, inputTextRight, inputBig, onChange, placeholder, btnText, btnStyle, btnArrow,
      toggle, itemDivider, last, listContent, txtContent, button, big, subText, listText, passWord, number, btnClose
    } = this.props
    let btnCon
    let inputCon
    let inputValue = null
    let listTextCon = null
    let btnCloseCon = null
    if(inputTextLeft !== undefined && inputTextLeft !== true){
      inputValue = inputTextLeft
    }
    if(inputTextRight !== undefined && inputTextRight !== true){
      inputValue = inputTextRight
    }
    if(inputTextLeft || inputTextRight || inputTextLeft !== undefined || inputTextRight !== undefined){
      inputCon = <Input secureTextEntry={passWord ? true : false} value={inputValue} keyboardType={number ? 'numeric' : 'default'}
                        style={Object.assign({}, inputTextLeft !== undefined ? styles.ListInputLeft : styles.ListInputRight, inputBig ? {fontSize: fontSizeScaler(16)}: {})}
                        onChangeText={(val) => onChange(val)}
                        placeholder={placeholder} placeholderTextColor={colors.greyA100} />
    }
    if(this.state.btnText || btnText || btnArrow || toggle !== undefined || inputTextLeft || inputTextRight || inputTextLeft !== undefined || inputTextRight !== undefined) {
      btnCon = <View style={styles.ListBtn}>
        {this.state.btnText || btnText ? <Text style={Object.assign({},styles.ListBtnText, btnStyle ? btnStyle : {})}>{this.state.btnText || btnText}</Text> : <Text/>}
        {btnArrow && <Icon name='ios-arrow-forward' style={styles.ListBtnIcon} />}
        {toggle !== undefined && <Switch value={toggle} onValueChange={(toggle) => {
          this.setState({toggle})
          onChange(toggle)
        }} />}
        {inputCon}
      </View>
    }
    if(listText){
      listTextCon = <Text style={Object.assign({}, styles.ListText, itemDivider ? {color: '#828282'} : {},
        button ? {color: colors.blue} : {},
        big ? {fontSize: fontSizeScaler(18)} : {})}>
        {subText ? listText.substr(0, 10) : listText}
      </Text>
    }
    if(btnClose){
      btnCloseCon = <View style={styles.ListBtn}><TouchableOpacity onPress={this.ListPress}>
        <Icon name="close" style={{fontSize: fontSizeScaler(24), color: colors.blue}} /></TouchableOpacity></View>
    }
    return (
      <View style={Object.assign({}, styles.List, itemDivider ? styles.ListDivider : {}, last || listContent || txtContent !== undefined ? {borderBottomWidth: 0} : {})}>
        {imgUrl && <View><Image source={imgUrl} style={styles.ListImg} /></View>}
        <View style={styles.ListLeft}>
          {listTextCon}
          {subText && <Text style={styles.ListSubText}>{String(subText)}</Text>}
        </View>
        {btnCon}
        {btnCloseCon}
      </View>
    )
  }

  contentOnchange = (event) => {//多行输入框自动高度组件
    let _height = event.nativeEvent.contentSize.height + 10
    this.setState({txtContentHeight:_height})
  }

  //简介渲染
  listcontent = () => {
    const { listContent, txtContent, onChange, placeholder, last, listDate } = this.props
    let NewContent
    if(txtContent !== undefined) {
      NewContent = <Input style={Object.assign({}, styles.ListContentText, {height:Math.max(35,this.state.txtContentHeight)})} value={txtContent} multiline={true}
                          onChange={this.contentOnchange.bind(this)}
                            onChangeText={(value) => onChange(value)}
                          onContentSizeChange={this.contentOnchange.bind(this)}
                          placeholder={placeholder} placeholderTextColor={colors.greyA100} />
    }else if(listContent) {
      NewContent = <Text style={styles.ListContentText}>{listContent}</Text>
    }
    if (listContent || txtContent !== undefined || listDate ) {
      return (
        <View style={Object.assign({}, styles.ListContent, last ? {borderBottomWidth: 0} : {})}>
          {NewContent}
          {listDate && <Text style={Object.assign({}, styles.ListSubText, {marginTop: 5})}>{listDate}</Text>}
        </View>
      )
    }
  }

  //日期控件事件
  hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false})
  handleDatePicked = date => {
    const {DatePicker, btnAction} = this.props
    const timestamp = Date.parse(new Date(date))
    const dateString = (DatePicker === 'date')
      ? `${date.getFullYear()}-${doubleDigitize(date.getMonth() + 1)}-${doubleDigitize(date.getDate())}`
      : (DatePicker === 'time')
        ? `${doubleDigitize(date.getHours())}:${doubleDigitize(date.getMinutes())}:${doubleDigitize(date.getSeconds())}`
        : `${date.getFullYear()}-${doubleDigitize(date.getMonth() + 1)}-${doubleDigitize(date.getDate())} ${doubleDigitize(date.getHours())}:${doubleDigitize(date.getMinutes())}:${doubleDigitize(date.getSeconds())}`
    this.setState({dateTime: dateString})
    btnAction(dateString)
    this.hideDateTimePicker()
  }

  //日期控件
  DateTimePicker = () => {
    const { listText, DatePicker } = this.props
    let dateType = 'date'
    if(DatePicker && DatePicker != true){
      dateType = DatePicker + ''
    }
    return (
      <DateTimePicker
        cancelTextIOS='取消'
        confirmTextIOS='确定'
        mode={dateType}
        date={new Date()}
        titleIOS={listText}
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
      />
    )
  }

  //单选控件
  renderSelect = () => {
    const { listText, btnText, renderSelect, btnAction, options } = this.props
    return (
      <SelectModal
        dates={options}
        titleIOS={listText}
        isVisible={this.state.isSelectVisible}
        checked={renderSelect}
        setVisible={(isSelectVisible, btnText) => this.setState({isSelectVisible, btnText: btnText != undefined ? btnText : this.state.btnText})}
        callBack={btnAction}
      />
    )
  }

  //地区控件
  renderArea = () => {
    const {btnAction} = this.props
    Picker.init({
      pickerData: createAreaData(),
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择地区',
      selectedValue: this.state.renderAreaValue,
      onPickerConfirm: value => {
        let newValue = `${value[0]} ${value[1]} ${value[2]}`
        this.setState({renderAreaValue: value})
        btnAction(newValue)
      },
      onPickerCancel: value => {},
      onPickerSelect: value => {}
    })
    Picker.show()
  }

  render () {
    const {btnArrow, btnNoArrow, btnAction, DatePicker, listText, renderSelect, options} = this.props
    if (btnArrow || btnNoArrow) {
      return (
        <View>
          <TouchableOpacity onPress={this.ListPress}>
            {this.listView()}
            {this.listcontent()}
          </TouchableOpacity>
          {DatePicker && this.DateTimePicker()}
          {this.state.isSelectVisible && this.renderSelect()}
        </View>
      )
    } else {
      return (
        <View>
          {this.listView()}
          {this.listcontent()}
        </View>
      )
    }
  }
}

const styles = {
  List: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyA600
  },
  ListContent: {
    paddingBottom: 16,
    paddingRight: 16,
    marginTop: -10,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyA600
  },
  ListContentText: {
    color: colors.greyA100,
    fontSize: fontSizeScaler(14),
    paddingLeft: 0
  },
  ListDivider: {
    borderBottomWidth: 0,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 0,
    paddingLeft: 16,
    backgroundColor: colors.grey100
  },
  ListImg: {
    width: 22,
    height: 22,
    marginRight: 13
  },
  ListLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ListText: {
    color: colors.black, fontSize: fontSizeScaler(14), marginRight: 10
  },
  ListSubText: {
    color: colors.greyA100,
    fontSize: fontSizeScaler(12)
  },
  ListBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  ListBtnText: {
    textAlign: 'right', color: colors.greyA100, fontSize: fontSizeScaler(14)
  },
  ListBtnIcon: {
    color: colors.greyA400, fontSize: fontSizeScaler(18), marginLeft: 10
  },
  ListInputLeft: {
    textAlign: 'left', color: colors.black, fontSize: fontSizeScaler(14), height: Platform.OS === 'ios' ? 17 : 50, position: Platform.OS === 'ios' ? 'relative' : 'absolute', width: '100%'
  },
  ListInputRight: {
    textAlign: 'right', color: colors.black, fontSize: fontSizeScaler(14), height: Platform.OS === 'ios' ? 17 : 50, position: Platform.OS === 'ios' ? 'relative' : 'absolute', width: '100%'
  }
}

export default CommonList

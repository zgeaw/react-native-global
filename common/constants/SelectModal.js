/*
 * Created by lyarc 32237384@qq.com on 2017/7/24.
 */

import React, { Component } from 'react'
import { TouchableOpacity, Image, Platform, Modal, FlatList } from 'react-native'
import { Container, Content, Right, Text, ListItem, Radio } from 'native-base'
import * as colors from './colors'
import commonStyles from '../commonStyles'

let newDates = []
class SelectModal extends Component {
  state = {
    isVisible: false,
    value: this.props.checked || '1',
    name: null
  }

  setVisible = (value, name) => {
    const { setVisible, callBack } = this.props
    this.setState({isVisible: false})
    if(name){
      setVisible(false, name)
      callBack(value)
    }else{
      setVisible(false)
    }
  }

  componentWillMount() {
    const { dates } = this.props
    newDates = dates.map(item => Object.assign({}, item, {
      key: item.value
    }))
  }

  render () {
    const { titleIOS, isVisible} = this.props
    return (
      <Modal animationType={'slide'} transparent={false} visible={this.state.isVisible ? false : isVisible} onRequestClose={() => {}}>
        <Container style={commonStyles.backgroundGrey}>
          <Content style={commonStyles.backgroundWhite}>
            <FlatList
              data={newDates}
              renderItem={(item, Index) => <ItemList data={item} checked={this.state.value} selectAction={(value, name) => {
                this.setState({value, name})
                this.setVisible(value,name)
              }
              } />}
            />
          </Content>
        </Container>
      </Modal>
    )
  }
}

class ItemList extends Component {

  setChecked = () => {
    const { data, selectAction } = this.props
    selectAction(data.item.value, data.item.name)
  }

  render () {
    const { data, checked } = this.props
    return (
      <ListItem onPress={() => this.setChecked()} style={{height: 50}}>
        <Text>{data.item.name}</Text>
        <Right>
          <Radio selected={data.item.value === checked ? true : false}  onPress={() => this.setChecked()} />
        </Right>
      </ListItem>
    )
  }
}

export default SelectModal

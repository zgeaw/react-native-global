import React, { Component } from 'react'
import { View, Spinner } from 'native-base'
import commonStyles from './common/commonStyles'
import CommonList from './common/CommonList'
import { sex, getSelectName } from './common/constants/utils'

class demo extends Component {
	state = {
		demo1: 111,
		sex: 1,
		desc: ''
	}
	render () {
		return (
			<View>
			  <View style={Object.assign({},commonStyles.backgroundWhite,commonStyles.componentSeparatorTow)}>
				<CommonList listText='标题1' btnText='001' />
				<CommonList listText='标题2' btnText='002' btnArrow btnAction={() => alert('点击了标题2')} />
				<CommonList listText='标题3' number placeholder='默认打开数字键盘' inputTextRight={this.state.demo1 + ''} onChange={(demo1) => this.setState({demo1})} />
				<CommonList listText='性别' renderSelect={1} btnText={getSelectName(sex, 1)} options={sex} btnArrow btnAction={(sex) => this.setState({sex})}  />
				<CommonList listText='简介' last txtContent={this.state.desc} placeholder='输入简介' onChange={(desc) => this.setState({desc})}  />
			  </View>
			</View>
		  )
	}
}

export default demo
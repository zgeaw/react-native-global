/*
 * Created by lyarc 32237384@qq.com on 2017/7/24.
 */

import { Platform } from 'react-native'
import * as colors from './constants/colors'
import { fontSizeScaler } from './constants/utils'

export default {
  loginLogo: {
    resizeMode: 'cover',
    width: 80,
    height: 80
  },
  // colors
  white: {
    color: colors.white
  },
  backgroundGrey: {
    backgroundColor: colors.grey100
  },
  backgroundWhite: {
    backgroundColor: colors.white
  },
  backgroundBlue: {
    backgroundColor: colors.blue
  },
  black: {
    color: colors.black
  },
  // header main styles
  header: {
    backgroundColor: colors.blue,
    borderBottomWidth: 0
  },
  headerLeft: {
    flex: 1
  },
  headerTitle: {
    alignItems: 'center'
  },
  headerBtn: {
    backgroundColor: colors.blueA800
  },
  headerBtnText: {
    fontSize: fontSizeScaler(14),
    color: colors.white
  },
  headerText: {
    fontSize: fontSizeScaler(18),
    color: colors.white
  },
  headerIcon: {
    fontSize: fontSizeScaler(24),
    color: colors.white
  },
  headerSearch: {
    backgroundColor: colors.white,
    shadowColor: colors.white
  },
  searchBar: {
    height: 44,
    alignItems: 'center',
    backgroundColor: '#efefef',
    paddingTop: Platform.OS === 'ios' ? 0 : 2
  },
  // header view styles
  headerView: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7'
  },
  headerViewBtn: {
    backgroundColor: colors.blueA800
  },
  headerViewBtnText: {
    fontSize: fontSizeScaler(14),
    color: colors.blue
  },
  headerViewText: {
    fontSize: fontSizeScaler(18),
    color: colors.black
  },
  headerViewIcon: {
    fontSize: fontSizeScaler(24),
    color: colors.blue
  },
  // margins
  componentSeparator: {
    marginTop: 10
  },
  componentSeparatorTow: {
    marginBottom: 10
  },
  // form style
  form: {
    backgroundColor: colors.white
  },
  Separator: {
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingLeft: 16,
    backgroundColor: colors.grey100,
    height: 28
  },
  separatorText: {
    color: colors.grey600,
    fontSize: fontSizeScaler(14)
  },
  confirmButton: {
    backgroundColor: colors.blue500
  },
  invalidConfirmButton: {
    backgroundColor: colors.grey500
  },
  confirmText: {
    color: colors.white,
    fontSize: fontSizeScaler(16),
    lineHeight: 24
  },
  formBackgroundWhite: {
    backgroundColor: colors.white,
    padding: 0,
    borderBottomWidth: 1,
    borderColor: colors.grey300
  },
  tabStyle: {
    backgroundColor: colors.white
  },
  activeTabStyle: {
    backgroundColor: colors.white
  },
  tabText: {
    color: colors.black,
    fontSize: fontSizeScaler(13)
  },
  activeTabText: {
    color: colors.blue,
    fontSize: fontSizeScaler(13)
  },
  tabLine: {
    backgroundColor: colors.blue,
    height: 1
  },
  Icon: {
    width: 20,
    height: 20
  },
  ViewContent: {
    backgroundColor: colors.grey100
  },
  ViewMargin: {
    paddingTop: 10
  },
  promptText: {
    margin: 23,
    color: colors.greyA200,
    fontSize: fontSizeScaler(12)
  },
  prompt: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  searchBarText: {
    fontSize: fontSizeScaler(12),
    textAlign: 'left'
  },
  searchInput: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingLeft: 16,
    height: Platform.OS === 'ios' ? 'auto' : 30
  },
  flatListCon: {
    flex: 1,
    backgroundColor: colors.grey100
  }
}


import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  footerText: {
    alignItems: 'center',
    fontSize: 10,
    paddingLeft: 2,
    paddingRight: 2
  }
})

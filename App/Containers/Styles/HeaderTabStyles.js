
import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  bigText: {
    fontSize: 42,
    textAlign: 'right',
    alignSelf: 'stretch'
  },
  smallText: {
    fontSize: 14,
    paddingLeft: 10,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
  contentMargin: {
    fontSize: 14,
    paddingLeft: 15,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  averageText: {
    fontSize: 20,
    color: 'white', 
    padding: 10,
    textAlign: 'center',
    alignSelf: 'stretch',
  }

})

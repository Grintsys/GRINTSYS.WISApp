import { StackNavigator } from 'react-navigation'
import ListHomeWork from '../Containers/ListHomeWork'
import ListHomeWorkTest from '../Containers/ListHomeWorkTest'
import LaunchScreen from '../Containers/LaunchScreen'
import TabNavigation from '../Containers/TabNavigation'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ListHomeWork: { screen: ListHomeWork },
  ListHomeWorkTest: { screen: ListHomeWorkTest },
  LaunchScreen: { screen: LaunchScreen },
  TabNavigation: { screen: TabNavigation },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'TabNavigation',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav

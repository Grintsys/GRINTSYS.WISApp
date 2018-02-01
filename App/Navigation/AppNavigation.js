import { StackNavigator } from 'react-navigation'
import ListHomeWork from '../Containers/ListHomeWork'
import LaunchScreen from '../Containers/LaunchScreen'
import TabNavigation from '../Containers/TabNavigation'
import FooterNavigation from '../Containers/FooterTabNavigation'
import ListFinances from '../Containers/ListFinances'
import RootScreen from '../Containers/RootScreen/index'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ListHomeWork: { screen: ListHomeWork },
  LaunchScreen: { screen: LaunchScreen },
  TabNavigation: { screen: TabNavigation },
  FooterNavigation: { screen: FooterNavigation},
  ListFinances: { screen: ListFinances},
  RootScreen: { screen: RootScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'RootScreen',
})

export default PrimaryNav

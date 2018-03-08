import React from "react"
import { Text } from 'react-native'
import { StackNavigator, DrawerNavigator } from "react-navigation"
import ListHomeWork from '../Containers/ListHomeWork'
import LaunchScreen from '../Containers/LaunchScreen'
import TabNavigation from '../Containers/FooterTabNavigation'
import ListFinances from '../Containers/ListFinances'
import RootScreen from '../Containers/RootScreen'
import SwitchStudent from '../Containers/SwitchStudentScreen'
import TestScreen from '../Containers/TestScreen'

import styles from './Styles/NavigationStyles'

const DrawerStack = DrawerNavigator({
  Login: { screen: RootScreen },
  Accounts: { screen: SwitchStudent },
  Content: { screen: TabNavigation },
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    title: 'Logged In to your app!',
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  })
})

const LoginStack = StackNavigator(
  {
    LoginScreen: { screen: RootScreen },
  }, 
  {
    headerMode: 'none',
  })

// Manifest of possible screens
const PrimaryNav = StackNavigator(
{
    LoginStack: { screen: LoginStack },
    SwitchStudent: { screen: SwitchStudent },
    TestScreen: { screen: TestScreen },
    DrawerStack: { screen: DrawerNavigation },
    TabNavigation: { screen: TabNavigation },
}, {
      //headerMode: 'none',
      title: 'Main',
      initialRouteName: 'LoginStack'
})

export default PrimaryNav;

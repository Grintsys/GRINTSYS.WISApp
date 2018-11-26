import React from "react"
import { Text } from 'react-native'
import { StackNavigator, DrawerNavigator, TabNavigator } from "react-navigation"
import { Button, Icon } from 'native-base'

//import LaunchScreen from '../Containers/LaunchScreen'
//import TabNavigation from '../Containers/FooterTabNavigation'

//Login
import RootScreen from '../Containers/RootScreen'

//tab navigation
import Tareas from '../Containers/HomeWorkScreen'
import TareasDetails  from '../Containers/HomeWorkDetailsScreen'
import Pagos from '../Containers/FinancesScreen'
import Calendario from "../Containers/CalendarScreen";
import Notas from "../Containers/GradesScreen";

// Drawer Navigation
import SwitchStudent from '../Containers/SwitchStudentScreen'
import TestScreen from '../Containers/TestScreen'

import styles from './Styles/NavigationStyles'

const TabNav = TabNavigator({
    Calendario: {
      screen: Calendario, 
      navigationOptions: {
        tabBarLabel: 'Calendario',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-calendar-outline" size={35} color={tintColor} />
      },
    },
    Tareas: {
      screen: Tareas, 
      navigationOptions: {
        tabBarLabel: 'Tareas',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-clock-outline" size={35} color={tintColor} />
      },
    },
    Notas: {
      screen: Notas, // Replaced Feed with FeedStack
      navigationOptions: {
        tabBarLabel: 'Notas',
        tabBarIcon: ({ tintColor }) => <Icon name="md-stats" size={35} color={tintColor} />
      },
    },
    Pagos: {
      screen: Pagos, // Replaced Feed with FeedStack
      navigationOptions: {
        tabBarLabel: 'Pagos',
        tabBarIcon: ({ tintColor }) => <Icon name="logo-usd" size={35} color={tintColor} />
      },
    }
  },
    {
      animationEnabled: true,
      swipeEnabled: true,
    });    

const TabStack =  StackNavigator({
  TabStack: { screen: TabNav },
  SwitchStudent: { screen: SwitchStudent },
  HomeworkDetails: { screen: TareasDetails },
  },
  {
    headerMode: 'screen',
    navigationOptions: ({navigation}) => ({
      params: navigation.state.params,
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2196F3',
        borderBottomColor: '#2196F3',
        borderBottomWidth: 1,
      },
      headerRight: (
          <Button transparent onPress={() => navigation.navigate("SwitchStudent", {
            Username: navigation.state.params.Username,
            StudentCode: navigation.state.params.StudentCode,
            GradeId: navigation.state.params.GradeId,
            SectionId: navigation.state.params.SectionId
          })}>
          <Icon name='ios-people' style={{color: 'white'}} />
        </Button>
      ),
      headerLeft: (
        <Button onPress={() => navigation.navigate('DrawerOpen')} transparent>
            <Icon name='menu' />
        </Button>
      )
    })
  }
)

const MyDrawer = DrawerNavigator({
    Home: { screen: TabStack },
    Login: { screen: RootScreen },
})

const RootStack = StackNavigator({
  Login: { screen: RootScreen },
  Accounts: { screen: SwitchStudent },
  Drawer: {
    screen: MyDrawer,
    navigationOptions: { header: null },//Prevent double header
  }
})


export default RootStack;

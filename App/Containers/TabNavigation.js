import React, { Component } from 'react'
import { FlatList } from "react-native";
//import { connect } from "react-redux";
import { Container, Content, Header, Footer, FooterTab, Tab, Tabs, TabHeading, 
  Icon, Text, Button, Badge, Right, Left, Body, Title} from "native-base";

import Tab1 from "./TestScreen"
import SwitchStudent from './SwitchStudentScreen';
import Styles from "./Styles/FooterTabStyles";

export default class TabNavigation extends Component {

  onSwitchStudentAccount = () => {
    this.props.navigation.navigate('SwitchStudent')
  }

  onNavigationDrawer = () => {
    this.props.navigation.navigate("DrawerStack")
  }

  //Tab 1 temporal backup
  /*
          <Tab style={{elevation: 0}} heading={ <TabHeading>
            <Icon active name="ios-paper-outline" />
          </TabHeading>}>
           <Tab1 /> 
          </Tab>
  */

  render() {
    return (
      <Container>
        <Tabs tabBarPosition= "bottom" initialPage={0} ref={(tabview) => { this.tabview = tabview }} tabBarUnderlineStyle={{opacity: 0, backgroundColor: "transparent",}}>
          <Tab style={{elevation: 0}} heading={ <TabHeading>
            <Icon active name="ios-paper-outline" />
          </TabHeading>}>
           <Tab1 /> 
          </Tab>     
        </Tabs>     
      </Container>
    )
  }
}
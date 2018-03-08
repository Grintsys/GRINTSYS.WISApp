import React from 'react';
import { StackNavigator } from 'react-navigation';
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { Container, Content, Header, Footer, FooterTab, Tab, Tabs, TabHeading, 
  Icon, Text, Button, Badge, Right, Left, Body, Title} from "native-base";

import Tab1 from "./NewsScreen"
import Tab2 from "./ListHomeWork";
import Tab3 from "./CalendarScreen";
import Tab4 from "./GradesScreen";
import Tab5 from "./FinancesScreen";
import SwitchStudent from './SwitchStudentScreen';
import Styles from "./Styles/FooterTabStyles";

class FooterTabNavigation extends React.Component {

  onSwitchStudentAccount = () => {
    this.props.navigation.navigate('SwitchStudent')
  }

  onOpenDrawer = () => {
    this.props.navigation.navigate('DrawerStack')
  }

  //Tab 1 temporal backup
  /*
          <Tab style={{elevation: 0}} heading={ <TabHeading>
            <Icon active name="ios-paper-outline" />
          </TabHeading>}>
           <Tab1 />
          </Tab>

        <Header iosBarStyle="light-content">
          <Left>
              <Button transparent onPress={this.onOpenDrawer}>
                <Icon name='menu' />
              </Button>
          </Left>
          <Body>
            <Title>WIS</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.onSwitchStudentAccount}>
              <Icon name='ios-repeat' />
            </Button>
          </Right>
        </Header>
  */

  render() {
    return (
      <Container>
        <Tabs tabBarPosition= "bottom" initialPage={0} ref={(tabview) => { this.tabview = tabview }} tabBarUnderlineStyle={{opacity: 0, backgroundColor: "transparent",}}>
          <Tab style={{elevation: 0}} heading={ <TabHeading>
            <Icon name="ios-clock-outline" />
          </TabHeading>}>
            <Tab2 />
          </Tab>
          <Tab style={{elevation: 0}} heading={ <TabHeading>
            <Icon name="ios-calendar-outline" />
          </TabHeading>}>
            <Tab3 />
          </Tab>
          <Tab style={{elevation: 0}} heading={ <TabHeading>
            <Icon name="md-stats" />
          </TabHeading>}>
            <Tab4 />
          </Tab>
          <Tab style={{elevation: 0}} heading={ <TabHeading>
            <Icon name="logo-usd" />
          </TabHeading>}>
            <Tab5 />
          </Tab>
        </Tabs>     
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    // ...redux state to props here
  };
};

export default connect(mapStateToProps)(FooterTabNavigation);
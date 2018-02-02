import React from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container, Content, Header, Footer, FooterTab, Tab, Tabs, TabHeading, 
  Icon, Text, Button, Badge, Right, Left, Body, Title} from "native-base";

//import Tab1 from "./ListNews";

import Tab1 from "./NewsScreen"
import Tab2 from "./ListHomeWork";
import Tab3 from "./CalendarScreen";
import Tab4 from "./ListGrades";
import Tab5 from "./ListFinances";
import Styles from "./Styles/FooterTabStyles";

/*
 <Footer>
          <FooterTab>
            <Button badge vertical active onPress={() => this.tabview.goToPage(0)}>
              <Badge><Text>2</Text></Badge>
              <Icon active name="ios-paper-outline" />
              <Text style={Styles.footerText}>Noticias</Text>
            </Button>
            <Button badge vertical onPress={() => this.tabview.goToPage(1)}>
              <Badge ><Text>9</Text></Badge>
              <Icon name="ios-clock-outline" />
              <Text style={Styles.footerText}>Tareas</Text>
            </Button>
            <Button badge vertical onPress={() => this.tabview.goToPage(2)}>
              <Badge ><Text>6</Text></Badge>
              <Icon name="ios-calendar-outline" />
              <Text style={Styles.footerText}>Calendario</Text>
            </Button>
            <Button vertical onPress={() => this.tabview.goToPage(3)}>
              <Icon name="md-stats" />
              <Text style={Styles.footerText}>Notas</Text>
            </Button>
            <Button vertical onPress={() => this.tabview.goToPage(4)}>
              <Icon name="logo-usd" />
              <Text style={Styles.footerText}>Finanzas</Text>
            </Button>
          </FooterTab>
        </Footer>

*/
class FooterTabNavigation extends React.Component {
  render() {
    return (
      <Container>
        <Header iosBarStyle="light-content">
          <Left>
              <Button transparent>
                <Icon name='menu' />
              </Button>
          </Left>
          <Body>
            <Title>WIS</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text style={Styles.headerText}>Cambiar</Text>
            </Button>
          </Right>
        </Header>
        <Tabs tabBarPosition= "bottom" initialPage={0} ref={(tabview) => { this.tabview = tabview }} tabBarUnderlineStyle={{opacity: 0, backgroundColor: "transparent",}}>
          <Tab style={{elevation: 0}} heading={ <TabHeading>
            <Icon active name="ios-paper-outline" />
          </TabHeading>}>
           <Tab1 />
          </Tab>
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
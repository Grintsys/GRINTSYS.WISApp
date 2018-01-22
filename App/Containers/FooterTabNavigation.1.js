import React from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container, Content, Header, Footer, FooterTab, Tab, Tabs, TabHeading, 
  Icon, Text, Button, Badge, Right, Left, Body, Title} from "native-base";

import Tab1 from "./ListNews";
import Tab2 from "./ListHomeWork";
import Tab3 from "./ListFinances";
import Tab4 from "./ListGrades";
import Tab5 from "./ListFinances";
import Styles from "./Styles/FooterTabStyles";

/*

<Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>

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
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text style={Styles.footerText}>Cambiar</Text>
            </Button>
          </Right>
        </Header>
        <Tabs initialPage={0} ref={(tabview) => { this.tabview = tabview }} tabBarUnderlineStyle={{opacity: 0, backgroundColor: "transparent",}}>
          <Tab style={{elevation: 0}} heading={ <TabHeading />}>
           <Tab1 />
          </Tab>
          <Tab style={{elevation: 0}} heading={ <TabHeading />}>
            <Tab2 />
          </Tab>
          <Tab style={{elevation: 0}} heading={ <TabHeading />}>
            <Tab3 />
          </Tab>
          <Tab style={{elevation: 0}} heading={ <TabHeading />}>
            <Tab4 />
          </Tab>
          <Tab style={{elevation: 0}} heading={ <TabHeading />}>
            <Tab5 />
          </Tab>
        </Tabs>
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
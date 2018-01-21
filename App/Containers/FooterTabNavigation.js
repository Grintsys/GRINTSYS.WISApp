import React from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container, Content, Header, Footer, FooterTab, Tab, Tabs, TabHeading, Icon, Text, Button, Badge, } from "native-base";

import Tab1 from "./ListHomeWorkTest";
import Tab2 from "./ListHomeWork";
import Tab3 from "./LaunchScreen";
import Styles from "./Styles/FooterTabStyles";

class FooterTabNavigation extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Tabs initialPage={0} ref={(tabview) => { this.tabview = tabview }} tabBarUnderlineStyle={{opacity: 0}}>
          <Tab heading={ <TabHeading/> }>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading />}>
            <Tab2 />
          </Tab>
          <Tab heading={ <TabHeading />}>
            <Tab3 />
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
import React from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, } from "native-base";

import Tab1 from "./ListHomeWorkTest";
import Tab2 from "./ListHomeWork";
import Tab3 from "./LaunchScreen";

class TabNavigation extends React.Component {
  render() {
    return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          <Tab heading={ <TabHeading><Icon name='camera' /><Text>Camera</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Text>No Icon</Text></TabHeading>}>
            <Tab2 />
          </Tab>
          <Tab heading={ <TabHeading><Icon name='apps' /></TabHeading>}>
            <Tab3 />
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

export default connect(mapStateToProps)(TabNavigation);
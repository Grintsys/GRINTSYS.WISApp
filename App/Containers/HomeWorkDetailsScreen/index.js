import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage } from "react-native";
import { Card, CardItem, Content, Body, Text, View, Container, Title, Button, Icon, Thumbnail, } from "native-base";
import API from "../../Services/Api"
import FJSON from 'format-json'

class HomeWorkDetails extends React.Component {

  static navigationOptions = {
        title: 'Detalle',
  };

  constructor(props){
    super(props);
    
    const { Title, Content, RemainTime} = this.props.navigation.state.params;

    this.state = {
      Title: Title,
      Content: Content,
      RemainTime: RemainTime,
    } 
  }

  onNavigationDrawer = () => {
    this.props.navigation.navigate("SwitchStudent")
  }

  render() {
    return (
      <Container>
        <Content>
         <Card>
            <CardItem header>
              <Text>{this.state.Title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {this.state.Content}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Vencimiento: {this.state.RemainTime} Dias</Text>
            </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    // ...redux state to props here
  };
};

export default connect(mapStateToProps)(HomeWorkDetails);

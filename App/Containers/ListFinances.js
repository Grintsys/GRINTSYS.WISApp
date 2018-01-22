import React from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { List, ListItem, Content, Text, View, Container, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
// import Icon from 'react-native-vector-icons/Ionicons'
import API from "../Services/Api"
import FJSON from 'format-json'

class ListFinances extends React.Component {

  api = {}

  constructor(props){
    super(props);
    
    this.state = {
      data: [],
      loading: false,
    }

    this.api = API.create()
  }

  getData = async () =>{
    const homeworks = await this.api.getHomeWork(5, 2);
    this.setState({
        data: homeworks.data,
    });  
  }

  getDataLocal(){
    const data = require("../Fixtures/payments.json");
    this.setState({
      data: data,
    })
  }

  componentDidMount(){
    //this.getData();
    this.getDataLocal();
  }

  /*
        <ListItem 
         style={{ justifyContent: "space-between" }}>
        <Text>{item.Description}</Text>
        <Text note>{item.Subject}</Text>
      </ListItem>
  
  */

  _renderItem = ({ item }) => {
    return (
      <ListItem>
        <Thumbnail square size={80} source={{ uri: "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" }} />
        <Body>
          <Text>{item.Description}</Text>
          <Text note>{item.Total}</Text>
        </Body> 
        <Right>
          <Text note>Pago {item.Date}</Text>
        </Right>
      </ListItem>
    );
  };

  /*
  
          <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Tareas</Title>
          </Body>
          <Right />
        </Header>
  
  */

  render() {
    return (
      <Container>
        <Content>
          <Button block bordered>
              <Text>Valor Adeudado: {this.state.data.TotalDue}</Text>
          </Button>
        <FlatList data={this.state.data.Payments} 
                  keyExtractor={(item, index) => index} 
                  renderItem={this._renderItem} />
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

export default connect(mapStateToProps)(ListFinances);

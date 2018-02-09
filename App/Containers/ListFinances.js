import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage } from "react-native";
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

  getData = async () => {
    try {
      const grade = await AsyncStorage.getItem('GradeId');
      const payments = await this.api.getPayments(Number(grade), 1);

      if(payments.data.success === true){
        this.setState({
            data: payments.data.payments,
            TotalDue: payments.data.TotalDue,
        });
      }
    } catch(err){
      console.error(err);
    }
  }

  getDataLocal(){
    const data = require("../Fixtures/payments.json");
    this.setState({
      data: data.payments,
    })
  }

  componentDidMount(){
    this.getData();
    //this.getDataLocal();
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
         <Icon name="ios-calendar-outline" />
        <Body>
          <Text>{item.Description}</Text>
          <Text note>{item.Total}</Text>
        </Body> 
        <Right>
          <Text note>{item.Date}</Text>
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
              <Text>Valor Adeudado: {this.state.TotalDue}</Text>
          </Button>
        <FlatList data={this.state.data} 
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

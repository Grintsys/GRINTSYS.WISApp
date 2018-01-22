import React from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { List, ListItem, Text, View, Container, Content, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
// import Icon from 'react-native-vector-icons/Ionicons'
import API from "../Services/Api"
import FJSON from 'format-json'
import Styles from './Styles/HeaderTabStyles'

class ListGrades extends React.Component {

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
    const data = require("../Fixtures/grades.json");
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
        <Body>
          <Text style={Styles.bigText}>{item.Total}</Text>
          <Text note>{item.Subject}</Text>
        </Body>
        <Right>
          <Text note>E: {item.Exam}</Text>
          <Text note>TA: {item.WorkInClass}</Text>
          <Text note>TC: {item.WorkInHome}</Text>
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
              <Text>Promedio: {this.state.data.Average}</Text>
          </Button>


        <FlatList data={this.state.data.Grades} 
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

export default connect(mapStateToProps)(ListGrades);

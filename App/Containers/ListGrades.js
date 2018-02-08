import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage } from "react-native";
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
      average: 0,
    }

    this.api = API.create()
  }

  //6.1.2015192.1
  //grado, seccion, codigoalumno, parcial
  getData = async () => {
    try {
      const grade = await AsyncStorage.getItem('GradeId');
      const section = await AsyncStorage.getItem('SectionId');
      const student = await AsyncStorage.getItem('StudentCode');
      const grades = await this.api.getGrades(Number(grade), Number(section), Number(student), 1);
      const average = await this.api.getAverage(Number(grade), Number(section), Number(student), 1);
      this.setState({
          data: grades.data.grades,
          average: average.data.average,
      });
    } catch(err){
      console.error(err);
    }
  }

  getDataLocal(){
    const data = require("../Fixtures/grades.json");
    this.setState({
      data: data,
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
        <Body>
          <Text style={Styles.bigText}>{item.Total}</Text>
          <Text note>{item.Clase}</Text>
        </Body>
        <Right>
          <Text note>E: {item.Examen}</Text>
          <Text note>TA: {item.TrabajoAula}</Text>
          <Text note>TC: {item.TrabajoClase}</Text>
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
              <Text>Promedio: {this.state.average}</Text>
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

export default connect(mapStateToProps)(ListGrades);

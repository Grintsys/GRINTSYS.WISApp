import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage } from "react-native";
import { List, ListItem, Text, View, Container, Content, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, Line } from "native-base";
// import Icon from 'react-native-vector-icons/Ionicons'
import { Col, Row, Grid } from 'react-native-easy-grid';
import API from "../../Services/Api"
import FJSON from 'format-json'
import Styles from '../Styles/HeaderTabStyles'

class ListGrades extends React.Component {

  static navigationOptions = {
    title: 'Calificaciones',
  };

  api = {}

  constructor(props){
    super(props);
    
    this.state = {
      data: [],
      loading: false,
      average: 0,
      partial: 1,
    }

    this.api = API.create()
  }

  //6.1.2015192.1
  //grado, seccion, codigoalumno, parcial
  getData = async (partial) => {
    try {
      //debugger;
      const grade = await AsyncStorage.getItem('GradeId');
      const section = await AsyncStorage.getItem('SectionId');
      const student = await AsyncStorage.getItem('StudentCode');

      console.log(`partial: ${partial} grade: ${grade} - section: ${section} - student: ${student}`);
      const grades = await this.api.getGrades(Number(grade), Number(section), Number(student), partial);
      const average = await this.api.getAverage(Number(grade), Number(section), Number(student), partial);
      this.setState({
          data: grades.data.grades,
          average: average.data.average,
      });
    } catch(err){
      console.error(err);
    }
  }

  getDataLocal(){
    const data = require("../../Fixtures/grades.json");
    console.log(data);
    this.setState({
      data: data.grades,
    })
  }

  onForwardPartial(){
    //console.log(`partial: ${this.state.partial}`);
    var p = (this.state.partial >= 3 ? 1 : this.state.partial + 1);
    this.setState({
        partial: p,
    });
    this.getData(p);
  }

  onBackPartial(){
    //console.log(`partial: ${this.state.partial}`);'
    var p = (this.state.partial > 1 ? this.state.partial - 1 : 3);
    this.setState({
        partial: p,
    });
    this.getData(p);
  }

  componentDidMount(){
    this.getData(this.state.partial);
    //this.getDataLocal();
  }

  

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

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
            <Grid style={{  }}>
                <Row style={{ backgroundColor: '#635DB7', height: 70, padding: 15, justifyContent: 'space-between' }}>
                    <Button iconCenter light onPress={this.onBackPartial.bind(this)}>
                        <Icon name='arrow-back' />
                    </Button>
                    <Text style={{ fontSize: 24, color: 'white', padding: 10}}>Parcial {this.state.partial}</Text>
                    <Button iconCenter light onPress={this.onForwardPartial.bind(this)}>
                        <Icon name='arrow-forward' />
                    </Button>
                </Row>
                <Row style={{ backgroundColor: '#635DB7', height: 50, paddingLeft: 25}}>
                    <Col style={{ alignContent: 'center' }}>
                        <Text style={{ fontSize: 24, color: 'white' }}>{this.state.average} - Promedio</Text>
                    </Col>
                </Row>
                <Row>
                    <FlatList data={this.state.data}
                                keyExtractor={(item, index) => index} 
                                renderItem={this._renderItem} />
                </Row>
            </Grid>
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

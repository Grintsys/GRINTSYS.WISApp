import React from "react";
import { connect } from "react-redux";
import { AsyncStorage, RefreshControl, Alert } from "react-native";
import { List, ListItem, Text, View, Container, Content, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, Line } from "native-base";
// import Icon from 'react-native-vector-icons/Ionicons'
import { Col, Row, Grid } from 'react-native-easy-grid';
import API from "../../Services/Api"
import FJSON from 'format-json'
import Styles from '../Styles/HeaderTabStyles'

class ListGrades extends React.Component {

  static navigationOptions = {
    title: 'Notas',
  };

  api = {}

  constructor(props){
    super(props);
    
    this.state = {
      data: [],
      loading: false,
      average: 0,
      partial: 1,
      isRefreshing: false,
    }

    this.api = API.create()
  }

  //6.1.2015192.1
  //grado, seccion, codigoalumno, parcial
  getData = async (partial) => {
    try {

      //var partial = this.state.partial;
      const { StudentCode, GradeId, SectionId } = this.props.navigation.state.params;
      
      console.log(`GradesScreen: studentCode: ${StudentCode} - g:${GradeId} - s:${SectionId} - p:${partial}`);

      const grades = await this.api.getGrades(Number(GradeId), Number(SectionId), StudentCode, partial);
      const average = await this.api.getAverage(Number(GradeId), Number(SectionId), StudentCode, partial);
      
      console.log(grades.data.grades);
      if(grades.data.success === true){
        this.setState({
            data: grades.data.grades,
            average: average.data.average,
        });
      } else {
        Alert.alert("Mensaje", `No hay notas registradas estudiante: ${StudentCode}`);
      }
    } catch(err){
      console.error(`Error on GradesScreen: ${err}`);
    }
  }

  getDataLocal(){
    const data = require("../../Fixtures/grades.json");

    this.setState({
      data: data.grades,
    })
  }

  refreshList(){
   
    this.setState({
      isRefreshing: true
    })

    console.log("is refreshing");
    this.getData(this.state.partial);

    this.setState({
      isRefreshing: false
    })
  }

  onForwardPartial(){
    var p = (this.state.partial >= 3 ? 1 : this.state.partial + 1);
    this.setState({
        partial: p,
    });
    this.getData(p);
  }

  onBackPartial(){
    var p = (this.state.partial > 1 ? this.state.partial - 1 : 3);
    this.setState({
        partial: p,
    });
    this.getData(p);
  }

  componentDidMount(){
    this.getData(this.state.partial);
  }

  _refreshControl(){
    return (
      <RefreshControl 
        refreshing={this.state.isRefreshing}
        onRefresh={() => this.refreshList()}
      />
    )
  }

  render() {
    return (
      <Container>
        <Content>
            <Grid>
                <Row style={{ backgroundColor: '#2196F3', paddingLeft: 10, paddingRight: 10, paddingTop: 5, justifyContent: 'space-between' }}>
                    <Button iconCenter light onPress={this.onBackPartial.bind(this)}>
                        <Icon name='arrow-back' />
                    </Button>
                    <Text style={Styles.averageText}>Parcial {this.state.partial}</Text>
                    <Button iconCenter light onPress={this.onForwardPartial.bind(this)}>
                        <Icon name='arrow-forward' />
                    </Button>
                </Row>
                <Row style={{ backgroundColor: '#2196F3'}}>
                    <Col style={{ alignContent: 'center' }}>
                        <Text style={Styles.averageText}>{this.state.average}% - Promedio</Text>
                    </Col>
                </Row>
                <Row>
                    <List dataArray={this.state.data}
                          renderRow={(item) =>                               
                                <ListItem>
                                  <Grid>
                                  <Row>
                                    <Col>
                                      <Text style={Styles.smallText}>{item.Clase}</Text>
                                      <Text style={Styles.bigText}>{item.Total}</Text>                                    
                                    </Col>
                                    <Col>
                                      <Text note style={Styles.contentMargin}>Examen: {item.Examen}</Text>
                                      <Text note style={Styles.contentMargin}>Trabajo Aula: {item.TrabajoAula}</Text>
                                      <Text note style={Styles.contentMargin}>Trabajo Clase: {item.TrabajoClase}</Text>
                                      <Text note style={Styles.contentMargin}>Nivelacion: {item.Nivelacion}</Text>               
                                    </Col>
                                  </Row>
                                  </Grid>
                                </ListItem>                            
                              } />
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

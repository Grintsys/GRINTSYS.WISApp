import React from "react";
import { connect } from "react-redux";
import { AsyncStorage, RefreshControl } from "react-native";
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

      const { StudentCode, Username, GradeId, SectionId } = this.props.navigation.state.params;
      
      console.log(`studentCode: ${StudentCode} - u: ${Username} - g:${GradeId} - s:${SectionId}`);

      const grades = await this.api.getGrades(Number(GradeId), Number(SectionId), Number(StudentCode), partial);
      const average = await this.api.getAverage(Number(GradeId), Number(SectionId), Number(StudentCode), partial);
      
      console.log(grades.data.grades);
      if(grades.data.success === true){
        this.setState({
            data: grades.data.grades,
            average: average.data.average,
        });
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
        <Content contentContainerStyle={{flex: 1}} refreshControl={this._refreshControl()}>
            <Grid style={{  }}>
                <Row style={{ backgroundColor: '#2196F3', height: 70, padding: 15, justifyContent: 'space-between' }}>
                    <Button iconCenter light onPress={this.onBackPartial.bind(this)}>
                        <Icon name='arrow-back' />
                    </Button>
                    <Text style={{ fontSize: 24, color: 'white', padding: 10}}>Parcial {this.state.partial}</Text>
                    <Button iconCenter light onPress={this.onForwardPartial.bind(this)}>
                        <Icon name='arrow-forward' />
                    </Button>
                </Row>
                <Row style={{ backgroundColor: '#2196F3', height: 50, paddingLeft: 25}}>
                    <Col style={{ alignContent: 'center' }}>
                        <Text style={{ fontSize: 24, color: 'white' }}>{this.state.average} - Promedio</Text>
                    </Col>
                </Row>
                <Row>
                    <List dataArray={this.state.data}
                          renderRow={(item) =>                               
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

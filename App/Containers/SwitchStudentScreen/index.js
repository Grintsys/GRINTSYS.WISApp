import React from "react";
import { connect } from "react-redux";
import { AsyncStorage, TouchableOpacity, Alert } from "react-native";
import { List, ListItem, Content, Text, View, Container, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
import API from "../../Services/Api"
import Moment from 'moment';

class SwitchStudents extends React.Component {

  api = {}

  constructor(props){
    super(props);
    
    this.state = {
      data: [],
      loading: false,
    }

    this.api = API.create()
  }

  onStudentNavigation = (studentCode) => {
    console.log(`onSwitchStudentAccount: ${studentCode}`);

    this.props.navigation.navigate('TabStack', { 
      StudentCode: studentCode,
      Username: this.props.navigation.state.params.Username,
      GradeId: this.props.navigation.state.params.GradeId,
      SectionId: this.props.navigation.state.params.SectionId
    });
  }

  getData = async () => {
    try {
      const { Username } = this.props.navigation.state.params;
      const students = await this.api.getStudents(Username);

      if(students.data.success === true){

        this.setState({
            data: students.data.users,
        });
      }
    } catch(err){
      console.error("error on SwitchStudentScreen: " + err);
    }
  }

  getDataLocal(){
    const data = require("../../Fixtures/students.json");
    this.setState({
      data: data.users,
    })
  }

  componentDidMount(){
    this.getData();
  }

  render() {
    return (
      <Container>
            <List dataArray={this.state.data}
                  renderRow={(item) => 
                    <ListItem buttom onPress={() => (this.onStudentNavigation(item.StudentCode))}>
                      <Thumbnail size={80} source={{ uri: "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" }} />
                      <Body>
                        <Text>{item.StudentCode}</Text>
                        <Text note>{item.Name}</Text>
                      </Body> 
                      <Right>
                        <Button transparent>
                          <Icon name="ios-arrow-forward" />
                        </Button>
                      </Right>
                  </ListItem>}/>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    // ...redux state to props here
  };
};

export default connect(mapStateToProps)(SwitchStudents);
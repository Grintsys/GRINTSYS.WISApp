import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage, TouchableOpacity } from "react-native";
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
    this.props.navigation.navigate('TabStack', { StudentCode: String(studentCode)});
    //this.props.navigation.navigate('TabStack');
  }

  getData = async () => {
    //debugger;
    try {
      const username = await AsyncStorage.getItem('Username');
      const students = await this.api.getStudents(username);

      if(students.data.success === true){

        console.log(students.data.users);
        this.setState({
            data: students.data.users,
        });
      }
    } catch(err){
      console.error(err);
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
    //this.getDataLocal();
  }

  _renderItem = ({ item }) => {
    //console.log(item);
        return (
          <TouchableOpacity onPress={()=>{this.onStudentNavigation(item)}}>
            <ListItem>
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
            </ListItem>
          </TouchableOpacity>
        );
  };

  render() {
    return (
      <Container>
            <FlatList data={this.state.data} 
                      keyExtractor={(item, index) => index} 
                      renderItem={this._renderItem} />
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
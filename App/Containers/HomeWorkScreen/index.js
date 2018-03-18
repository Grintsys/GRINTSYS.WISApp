import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage } from "react-native";
import { List, ListItem, Text, View, Container, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
import API from "../../Services/Api"
import FJSON from 'format-json'

class ListHomeWork extends React.Component {

  static navigationOptions = {
        title: 'Tareas',
  };

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
    try{

      const { StudentCode, Username, GradeId, SectionId } = this.props.navigation.state.params;
      
      const homeworks = await this.api.getHomeWork(Number(GradeId), Number(SectionId));

      this.setState({
          data: homeworks.data,
      }); 
    }catch(err){
      console.error(err);
    } 
  }

  componentDidMount(){
    this.getData();
  }

  onNavigationDrawer = () => {
    this.props.navigation.navigate("SwitchStudent")
  }

  _renderItem = ({ item }) => {
      //console.log(item);
    return (
      <ListItem>
        <Thumbnail square size={80} source={{ uri: "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" }} />
        <Body>
          <Text>{item.Description}</Text>
          <Text note>{item.Subject}</Text>
        </Body> 
        <Right>
          <Text note>{item.Value} Pts</Text>
          <Text note>{item.RemainTime} Dias</Text>
        </Right>
      </ListItem>
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

export default connect(mapStateToProps)(ListHomeWork);

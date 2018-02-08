import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage } from "react-native";
import { List, ListItem, Text, View, Container, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
// import Icon from 'react-native-vector-icons/Ionicons'
import API from "../Services/Api"
import FJSON from 'format-json'

class ListHomeWork extends React.Component {

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
      const grade = await AsyncStorage.getItem('GradeId');
      const section = await AsyncStorage.getItem('SectionId');
      const homeworks = await this.api.getHomeWork(Number(grade), Number(section));

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
        <Thumbnail square size={80}  source={{ uri: "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" }} />
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

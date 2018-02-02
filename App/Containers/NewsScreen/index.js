import React from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { List, ListItem, Text, View, Container, Image, Content, Header, Card, CardItem, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
// import Icon from 'react-native-vector-icons/Ionicons'
import API from "../../Services/GhostApi"
import Secrets from 'react-native-config'

class ListNews extends React.Component {

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
    const result = await this.api.getBlogPosts();
    
    console.log(result);
    
    this.setState({
          data: result.posts,
    });
  }

  getDataLocal(){
    const data = require("../../Fixtures/news.json");
    this.setState({
      data: data.posts,
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
      <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: Secrets.GHOST_API_URL + item.feature_image }} />
              <Body>
                <Text>{item.title}</Text>
                <Text note>{item.published_at}</Text>
              </Body>
            </Left>
          </CardItem> 
          <CardItem>
            <Left>            
              <Body>                
                  <Text>{item.plaintext}</Text>
              </Body>
              </Left>
            </CardItem>
      </Card>
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
          <Card style={{ flex: 0 }}
                dataArray={this.state.data}
                renderRow={(item) => this._renderItem({item})} >
          </Card>
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

export default connect(mapStateToProps)(ListNews);

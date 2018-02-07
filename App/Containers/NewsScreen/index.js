import React from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { List, ListItem, Text, View, Container, Image, Content, Header, Card, CardItem, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
// import Icon from 'react-native-vector-icons/Ionicons'
import API from "../../Services/GhostApi"
import Secrets from 'react-native-config'
import axios from 'axios'

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

  getAxiosData = async () => {

    var instance = axios.create({
      baseURL: 'http://blog.grintsys.com/ghost/api/v0.1/posts',
      timeout: 10000,
    });

    debugger;

    //let url = 'http://blog.grintsys.com/ghost/api/v0.1/posts';
    // Alter defaults after instance has been created
    const AuthStr = 'Bearer Zz4kx85IHRlt6QkYSvbWOSABc7gAooZuelp2G9pO3SjbxyK2mXUxO8iQKKBIYJLz1jea4bzqckGH0C5D4e4Cji4Dq8qg8Evyxc8Myv5qb0NFkNR1RP1iY2XK0HRemlxQRODHVlDpBgBMKFLo7ogo4208byDIi1usVNNdhYpZnCXukqCdhxbbgwrVY6cqv6M';
    instance.get('', { headers: { Authorization: AuthStr } })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
  }

  componentDidMount(){
    //this.getData();
    //this.getDataLocal();
    this.getAxiosData();
  }

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

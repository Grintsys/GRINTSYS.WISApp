import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage } from "react-native";
import { List, ListItem, Content, Text, View, Container, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import API from "../../Services/Api"
import Moment from 'moment';

class ListFinances extends React.Component {

  onNavigationDrawer = () => {
    this.props.navigation.navigate('RootScreen');
  }

  api = {}

  constructor(props){
    super(props);
    
    this.state = {
      data: [],
      loading: false,
      TotalDue: 0
    }

    this.api = API.create()
  }

  getData = async () => {
    try {
      const grade = await AsyncStorage.getItem('GradeId');
      const payments = await this.api.getPayments(Number(grade), 1);

      if(payments.data.success === true){
        this.setState({
            data: payments.data.payments,
            TotalDue: payments.data.TotalDue,
        });
      }
    } catch(err){
      console.error(err);
    }
  }

  getDataLocal(){
    const data = require("../../Fixtures/payments.json");
    this.setState({
      data: data.payments,
    })
  }

  componentDidMount(){
    //this.getData();
    this.getDataLocal();
  }

  _renderItem = ({ item }) => {
    Moment.locale('en');
    var dt = item.Date;
        return (
            <ListItem icon>
                <Left><Icon name="ios-calendar-outline" /></Left>
                <Body>
                <Text>{item.Description}</Text>
                <Text note>{Moment(dt).format('MM-DD-YYYY')}</Text>
                </Body> 
                <Right>
                <Text>{item.Total} LPS</Text>    
                <Button transparent onPress={this.onNavigationDrawer}>
                <Icon name="ios-close" /> 
                </Button>    
                </Right>
            </ListItem>
        );
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
            <Grid>
                <Row style={{ backgroundColor: '#635DB7', height: 70}}>
                    <Text style={{ paddingLeft: 25, paddingTop: 20, fontSize: 24, color: 'white' }}>Saldo pendiente: {this.state.TotalDue}</Text>
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

export default connect(mapStateToProps)(ListFinances);
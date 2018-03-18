import React from "react";
import { connect } from "react-redux";
import { FlatList, AsyncStorage } from "react-native";
import { List, ListItem, Content, Text, View, Container, Header, Title, Button, Left, Right, Body, Icon, Thumbnail, } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import API from "../../Services/Api"
import Moment from 'moment';

class ListFinances extends React.Component {

  static navigationOptions = {
    title: 'Pagos',
  };

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
      const { GradeId } = this.props.navigation.state.params;
      const payments = await this.api.getPayments(Number(GradeId), 1);

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
    this.getData();
    //this.getDataLocal();
  }

  _renderItem = ({ item }) => {
    Moment.locale('en');
    var dt = item.Date;

    if(item.IsOverdue == 0){
        return (
        <ListItem icon>
            <Left><Icon name="ios-calendar-outline" /></Left>
            <Body>
            <Text>{item.Description}</Text>
            <Text note>{Moment(dt).format('MM-DD-YYYY')}</Text>
            </Body> 
            <Right>
            <Text>{item.Total} LPS</Text>        
            <Icon name="ios-checkmark" />
            </Right>
        </ListItem>
        );
    }else {
        return (
            <ListItem icon>
                <Left><Icon name="ios-calendar-outline" /></Left>
                <Body>
                <Text>{item.Description}</Text>
                <Text note>{Moment(dt).format('MM-DD-YYYY')}</Text>
                </Body> 
                <Right>
                <Text>{item.Total} LPS</Text>        
                <Icon name="ios-close" />
                </Right>
            </ListItem>
        );
    }
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
            <Grid>
                <Row style={{ backgroundColor: '#2196F3', height: 70}}>
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
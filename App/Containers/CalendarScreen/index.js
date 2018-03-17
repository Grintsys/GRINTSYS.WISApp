import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import API from '../../Services/CalendarApi'
import Secrets from 'react-native-config'
import { connect } from "react-redux";

class Calendar extends Component {

  static navigationOptions = {
    title: 'Calendario',
  };

  api = {}

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      selectedDate: this.timeToString()
    };

    this.api = API.create();
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={(day) => this.loadItemsForMonth(day)}
        selected={this.state.selectedDate}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}

      />
    );
  }

  getData = async() => {
    //using secrets .env file, please define your own environtment fields
    const result = await this.api.getCalendarEvents(Secrets.GOOGLE_CALENDAR_ID, Secrets.GOOGLE_CALENDAR_KEY);
    console.log(result);
    var events = {};

    /*
    result.data.items.map((event) =>{
      events.push({
        start: event.start.date || event.start.dateTime,
        end: event.end.date || event.end.dateTime,
        title: event.summary,
      })
    });*/

    if(result.data.items){
      result.data.items.map(function(obj){

        //TODO: enhacement convert toISOString, needs some refactory
        var eventDate = new Date(obj.start.date || obj.start.dateTime);
        var strTime = eventDate.toISOString().split('T')[0];

        //if not exist a record then create the array
        if (!events[strTime]) {
          events[strTime] = [];
          events[strTime].push({
              name: obj.summary,
              //height: Math.max(50, Math.floor(Math.random() * 150))
          });
        } else {
          events[strTime].push({
            name: obj.summary,
            //height: Math.max(50, Math.floor(Math.random() * 150))
          });
        }
        return null;
      });

      //a bug when the current date is empty also show a empy selected date
      if(!events[this.state.selectedDate]){
          events[this.state.selectedDate] = [];
          events[this.state.selectedDate].push({
              name: 'No hay eventos para Hoy',
              //height: Math.max(50, Math.floor(Math.random() * 150))
          });
      }

      const newItems = {};
      Object.keys(events).forEach(key => {newItems[key] = events[key];});

      this.setState({
        items: newItems
      });
      //console.log(result.data.items);
      //console.log(events);
    }
  }

  loadItemsForMonth(day) {
    
      console.log(`Load Items for ${day.year} - ${day.month}`);

      this.getData();
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(datetime) {
    if(datetime){
      var myDate = new Date(datetime);
      return myDate.toISOString().split('T')[0];
    }

    return new Date().toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

const mapStateToProps = state => {
  return {
    // ...redux state to props here
  };
};

export default connect(mapStateToProps)(Calendar);
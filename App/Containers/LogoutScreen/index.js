import React, { Component } from 'react'
import { Text, View, AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation'

class LogoutScreen extends Component {

  state = {
    isLoggedIn: false, // Is the user authenticated?
  }

  constructor(props){
    super(props);
  }

  signOut = async() => {
    await AsyncStorage.clear(); // to clear the token 
    this.setState({ isLoggedIn:false });

    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' })
      ]
    }))
  }

  componentWillMount(){
    this.signOut();
  }

  render () {
    return (
      <View>
        <Text>
          Good Bye
        </Text>
      </View>
    )
  }
}


export default LogoutScreen;

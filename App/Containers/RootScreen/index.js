import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

import AuthScreen from '../AuthScreen'

import API from "../../Services/Api"
import FJSON from 'format-json'
import { NavigationActions } from 'react-navigation';

/**
 * The root component of the application.
 * In this component I am handling the entire application state, but in a real app you should
 * probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
 */
export class LoginAnimation extends Component {

  api = {}

  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false, // Has the app completed the login animation?
    errorMessage: '' //is a login fail
  }

  constructor(props){
    super(props)

    this.api = API.create()
  }

  //handle login session
  onSessionLogin = async () => {
    try{
      const studentCode = await AsyncStorage.getItem('StudentCode');
      const grade = await AsyncStorage.getItem('GradeId');
      const section = await AsyncStorage.getItem('SectionId');
      const username = await AsyncStorage.getItem('Username');

      if(studentCode != null && grade != null && section != null && username != null){
        this.handleHomeNavigation(studentCode, username, grade, section);
      }
    }catch(err){
      console.error(`error on RootScreen: ${err}`)
    }
  }

  componentDidMount(){
    this.onSessionLogin();  
  }

  handleHomeNavigation = (studentcode, username, grade, section) => {
    this.props.navigation.navigate('TabStack', {
      StudentCode: studentcode, 
      Username: username,
      GradeId: grade,
      SectionId: section
    });
  }

  doLogin = async (username, password) =>{

    const response = await this.api.doLogin(username, password);

    if(response.data.success === true){

      var users = response.data.users;
      var studentcode = String(users[0].StudentCode);

      try{

        await AsyncStorage.setItem('StudentCode', studentcode);
        await AsyncStorage.setItem('Username', username);

        const studentdata = await this.api.getStudentData(studentcode);

        if(studentdata.data.success === true)
        {
            var grade = String(studentdata.data.data.GradeId);
            var section = String(studentdata.data.data.SectionId);

            await AsyncStorage.setItem('GradeId', grade);
            await AsyncStorage.setItem('SectionId', section);

            this.handleHomeNavigation(studentcode, username, grade, section);
        }
        
      }catch(err){
        console.log("error on RootScreen", err);
      }
    }

    this.setState({
      isLoggedIn: response.data.success,
      errorMessage: response.data.message,
      isLoading: false,
    });
  }

  /**
   * Two login function that waits 1000 ms and then authenticates the user succesfully.
   * In your real app they should be replaced with an API call to you backend.
   */
  _doLogin = (username, password) => {
    this.setState({ isLoading: true })
    this.doLogin(username, password)
  }

  _doSignup = (username, password, fullName) => {
    this.setState({ isLoading: true })
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */

  render () {
    return (
        <AuthScreen
          login={this._doLogin}
          signup={this._doSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          errorMessage={this.state.errorMessage}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
    )
  }
}

export default LoginAnimation

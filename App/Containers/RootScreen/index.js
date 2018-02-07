import React, { Component, AsyncStorage } from 'react'

import AuthScreen from '../AuthScreen'
//import HomeScreen from '../HomeScreen'
import HomeScreen from '../../Containers/FooterTabNavigation'

import API from "../../Services/Api"
import FJSON from 'format-json'

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

  doLogin = async (username, password) =>{

    const response = await this.api.doLogin(username, password);

    if(response.success){

      let users = response.data.users;

      if(users[0].StudentCode) this.getStudentData(users[0].StudentCode);

      AsyncStorage.setItem('Users', users);
      AsyncStorage.setItem('SelectedUser', users[0]);
    } 

    debugger;

    this.setState({
      isLoggedIn: response.data.success,
      errorMessage: response.data.message,
      isLoading: false,
    });
  }

  getStudentData = async (student) =>{
    const response = await this.api.getStudentData(student);

    if(response.success)
    {
      AsyncStorage.setItem('GradeId', response.data.GradeId);
      AsyncStorage.setItem('SectionId', response.data.SectionId);
    }
    else
    {
      console.log(`error on getStudentData(${student})`);
    }
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

   /**
    * return (
        <HomeScreen
          logout={() => this.setState({ isLoggedIn: false, isAppReady: false })}
        />
      )
    */
  render () {
    if (this.state.isAppReady) {
      return (
        <HomeScreen />
      )
    } else {
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
}

export default LoginAnimation

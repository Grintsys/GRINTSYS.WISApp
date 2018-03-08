import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/LaunchScreenStyles'
import { Button, Icon } from 'native-base';

export default class TestScreen extends Component {

    onNavigationDrawer = () => {
        this.props.navigation.navigate('SwitchStudent');
    }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              this is the test screen navigation
            </Text>
          </View>

          <Button transparent onPress={this.onNavigationDrawer}>
                <Icon name='menu' />
          </Button>

        </ScrollView>
      </View>
    )
  }
}

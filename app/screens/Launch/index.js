import React, {Component} from 'react'
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import styles from './styles';
import {THEMES} from '../../config/constants';
const {colors} = THEMES.gitterDefault;

export default class LaunchScreen extends Component {
  render() {
    return (
      <ImageBackground style={styles.container} source={require('../../assets/images/splash.png')}>
        <StatusBar translucent barStyle="dark-content" />
        <Text style={styles.logo}>
          Loading...
        </Text>
      </ImageBackground>
    )
  }
}

LaunchScreen.navigatorStyle = {
  navBarHidden: true,
  statusBarBlur: true,
  statusBarColor: colors.darkRed
}

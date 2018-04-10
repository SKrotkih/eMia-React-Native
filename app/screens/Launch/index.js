import React, {Component} from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import styles from './styles';

export default class LaunchScreen extends Component {
  render() {
    return (
      <ImageBackground style={styles.background} source={require('../../assets/images/splash.png')}>
        <StatusBar translucent barStyle="dark-content" />
      </ImageBackground>
    )
  }
}

LaunchScreen.navigatorStyle = {
  navBarHidden: true,
  statusBarBlur: true
}

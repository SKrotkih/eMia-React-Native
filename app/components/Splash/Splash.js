import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles';
const splashscreen = require("../../images/splash.png");

export default class extends React.Component {
  render () {
    return (
      <Image style={{ flex: 1, height: null, width: null }} source={splashscreen} />
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true}/>
      </View>
    );
  }
}

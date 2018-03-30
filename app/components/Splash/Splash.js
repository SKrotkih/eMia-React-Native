import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles';

export default class extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../../images/splash.png')} />
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true}/>
        </View>
      </View>
    )
  }
}

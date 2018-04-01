import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles';
import Loader from '../Loader/loader';

export default class extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Loader
          loading={true} />
        <Image style={styles.backgroundImage} source={require('../../images/splash.png')} />
      </View>
    );
  }
}

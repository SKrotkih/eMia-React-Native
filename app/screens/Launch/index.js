import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles';
import Loader from '../../components/Loader';

export default class extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Loader loading={true} />
        <Image style={styles.backgroundImage} source={require('../../assets/images/splash.png')} />
      </View>
    );
  }
}

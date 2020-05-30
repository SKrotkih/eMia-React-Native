import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Button, SocialIcon, Divider} from 'react-native-elements';
import {config} from '../index';
import styles from './styles';

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.image} source={require('@assets/images/logo.png')} />
          <Text style={styles.title}>{config.APP_NAME}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={[styles.buttonContainer]}>
            <Button
              raised
              borderRadius={4}
              title={'Sign Up with E-MAIL'}
              containerViewStyle={[styles.containerView]}
              buttonStyle={[styles.button]}
              textStyle={styles.buttonText}
              onPress={Actions.Register}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity onPress={Actions.Login}>
              <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, {})(Welcome);

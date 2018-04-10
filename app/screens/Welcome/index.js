import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {
  Text, 
  View, 
  TouchableOpacity, 
  Image
} from 'react-native';

import {
  Button, 
  SocialIcon, 
  Divider
} from 'react-native-elements';

import {actions as auth} from '../Auth/index';

import styles from './styles';

class Welcome extends React.Component {
  constructor () {
    super();
    this.state = {

    };
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image style={styles.image} source={require('../../assets/images/logo.png')} />
          <Text style={styles.title}>eMia</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={[styles.buttonContainer]}>
            <SocialIcon
              raised
              button
              type='facebook'
              title='SIGN UP WITH FACEBOOK'
              iconSize={19}
              style={[styles.containerView, styles.socialButton]}
              fontStyle={styles.buttonText}
              onPress={this.onSignInWithFacebook}/>

            <View style={styles.orContainer}>
              <Divider style={styles.divider}/>
              <Text style={styles.orText}>
                                Or
              </Text>
            </View>

            <Button
              raised
              borderRadius={4}
              title={'SIGN UP WITH E-MAIL'}
              containerViewStyle={[styles.containerView]}
              buttonStyle={[styles.button]}
              textStyle={styles.buttonText}
              onPress={Actions.Register}/>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.bottomText}>
                            Already have an account?
            </Text>

            <TouchableOpacity onPress={Actions.Login}>
              <Text style={styles.signInText}>
                                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }
}

export default connect(null, {})(Welcome)

import React from 'react'
import { actions as auth, theme } from '../../../auth/index'
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import styles from './styles'

var { View, StyleSheet, Alert } = require('react-native')

const { signOut } = auth

const { color } = theme

class Logout extends React.Component {
  constructor () {
    super()
    this.state = { }

    this.onSignOut = this.onSignOut.bind(this)
  }

  onSignOut () {
    this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
  }

  onSuccess () {
    Actions.reset('Auth')
  }

  onError (error) {
    Alert.alert('Oops!', error.message)
  }

  render () {
    return (
      <View style={styles.container}>
        <Button
          raised
          borderRadius={4}
          title={'LOG OUT'}
          containerViewStyle={[styles.containerView]}
          buttonStyle={[styles.button]}
          textStyle={styles.buttonText}
          onPress={this.onSignOut}/>
      </View>
    )
  }
}

export default connect(null, { signOut })(Logout)

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Text, Image} from 'react-native'
import {connect} from 'react-redux'
import {rootNavigator} from '../../index'
import styles from './styles'
import Button from '@components/Button'

import {THEMES} from '@config/constants'
import {init} from '../../modules/app'
const {colors} = THEMES.gitterDefault

import {config} from '../index'

class NoInternetScreen extends Component {
  constructor (props) {
    super(props)

    this.handleRetry = this.handleRetry.bind(this)
  }

  handleRetry () {
    const {dispatch} = this.props
    rootNavigator.startAppWithScreen({screen: 'gm.Launch'})
    dispatch(init())
  }

  render () {
    return (
      <Image style={styles.container}
        source={require('../../images/gitter-background.jpg')}>

        <Text style={styles.logo}>
          No internet connection.
        </Text>

        <Button
          style={[styles.buttonStyle, {backgroundColor: colors.darkRed}]}
          onPress={() => this.handleRetry()}>
          <Text pointerEvents="none"
            style={styles.buttonText}>
            Retry
          </Text>
        </Button>
      </Image>
    )
  }
}

NoInternetScreen.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(NoInternetScreen)

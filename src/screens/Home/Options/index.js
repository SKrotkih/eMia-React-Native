
import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { config } from '../index';
import styles from './styles';
import { windowWidth, windowHeight } from '@theme/styles';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';
import { requireNativeComponent, Platform } from 'react-native';

const {
  Dimensions,  
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity
} = ReactNative;
const {
  Component
} = React;

export class Options extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({ title: titleText });
  }

  componentWillMount () {
    this.setTitle("Filter");
  }

  render () {
    return (
      <Container style={{margin: 0, marginBottom: 0, backgroundColor: '#fff'}}>
        <Content contentContainerStyle={{height: windowHeight}}>
          {this.renderContent()}
         </Content>
      </Container>
    )
  }

  renderContent() {
    if (Platform.OS === "ios") {
      return (
        <FilterBridgeView style={{height: windowHeight}} {...this.props} />
      )
    } else {
      return (
        <Text style={{alignSelf: 'center'}}>
          This screen isn't implemented yet
        </Text>
      )
    }
  }
}

Options.propTypes = {
   
}

const FilterBridgeView = requireNativeComponent('FilterBridgeView', Options)

export default connect(null, null)(Options)

import React, {PropTypes} from 'react';
import ReactNative from 'react-native';
import {requireNativeComponent, Platform} from 'react-native';
import {connect} from 'react-redux';
import {windowHeight} from '../../../theme/styles';
import {
  Container,
  Content,
  Thumbnail,
  Header,
  Title,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';

import NativeBase from 'native-base';
import {Actions} from 'react-native-router-flux';
import {config} from '../index';
import styles from './styles';

const {
  Dimensions,
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity
} = ReactNative;

const {Component} = React;

export class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({title: titleText});
  }

  componentWillMount() {
    this.setTitle('Filter');
  }

  render() {
    return (
      <Container style={{margin: 0, marginBottom: 0, backgroundColor: '#fff'}}>
        <Content contentContainerStyle={{height: windowHeight}}>
          {this.renderContent()}
        </Content>
      </Container>
    );
  }

  renderContent() {
    if (Platform.OS === 'ios') {
      return (
        // Native screen!
        <FilterView style={{height: windowHeight}} {...this.props} />
      );
    } else {
      return (
        <Text style={{alignSelf: 'center'}}>
          This screen isn't implemented yet
        </Text>
      );
    }
  }
}

Options.propTypes = {};

const FilterView = requireNativeComponent('FilterBridgeView', Options);

export default connect(null, null)(Options);

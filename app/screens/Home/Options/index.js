
import React from 'react';
import ReactNative from 'react-native';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from './styles';
import { windowWidth, windowHeight } from '../../../theme/styles';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

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
    this.setTitle("Options");
  }

  render () {
    
    return (
      <Container style={{margin: 15, marginBottom: 15, backgroundColor: '#ffffff'}}>
        <Header>
          <Text style={styles.postTitle}>
          </Text>
        </Header>
        <Content contentContainerStyle={{height: windowHeight}}>
          <Text>
          </Text>
        </Content>
      </Container>
    )
  }
}

export default connect(null, null)(Options)

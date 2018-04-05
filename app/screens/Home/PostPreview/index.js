
import React from 'react';
import ReactNative from 'react-native';
import Grid from 'react-native-grid-component';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from './styles';

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

const previewContentHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export class PostPreview extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {
  }

  render () {

    const { item } = this.props;
    var title = item.value.title;
    var body = item.value.body;
    var url = item.url;
    
    return (
      <Container style={{margin: 15, marginBottom: 15, backgroundColor: '#ffffff'}}>
        <Header>
          <Text style={styles.postTitle}>
            {title}
          </Text>
        </Header>
        <Content contentContainerStyle={{height: previewContentHeight}}>
          <Image style={{width: screenWidth - 30, height: screenWidth - 30}} source={{uri: url}} />
          <Text>
            {body}
          </Text>
        </Content>
      </Container>
    )
  }
}

export default connect(null, null)(PostPreview)

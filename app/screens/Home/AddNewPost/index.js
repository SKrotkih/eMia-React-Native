
import React from 'react';
import ReactNative from 'react-native';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { config } from '../index';
import styles from './styles';
import { windowWidth, windowHeight } from '@theme/styles';

import ImageViewer from '@theme/components/ImageViewer';
import { Alert } from '@theme/components/alerts/';

import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Footer, 
  FooterTab, 
  Button, 
  Left, 
  Right, 
  Body, 
  Icon, 
  Text, 
  Thumbnail,
  Form,
  Item,
  Label,
  Input
} from 'native-base';

const {
  Dimensions,  
  AppRegistry,
  Image,
  StyleSheet,
  View,
  TouchableOpacity
} = ReactNative;

const {
  Component
} = React;

export class AddNewPost extends Component {
  constructor (props) {
    super(props);
    this.state = {
      postPhotoUrl: '',
      postTitle: '',
      postBody: ''
    };
    this.doneButtonPressed = this.doneButtonPressed.bind(this);
  }

  setUpNavigationBar() {
    var title = 'New Post';
    const {setParams} = this.props.navigation;
    setParams({ 
      title: title,
      right: 
      <Icon style={{marginRight: 8, color: "#fff"}} name={'ios-done-all'}
      onPress={ () => { this.doneButtonPressed() }} />
    });
  }

  componentWillMount () {
    this.setUpNavigationBar();    
  }

  render () {

    var titleLabelText = 'Title:';
    var bodyLabelText = 'Body:';

    var title = this.state.postTitle === '' ? 'Title' : this.state.postTitle;
    var body = this.state.postBody === '' ? 'Body' : this.state.postBody;    

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Form>
            <Item fixedLabel>
              <Label>{titleLabelText}</Label>
              <Input placeholder={title} />
            </Item>
            <Item fixedLabel>
              <Label>{bodyLabelText}</Label>
              <Input placeholder={body} />
            </Item>
          </Form>
          <View style={styles.backgroundPhoto}>
            {this.renderPhoto()}
          </View>
        </Content>
      </Container>
    )
  }

  renderPhoto() {
    if (this.state.postPhotoUrl === '') {
      return (
        <Button block info style={styles.button}>
          <Text>Photo</Text>
        </Button>
      )
    } else {
      return (
        <ImageViewer
          disabled={false}
          source={{uri: this.state.postPhotoUrl}}
          downloadable
          doubleTapEnabled={true}
        />
      )
    }
  }

  doneButtonPressed() {
    Alert.show('Sorry, this function doesn\'t work jet...', {
      type: 'info',
      duration: 3000
    });
  }

}

export default connect(null, null)(AddNewPost)

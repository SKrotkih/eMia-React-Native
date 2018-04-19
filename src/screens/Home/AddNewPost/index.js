
import React from 'react';
import ReactNative from 'react-native';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { config } from '../index';
import styles from './styles';
import { windowWidth, windowHeight } from '@theme/styles';

import ImageViewer from '@theme/components/ImageViewer';
var ImagePickerManager = require('react-native-image-picker');
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
  PixelRatio,  
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
      photoUrl: '',
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
          <Button block info style={styles.button}
              onPress={() => this.takePhotoButtonPressed()} >
            <Text>Photo</Text>
          </Button>
          <View style={styles.backgroundPhoto}>
            {this.renderPhoto()}
          </View>
        </Content>
      </Container>
    )
  }

  renderPhoto() {
    if (this.state.photoUrl === '') {
      return (
        null
      )
    } else {
      return (
          <ImageViewer
          disabled={false}
          source={{uri: this.state.photoUrl}}
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

  takePhotoButtonPressed() {
    const imagePickerOptions = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
        
    ImagePickerManager.showImagePicker(imagePickerOptions, (response) => {
    
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photoUrl: source
        });
      }
    });
  }
}

export default connect(null, null)(AddNewPost)

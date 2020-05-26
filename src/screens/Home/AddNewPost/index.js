// AddNewPost

import React from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import ImageViewer from '@theme/components/ImageViewer';
import {Alert} from '@theme/components/alerts/';
import {uploadImage} from '@model/firebase/utils/uploadImage';
import styles from './styles';

import NativeBase from 'native-base';
import {Actions} from 'react-native-router-flux';
import {config} from '../index';

import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  Form,
  Item,
  Label,
  Input,
  Header,
  Title,
  Thumbnail,
  Left,
  Right,
  Body,
  Footer,
  FooterTab,
} from 'native-base';

const {
  View,
  Dimensions,
  AppRegistry,
  Image,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} = ReactNative;

const {Component} = React;

import ImagePicker from 'react-native-image-picker';

export class AddNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: '',
      postTitle: '',
      postBody: '',
    };
    this.doneButtonPressed = this.doneButtonPressed.bind(this);
  }

  setUpNavigationBar() {
    var title = 'New Post';
    const {setParams} = this.props.navigation;
    setParams({
      title: title,
      right: (
        <Icon
          style={{marginRight: 8, color: '#fff'}}
          name={'ios-done-all'}
          onPress={() => {
            this.doneButtonPressed();
          }}
        />
      ),
    });
  }

  componentWillMount() {
    this.setUpNavigationBar();
  }

  render() {
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
            onPress={() => this.takePhotoButtonPressed()}>
            <Text>Photo</Text>
          </Button>
          <View style={styles.backgroundPhoto}>{this.renderPhoto()}</View>
        </Content>
      </Container>
    );
  }

  renderPhoto() {
    if (this.state.photoUrl === '') {
      return null;
    } else {
      return (
        <ImageViewer
          disabled={false}
          source={{uri: this.state.photoUrl}}
          downloadable
          doubleTapEnabled={true}
        />
      );
    }
  }

  createNewPost(name, url) {
    console.log(`${name};\n${url}`);
  }

  takePhotoButtonPressed() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          photoUrl: response.uri,
        });
      }
    });
  }

  doneButtonPressed() {
    const uri = this.state.photoUrl;
    const title = this.state.postTitle;
    const body = this.state.postBody;
    if (title === null || title.length === 0) {
      Alert.show('Please, enter post title', {
        type: 'info',
        duration: 3000,
      });
    } else if (uri === null || uri.length === 0) {
      this.createNewPost(title, null);
    } else {
      uploadImage(uri)
        .then((resolve) => {
          this.createNewPost(title, resolve);
        })
        .then((reject) => {
          if (reject === undefined) {
            return;
          } else {
            Alert.show(`Error while uploading photo: ${reject}`, {
              type: 'info',
              duration: 3000,
            });
          }
        });
    }
  }
}

export default connect(null, null)(AddNewPost);

import React from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import ImageViewer from '@theme/components/ImageViewer';
import ImagePicker from 'react-native-image-picker';
import {uploadImage} from '@model/firebase/utils/uploadImage';

import {windowWidth} from '@theme/styles';

import NativeBase from 'native-base';
import {Alert} from '@theme/components/alerts/';
import {Actions} from 'react-native-router-flux';
import Time from '@components/Time';

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
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Thumbnail,
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

export class EditProfile extends Component {
  constructor(props) {
    super(props);

    console.log(windowWidth);

    const {user} = this.props;
    this.state = this.createState(user);

    this.doneButtonPressed = this.doneButtonPressed.bind(this);
  }

  createState(user) {
    const state = {
      userName: user.username,
      photoUrl: user.avatarUrl,
    };
    return state;
  }
  componentWillMount() {
    this.setUpNavigationBar();
  }

  setUpNavigationBar() {
    var title = 'My Profile';
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

  render() {
    var nameLabelText = 'Name:';
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Form>
            <Item fixedLabel>
              <Label>{nameLabelText}</Label>
              <Input placeholder={this.state.userName} />
            </Item>
          </Form>
          <Button
            block
            info
            style={styles.button}
            onPress={() => this.takePhotoButtonPressed()}>
            <Text>Photo</Text>
          </Button>
          {this.state.photoUrl !== null && (
            <View
              style={{
                marginTop: 50,
                width: windowWidth - 30,
                height: windowWidth - 30,
              }}>
              <ImageViewer
                disabled={false}
                source={{uri: this.state.photoUrl}}
                downloadable={true}
                doubleTapEnabled={true}
              />
            </View>
          )}
        </Content>
      </Container>
    );
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
        console.log('User cancelled image picker');
      } else {
        this.setState({
          photoUrl: response.uri,
        });
      }
    });
  }

  doneButtonPressed() {
    const uri = this.state.photoUrl;
    const name = this.state.userName;
    if (name === null || name.length === 0) {
      Alert.show('Please, enter your name', {
        type: 'info',
        duration: 3000,
      });
    } else if (uri === null || uri.length === 0) {
      this.updateProfile(name, null);
    } else {
      uploadImage(uri)
        .then((resolve) => {
          this.updateProfile(name, resolve);
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

  updateProfile(name, url) {
    console.log(`${name}; ${url}`);
  }
}

export default connect(null, null)(EditProfile);

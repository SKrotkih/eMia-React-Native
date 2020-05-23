import React from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import ImageViewer from '@theme/components/ImageViewer';
import {Alert} from '@theme/components/alerts/';

import NativeBase from 'native-base';
import {Actions} from 'react-native-router-flux';
import Time from '@components/Time';

import ImagePicker from 'react-native-image-picker';

// import RNFetchBlob from 'react-native-fetch-blob'
var ImagePickerManager = require('react-native-image-picker');

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
    this.state = {
      photoUrl: '',
      userName: '',
    };
    this.doneButtonPressed = this.doneButtonPressed.bind(this);
  }

  componentWillMount() {
    const {user} = this.props;
    this.setUpNavigationBar();
    this.setState({photoUrl: user.avatarUrl});
    this.setState({userName: user.username});
  }

  setUpNavigationBar() {
    var title = 'My Profile';
    const {setParams} = this.props.navigation;
    setParams({
      title: title,
      right: <Icon style={{marginRight: 8, color: "#fff"}} name={'ios-done-all'} onPress={ () => { this.doneButtonPressed() }}/>,
    });
  }

  render() {
    var name = this.state.userName;
    var photoUrl = this.state.photoUrl;
    var nameLabelText = 'Name:';
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Form>
            <Item fixedLabel>
              <Label>{nameLabelText}</Label>
              <Input placeholder={name} />
            </Item>
          </Form>
          <Button
            block
            info
            style={styles.button}
            onPress={() => this.takePhotoButtonPressed()}>
            <Text>Photo</Text>
          </Button>
          {photoUrl !== null && (
            <View style={styles.backgroundPhoto}>
              {/* <Image
                style={{width: 100, height: 100}}
                source={{uri: photoUrl, scale: 1}}
              /> */}
              <ImageViewer
                disabled={false}
                source={{uri: photoUrl}}
                downloadable={true}
                doubleTapEnabled={true}
              />
            </View>
          )}
        </Content>
      </Container>
    );
  }

  doneButtonPressed() {
    Alert.show('Sorry, this function doesn\'t work jet...', {
      type: 'info',
      duration: 3000,
    });
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
    ImagePicker.launchImageLibrary(options, (response) => {
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
}

  // uploadImage(uri, mime = 'application/octet-stream') {

  //   // Prepare Blob support
  //   const Blob = RNFetchBlob.polyfill.Blob
  //   const fs = RNFetchBlob.fs
  //   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  //   window.Blob = Blob

  //   return new Promise((resolve, reject) => {
  //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
  //     let uploadBlob = null
  //     const imageRef = FirebaseClient.storage().ref('images').child('image_001')
  //     fs.readFile(uploadUri, 'base64')
  //       .then((data) => {
  //         return Blob.build(data, { type: `${mime}BASE64` })
  //       })
  //       .then((blob) => {
  //         uploadBlob = blob
  //         return imageRef.put(blob, { contentType: mime })
  //       })
  //       .then(() => {
  //         uploadBlob.close()
  //         return imageRef.getDownloadURL()
  //       })
  //       .then((url) => {
  //         resolve(url)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //     })
  //   })
  // }

export default connect(null, null)(EditProfile);

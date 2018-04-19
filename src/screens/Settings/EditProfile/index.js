
import React from 'react';
import ReactNative from 'react-native';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from './styles';
import Time from '@components/Time';
import ImageViewer from '@theme/components/ImageViewer';
import { Alert } from '@theme/components/alerts/';

// // import RNFetchBlob from 'react-native-fetch-blob';
var ImagePickerManager = require('react-native-image-picker');
// import ImagePickerManager from 'react-native-image-picker';


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

export class EditProfile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      photoUrl: '',
      userName: ''
    };
    this.doneButtonPressed = this.doneButtonPressed.bind(this);
    //this.getImage = this.getImage.bind(this);    
  }

  setUpNavigationBar() {
    var title = 'My Profile';
    const {setParams} = this.props.navigation;
    setParams({ 
      title: title,
      right: 
      <Icon style={{marginRight: 8, color: "#fff"}} name={'ios-done-all'}
      onPress={ () => { this.doneButtonPressed() }} />
    });
  }

  componentWillMount () {
    const { user } = this.props;
    this.setUpNavigationBar();
    this.setState({photoUrl: user.avatarUrl})
    this.setState({userName: user.username})
  }

  render () {
    const { user } = this.props;
    
    var photoSource = this.state.photoUrl;
    var name = this.state.userName;

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
          <Button block info style={styles.button}
            onPress={() => this.takePhotoButtonPressed()} >
            <Text>Photo</Text>
          </Button>
          <View style={styles.backgroundPhoto}>
            <ImageViewer
              disabled={false}
              source={{uri: photoSource}}
              downloadable={true}
              doubleTapEnabled={true}
            />
          </View>
        </Content>
      </Container>
    )
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

        // this.uploadImage(response.uri)
        //   .then(url => { 
        //     this.setState({photoUrl: url}); 
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   });
      }
    });
  }

  // uploadImage(uri, mime = 'application/octet-stream') {

  //   // Prepare Blob support
  //   const Blob = RNFetchBlob.polyfill.Blob;
  //   const fs = RNFetchBlob.fs;
  //   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  //   window.Blob = Blob;

  //   return new Promise((resolve, reject) => {
  //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //     let uploadBlob = null;
  
  //     const imageRef = FirebaseClient.storage().ref('images').child('image_001');
  
  //     fs.readFile(uploadUri, 'base64')
  //       .then((data) => {
  //         return Blob.build(data, { type: `${mime};BASE64` });
  //       })
  //       .then((blob) => {
  //         uploadBlob = blob;
  //         return imageRef.put(blob, { contentType: mime });
  //       })
  //       .then(() => {
  //         uploadBlob.close();
  //         return imageRef.getDownloadURL();
  //       })
  //       .then((url) => {
  //         resolve(url);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //     });
  //   });
  // }

}

export default connect(null, null)(EditProfile)

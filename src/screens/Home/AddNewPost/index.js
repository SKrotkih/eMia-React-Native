// AddNewPost

import React from 'react';
import ReactNative from 'react-native';
import {TextInput} from 'react-native';
import {connect} from 'react-redux';
import ImageViewer from '@theme/components/ImageViewer';
import styles from './styles';
import {Button, Icon, Text, Label} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {Post} from "../../../model/entities/post";

const {View} = ReactNative;
const {Component} = React;

export class AddNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
    this.doneButtonPressed = this.doneButtonPressed.bind(this);
  }

  createState() {
    const state = {};
    state.title = '';
    state.body = '';
    state.url = '';
    return state;
  }

  setUpNavigationBar() {
    let title = 'New Post';
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
    let titleLabelText = 'Title:';
    let bodyLabelText = 'Body:';
    return (
      <View style={styles.container}>
        <Label style={styles.label}>{titleLabelText}</Label>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          underlineColorAndroid="transparent"
          placeholder="Type title"
          autoFocus={true}
          onChangeText={(text) => this.state.title = text}
          defaultValue={this.state.title}
        />
        <Label style={styles.label}>{bodyLabelText}</Label>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          underlineColorAndroid="transparent"
          placeholder="Type body"
          autoFocus={false}
          onChangeText={(text) => this.state.body = text}
          defaultValue={this.state.body}
        />
        <Button block info style={styles.button}
                onPress={() => this.takePhotoButtonPressed()}>
          <Text>Attach a Photo</Text>
        </Button>
        <View style={styles.backgroundPhoto}>{this.renderPhoto()}</View>
      </View>
    );
  }

  renderPhoto() {
    if (this.state.url === '') {
      return null;
    } else {
      return (
        <ImageViewer
          disabled={false}
          source={{uri: this.state.url}}
          downloadable
          doubleTapEnabled={true}
        />
      );
    }
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
          url: response.uri,
        });
      }
    });
  }

  doneButtonPressed() {
    const post = new Post(this.state.title, this.state.body, this.state.url);
    post.submitOnServer((result) => {
      if (result) {
        this.props.navigation.goBack();
      }
    });
  }
}

export default connect(null, null)(AddNewPost);

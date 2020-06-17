// AddNewPost

import React, {FunctionComponent, useState, useEffect} from 'react';
import ReactNative, {TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon, Text, Label} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import {Post} from '../../../model/entities/post';
import {ImageViewer} from '../../../components/ImageViewer';

const {View} = ReactNative;

const AddNewPost: FunctionComponent = (props) => {
  const navigation: object = props.navigation;

  const title = 'New Post';
  const titleLabelText = 'Title:';
  const bodyLabelText = 'Body:';

  function getPostTemplate(): {} {
    return {title: '', body: '', url: ''};
  }

  const [post, setPost] = useState(getPostTemplate());

  useEffect(() => {
    navigation.setParams({
      title: title,
      right: (
        <Icon
          style={styles.rightBarButton}
          name={'ios-done-all'}
          onPress={() => {
            doneButtonPressed(post);
          }}
        />
      ),
    });
  }, [post]);

  function renderPhoto() {
    if (post.url === '') {
      return null;
    } else {
      return (
        <ImageViewer
          disabled={false}
          source={{uri: post.url}}
          downloadable
          doubleTapEnabled={true}
          imageStyle={styles.image}
        />
      );
    }
  }

  function takePhotoButtonPressed() {
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
        updateField('url', response.uri);
      }
    });
  }

  function doneButtonPressed(_post: {}) {
    const newPost = new Post(_post.title, _post.body, _post.url);
    newPost.submitOnServer((result) => {
      if (result) {
        navigation.goBack();
      }
    });
  }

  function updateField(name: string, value: string) {
    setPost({
      ...post,
      [name]: value,
    });
  }

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
        onChangeText={(text) => {
          updateField('title', text);
        }}
        defaultValue={post.title}
      />
      <Label style={styles.label}>{bodyLabelText}</Label>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        underlineColorAndroid="transparent"
        placeholder="Type body"
        autoFocus={false}
        onChangeText={(text) => {
          updateField('body', text);
        }}
        defaultValue={post.body}
      />
      <Button
        block
        info
        style={styles.button}
        onPress={() => takePhotoButtonPressed()}>
        <Text>Attach a Photo</Text>
      </Button>
      <View style={styles.backgroundImage}>{renderPhoto()}</View>
    </View>
  );
};

export default connect(null, null)(AddNewPost);

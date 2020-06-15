// AddNewPost

import React, {FunctionComponent, useState, useEffect} from 'react';
import ReactNative, {TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Button, Icon, Text, Label} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import {Post} from '../../../model/entities/post';
import ImageViewer from '../../../components/ImageViewer';

const {View} = ReactNative;

const AddNewPost: FunctionComponent = (props) => {
  const navigation: object = props.navigation;

  const title = 'New Post';
  const titleLabelText = 'Title:';
  const bodyLabelText = 'Body:';

  const _post = new Post('', '', '');
  const [post, setPost] = useState<Post>(_post);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    navigation.setParams({
      title: title,
      right: (
        <Icon
          style={styles.rightBarButton}
          name={'ios-done-all'}
          onPress={() => {
            doneButtonPressed();
          }}
        />
      ),
    });
  }, []);

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
        post.url = response.uri;
        setPost(post);
        setUpdate(!update);
      }
    });
  }

  function doneButtonPressed() {
    post.submitOnServer((result) => {
      if (result) {
        navigation.goBack();
      }
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
          post.title = text;
          setPost(post);
          setUpdate(!update);
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
          post.body = text;
          setPost(post);
          setUpdate(!update);
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
      <View style={styles.backgroundPhoto}>{renderPhoto()}</View>
    </View>
  );
};

export default connect(null, null)(AddNewPost);

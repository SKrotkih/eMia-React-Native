// AddNewPost

import React, {FunctionComponent, useState, useEffect} from 'react';
import ReactNative from 'react-native';
import {Button, Icon, Text, Label} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';
import {Post} from '../../../model/entities/post';
import {useTheme} from "react-native-paper";
import {color} from "../../../theme/styles";
import InputData from "./Components/InputPostTextItem";
import Photo from "./Components/PostPhoto";

const {View} = ReactNative;

export const AddNewPost: FunctionComponent = (props) => {
  const {navigation} = props;

  const title = 'New Post';
  const titleLabelText = 'Title:';
  const bodyLabelText = 'Body:';
  const darkTheme = useTheme().dark;

  function getPostTemplate(): {} {
    return {title: '', body: '', url: ''};
  }

  const [post, setPost] = useState(getPostTemplate());

  useEffect(() => {
    navigation.setParams({
      title: title,
    });
    navigation.setOptions({
      headerRight: () => (
        <Icon style={styles.rightBarButton}
          name={'ios-done-all'}
          onPress={() => {
            doneButtonPressed(post);
          }}
        />
      ),
    });
  }, [post]);

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
    if (_post.title === null ||
      _post.title === '' ||
      _post.body === null ||
      _post.body === ''
    ) {
      return;
    }
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

  const AttachedPhoto = (props) => {
    return (
      <View style={styles.backgroundImage}>
        <Photo url={props.url} />
      </View>
    )
  }

  return (
    <View style={[styles.container, {backgroundColor: darkTheme ? color.dark : color.white}]}>
      <InputData
        title={titleLabelText}
        placeholder={'Type title'}
        fieldName={'title'}
        defaultValue={post.title}
        autoFocus={true}
        darkTheme={darkTheme}
        updateField={updateField} />
      <InputData
        title={bodyLabelText}
        placeholder={'Type body'}
        fieldName={'body'}
        defaultValue={post.body}
        autoFocus={false}
        darkTheme={darkTheme}
        updateField={updateField} />
      <Button
        block
        info
        style={styles.button}
        onPress={() => takePhotoButtonPressed()}>
        <Text>Attach a Photo</Text>
      </Button>
      <AttachedPhoto url={post.url} />
    </View>
  );
};

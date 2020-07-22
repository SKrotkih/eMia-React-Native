// AddNewPost

import React, {FunctionComponent, useState, useEffect} from 'react';
import ReactNative, {Alert} from 'react-native';
import {Button, Icon, Text} from 'native-base';
import styles from './styles';
import {Post} from '../../../model/entities/post';
import {useTheme} from "react-native-paper";
import {color} from "../../../theme/styles";
import InputData from "./Components/InputPostTextItem";
import Photo from "./Components/PostPhoto";
import takePhoto from "./Utils/TakePhoto";
import {isEmpty} from "../../../utils/validate";

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
    navigation.setOptions({
      headerRight: () => (
        <RightBarButtonItem />
      ),
      title: title,
    });
  }, [post]);

  // Actions

  function takePhotoButtonPressed() {
    takePhoto()
      .then((url) => {
        updateField('url', url);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function doneButtonPressed(_post: {}) {
    const newPost = new Post(_post.title, _post.body, _post.url);
    newPost.submitOnServer()
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
         if (!isEmpty(error)) {
           Alert.alert(error);
         }
      })
  }

  function updateField(name: string, value: string) {
    setPost({
      ...post,
      [name]: value,
    });
  }

  // Components

  const RightBarButtonItem = () => {
    return (
      <Icon style={styles.rightBarButton}
            name={'ios-done-all'}
            onPress={() => {
              doneButtonPressed(post);
            }}
      />
    );
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

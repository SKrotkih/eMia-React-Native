/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

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
import * as StateStorage from "../../../redux/post/actions";

const {View} = ReactNative;

export const AddNewPost: FunctionComponent = (props) => {
  const {navigation} = props;

  const title = 'New Post';
  const titleLabelText = 'Title:';
  const bodyLabelText = 'Body:';
  const darkTheme = useTheme().dark;

  function getPostTemplate(): {} {
    return {title: '', body: '', imagePickerResponse: null};
  }

  const [post, setPost] = useState(getPostTemplate());

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <RightBarButtonItem />,
      title: title,
    });
  }, [post]);

  // Actions

  function takePhotoButtonPressed() {
    takePhoto()
      .then((response) => {
        updateField('imagePickerResponse', response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function doneButtonPressed(_post: {}) {
    const newPost = new Post(post);
    StateStorage.savePost(newPost)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        if (!isEmpty(error)) {
          Alert.alert('Error', `${error}`);
        }
      });
  }

  function updateField(name: string, value: any) {
    setPost({
      ...post,
      [name]: value,
    });
  }

  // Components

  const RightBarButtonItem = () => {
    return (
      <Icon
        style={styles.rightBarButton}
        name="check"
        type="Foundation"
        onPress={() => {
          doneButtonPressed(post);
        }}
      />
    );
  };

  const AttachedPhoto = (props) => {
    return (
      <View style={styles.backgroundImage}>
        <Photo url={props.url} />
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: darkTheme ? color.dark : color.white}]}>
      <InputData
        title={titleLabelText}
        placeholder={'Type title'}
        fieldName={'title'}
        defaultValue={post.title}
        autoFocus={true}
        darkTheme={darkTheme}
        updateField={updateField}
      />
      <InputData
        title={bodyLabelText}
        placeholder={'Type body'}
        fieldName={'body'}
        defaultValue={post.body}
        autoFocus={false}
        darkTheme={darkTheme}
        updateField={updateField}
      />
      <Button
        block
        info
        style={styles.button}
        onPress={() => takePhotoButtonPressed()}>
        <Text>Attach a Photo</Text>
      </Button>
      {post.imagePickerResponse && (
        <AttachedPhoto url={post.imagePickerResponse.uri} />
      )}
    </View>
  );
};

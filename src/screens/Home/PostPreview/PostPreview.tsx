/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useEffect, useState} from 'react';
import {Container, Content, Icon} from 'native-base';
import ModelView from './modelView';
import {color} from "../../../theme/styles";
import {useTheme} from "react-native-paper";
import AuthorName from "./Components/AuthorName";
import AttachedImage from "./Components/AttachedImage";
import Body from "./Components/Body";
import DatePublished from "./Components/DatePublished";
import {StyleSheet} from "react-native";
import PostsHeader from "./Components/Header";
import {PostItemModel} from "../../../model/network/interfaces";

export const PostPreview: FunctionComponent = ({route, navigation}) => {
  const darkTheme = useTheme().dark;
  const postItem: PostItemModel = route.params;
  const modelView: ModelView = new ModelView(postItem);

  const [ownerAvatarUrl, setOwnerAvatarUrl] = useState<Object>();

  useEffect(() => {
    if (modelView.avatarUrl) {
      setOwnerAvatarUrl(ownerAvatarUrl);
    } else {
      modelView
        .getUserAvatar()
        .then((url) => {
          setOwnerAvatarUrl({uri: url});
        })
        .catch(() => {
          setOwnerAvatarUrl({uri: 'Icon-Profile'});
        });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <RightBarButtonItem />,
      title: modelView.title,
    });
  }, []);

  const RightBarButtonItem = () => {
    return (
      <Icon
        style={styles.rightBarButton}
        name="pencil"
        type="Foundation"
        onPress={() => {
          userDidPressOnEditButton();
        }}
      />
    );
  };

  function userDidPressOnEditButton() {
    navigation.navigate('EditPost', postItem);
  }

  const PostBody = () => {
    const authorName = modelView.userName;
    const textBody = modelView.body;
    const attachedImageUrl = modelView.imageUrl;
    const datePublished = modelView.publishedAt;
    return (
      <Content style={[styles.content, {backgroundColor: darkTheme ? color.dark : color.white}]}>
        <AuthorName authorAvatarUrl={ownerAvatarUrl} authorName={authorName} darkTheme={darkTheme} />
        <Body text={textBody} darkTheme={darkTheme}/>
        <AttachedImage url={attachedImageUrl} darkTheme={darkTheme} />
        <DatePublished date={datePublished} darkTheme={darkTheme} />
      </Content>
    );
  };

  return (
    <Container
      style={[
        styles.container,
        {backgroundColor: darkTheme ? color.dark : color.white},
      ]}>
      <PostsHeader title={modelView.title} darkTheme={darkTheme} />
      {PostBody()}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginBottom: 0,
  },
  content: {
    margin: 15,
    marginBottom: 15,
  },
  rightBarButton: {
    color: color.white,
    marginRight: 8,
  },
});

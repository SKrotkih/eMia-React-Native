/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent} from 'react';
import {Container, Content} from 'native-base';
import ModelView from './modelView';
import {color} from "../../../theme/styles";
import {useTheme} from "react-native-paper";
import AuthorName from "./Components/AuthorName";
import AttachedImage from "./Components/AttachedImage";
import Body from "./Components/Body";
import DatePublished from "./Components/DatePublished";
import {StyleSheet} from "react-native";
import PostsHeader from "./Components/Header";

export const PostPreview: FunctionComponent = ({route, navigation}) => {
  const darkTheme = useTheme().dark;
  const postItem = route.params;
  const modelView = new ModelView(postItem);

  function setTitle() {
    navigation.setOptions({title: modelView.title});
  }

  setTitle();

  const renderContent = () => {
    const authorAvatarUrl = modelView.avatarUrl;
    const authorName = modelView.userName;
    const textBody = modelView.body;
    const attachedImageUrl = modelView.imageUrl;
    const datePublished = modelView.publishedAt;
    return (
      <Content style={[styles.content, {backgroundColor: darkTheme ? color.dark : color.white}]}>
        <AuthorName authorAvatarUrl={authorAvatarUrl} authorName={authorName} darkTheme={darkTheme} />
        <Body text={textBody} darkTheme={darkTheme}/>
        <AttachedImage url={attachedImageUrl} darkTheme={darkTheme}/>
        <DatePublished date={datePublished} darkTheme={darkTheme}/>
      </Content>
    )
  }

  return (
    <Container
      style={[
        styles.container,
        {backgroundColor: darkTheme ? color.dark : color.white},
      ]}>
      <PostsHeader
        title={modelView.title}
        darkTheme={darkTheme}
      />
      {renderContent()}
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
});

import React, {FunctionComponent} from 'react';
import styles from './styles';
import {Container, Header, Content, Text, Thumbnail} from 'native-base';
import ModelView from './modelView';
import {color} from "../../../theme/styles";
import {useTheme} from "react-native-paper";
import AuthorName from "./Components/AuthorName";
import AttachedImage from "./Components/AttachedImage";
import Body from "./Components/Body";
import DatePublished from "./Components/DatePublished";

export const PostPreview: FunctionComponent = ({route, navigation}) => {
  const darkTheme = useTheme().dark;
  const postItem = route.params;
  const modelView = new ModelView(postItem);

  function setTitle() {
    navigation.setOptions({title: modelView.title});
  }

  setTitle();

  const renderContent = (darkTheme) => {
    const authorAvatarUrl = modelView.avatarUrl;
    const authorName = modelView.userName;
    const textBody = modelView.body;
    const attachedImageUrl = modelView.imageUrl;
    const datePublished = modelView.publishedAt;
    return (
      <>
        <AuthorName authorAvatarUrl={authorAvatarUrl} authorName={authorName} darkTheme={darkTheme} />
        <Body text={textBody} darkTheme={darkTheme}/>
        <AttachedImage url={attachedImageUrl} darkTheme={darkTheme}/>
        <DatePublished date={datePublished} darkTheme={darkTheme}/>
      </>
    )
  }

  return (
    <Container
      style={[
        styles.container,
        {backgroundColor: darkTheme ? color.dark : color.white},
      ]}>
      <Header style={[{backgroundColor: darkTheme ? color.dark : color.white}]}>
        <Text
          style={[
            styles.textHeader,
            {color: darkTheme ? color.white : color.black},
          ]}>
          {modelView.title}
        </Text>
      </Header>
      <Content style={[styles.content, {backgroundColor: darkTheme ? color.dark : color.white}]}>
        {renderContent(darkTheme)}
      </Content>
    </Container>
  );
};

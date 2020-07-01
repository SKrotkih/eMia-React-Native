import React, {FunctionComponent} from 'react';
import ReactNative, {Image, ImageURISource} from 'react-native';
import styles from './styles';
import {Time} from '../../../components/Time';
import {connect} from 'react-redux';
import {ImageViewer} from '../../../components/ImageViewer';
import {Container, Header, Content, Text, Thumbnail} from 'native-base';
import {ModelView} from './modelView';
import {color} from "../../../theme/styles";
import {useTheme} from "react-native-paper";

const {View} = ReactNative;

const PostPreview: FunctionComponent = ({route, navigation}) => {
  const darkTheme = useTheme().dark;
  const postItem = route.params;
  const modelView = new ModelView(postItem);
  function setTitle() {
    navigation.setOptions({title: modelView.title});
  }
  setTitle();
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
      <Content style={styles.content}>
        <View style={styles.thumbnail}>
          <Thumbnail circular size={55} source={modelView.avatarUrl} />
          <Text style={[styles.textUserName, {color: darkTheme ? color.white : color.black}]}>{modelView.userName}</Text>
        </View>
        <Text style={[styles.textDescription, {color: darkTheme ? color.white : color.black}]}>{modelView.body}</Text>
        <ImageViewer
          imageStyle={[styles.image, {backgroundColor: darkTheme ? color.dark : color.white}]}
          disabled={false}
          source={modelView.imageUrl}
          downloadable
          doubleTapEnabled={true}
        />
        <Text style={[styles.timeBackground, {color: darkTheme ? color.white : color.black}]}>
          <Time date={modelView.publishedAt} style={[styles.textPublishedAt, {color: darkTheme ? color.white : color.black}]} />
        </Text>
      </Content>
    </Container>
  );
};

export default connect(null, null)(PostPreview);

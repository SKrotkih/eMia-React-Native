import React, {FunctionComponent} from 'react';
import ReactNative from 'react-native';
import styles from './styles';
import {Time} from '../../../components/Time';
import {connect} from 'react-redux';
import {ImageViewer} from '../../../components/ImageViewer';
import {Container, Header, Content, Text, Thumbnail} from 'native-base';
import {ModelView} from './modelView';

const {View} = ReactNative;

const PostPreview: FunctionComponent = ({route, navigation}) => {
  const postItem = route.params;
  const modelView = new ModelView(postItem);

  return (
    <Container style={styles.container}>
      <Header style={styles.headerBackground}>
        <Text style={styles.textHeader}>{modelView.title}</Text>
      </Header>
      <Content style={styles.content}>
        <View style={styles.thumbnail}>
          <Thumbnail circular size={55} source={modelView.avatarUrl} />
          <Text style={styles.textUserName}>{modelView.userName}</Text>
        </View>
        <Text style={styles.textDescription}>{modelView.body}</Text>
        <ImageViewer
          imageStyle={styles.image}
          disabled={false}
          source={modelView.imageUrl}
          downloadable
          doubleTapEnabled={true}
        />
        <Text style={styles.timeBackground}>
          <Time date={modelView.publishedAt} style={styles.textPublishedAt} />
        </Text>
      </Content>
    </Container>
  );
};

export default connect(null, null)(PostPreview);

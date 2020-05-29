import React from 'react';
import ReactNative from 'react-native';
import styles from './styles';
import Time from '@components/Time';
import {connect} from 'react-redux';
import ImageViewer from '@theme/components/ImageViewer';
import {Container, Header, Content, Text, Thumbnail} from 'native-base';

const {View} = ReactNative;
const {Component} = React;

export class PostPreview extends Component {
  constructor(props) {
    super(props);
    const {item} = this.props;
    this.state = this.createState(item);
  }

  createState(item) {
    const state = {
      post: item.post,
      author: item.author,
      avatarUrl: item.avatarUrl,
      imageUrl: item.imageUrl,
    };
    return state;
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({title: titleText});
  }

  componentWillMount() {
    this.setTitle(this.state.post.title);
  }

  render() {
    this.title = this.state.post.title;
    this.body = this.state.post.body;
    const avatarUrl = this.state.avatarUrl;
    if (avatarUrl === null) {
      var avatar = {uri: 'Icon-Profile'};
    } else {
      var avatar = {uri: avatarUrl};
    }
    var imageUrl = this.state.imageUrl;
    if (imageUrl === null) {
      imageUrl = 'Icon-Profile';
    }
    this.publishedAt = new Date(1000 * this.state.post.created);
    this.userName = this.state.author.username == null ? '' : this.state.author.username;

    return (
      <Container style={styles.container}>
        <Header style={styles.headerBackground}>
          <Text style={styles.title}>{this.title}</Text>
        </Header>
        <Content style={styles.content}>
          <View style={styles.thumbnail}>
            <Thumbnail circular size={55} source={avatar} />
            <Text style={styles.userName}>{this.userName}</Text>
          </View>
          <Text style={styles.description}>{this.body}</Text>
          <View style={styles.backgroundPhoto}>
            <ImageViewer
              disabled={false}
              source={{uri: imageUrl}}
              downloadable
              doubleTapEnabled={true}
            />
          </View>
          <Text style={styles.publishedAt}>
            <Time date={this.publishedAt} />
          </Text>
        </Content>
      </Container>
    );
  }
}

export default connect(null, null)(PostPreview);

import React from 'react';
import ReactNative from 'react-native';
import styles from './styles';
import Time from '@components/Time';
import {connect} from 'react-redux';
import ImageViewer from '@theme/components/ImageViewer';
import {Container, Header, Content, Text, Thumbnail} from 'native-base';

const {
  View,
  Dimensions,
  AppRegistry,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} = ReactNative;

const {Component} = React;

export class PostPreview extends Component {
  constructor(props) {
    super(props);
    const {item} = this.props;
    this.state = this.createState(item);

    this.title = item.value.title;
    this.body = item.value.body;
    this.url = item.url;
    this.avatarUrl = item.avatarUrl;
    this.publishedAt = new Date(1000 * item.value.created);
    this.userName = item.author == null ? '' : item.author.username;
  }

  createState(item) {
    const state = {};
    return state;
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({title: titleText});
  }

  componentWillMount() {
    this.setTitle(this.title);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerBackground}>
          <Text style={styles.title}>{this.title}</Text>
        </Header>
        <Content style={styles.content}>
          <View style={styles.thumbnail}>
            <Thumbnail circular size={55} source={{uri: this.avatarUrl}} />
            <Text style={styles.userName}>{this.userName}</Text>
          </View>
          <Text style={styles.description}>{this.body}</Text>
          <View style={styles.backgroundPhoto}>
            <ImageViewer
              disabled={false}
              source={{uri: this.url}}
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

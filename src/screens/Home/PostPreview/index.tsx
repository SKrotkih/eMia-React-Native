import React from 'react';
import ReactNative from 'react-native';
import styles from './styles';
import {Time} from '../../../components/Time';
import {connect} from 'react-redux';
import {ImageViewer} from '../../../components/ImageViewer';
import {Container, Header, Content, Text, Thumbnail} from 'native-base';
import {ModelView} from './modelView';

const {View} = ReactNative;
const {Component} = React;

export class PostPreview extends Component {

  private mv: ModelView;
  private readonly navigation: any;
  private readonly item: any;

  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.navigation = this.props.navigation;
    this.mv = new ModelView(this.item);
  }

  setTitle(titleText) {
    const {setParams} = this.navigation;
    setParams({title: titleText});
  }

  componentWillMount() {
    this.setTitle(this.mv.title);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerBackground}>
          <Text style={styles.textHeader}>{this.mv.title}</Text>
        </Header>
        <Content style={styles.content}>
          <View style={styles.thumbnail}>
            <Thumbnail circular size={55} source={this.mv.avatarUrl}/>
            <Text style={styles.textUserName}>{this.mv.userName}</Text>
          </View>
          <Text style={styles.textDescription}>{this.mv.body}</Text>
          <ImageViewer
            imageStyle={styles.image}
            disabled={false}
            source={this.mv.imageUrl}
            downloadable
            doubleTapEnabled={true}
          />
          <Text style={styles.timeBackground}>
            <Time date={this.mv.publishedAt} style={styles.textPublishedAt}/>
          </Text>
        </Content>
      </Container>
    );
  }
}

export default connect(null, null)(PostPreview);

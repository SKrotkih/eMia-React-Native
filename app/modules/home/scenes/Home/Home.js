// How to add Firebase Auth with react native !!!
// https://github.com/g6ling/React-Native-Tips/tree/master/How_to_add_Firebase_Auth_with_react_native

// A well tested feature rich Firebase implementation for React Native,
// supporting both iOS & Android platforms for 12+ Firebase modules
// (including a feature rich Notifications implementation)
// https://github.com/invertase/react-native-firebase

// react native module for firebase cloud messaging and local notification
// https://github.com/evollu/react-native-fcm

// Camera
// https://github.com/react-native-community/react-native-camera
// https://github.com/wix/react-native-camera-kit
// https://www.npmjs.com/package/react-native-grid-component?activeTab=readme
// npm install react-native-grid-component --save


import React from 'react';
import ReactNative from 'react-native';
import Grid from 'react-native-grid-component';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { YellowBox } from 'react-native';
import _ from 'lodash';

import styles from './styles';
import Loader from '../../../../components/Loader/loader';

import { actions as home } from '../../index';
import { config as global } from '../../index';
import { actions as auth } from '../../../auth/index';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

const {
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator  
} = ReactNative;
const {
  Component
} = React;
const {
  fetchUsers,
  fetchPosts
} = home;
const {
  login
} = auth;
const {
  APP_NAME
} = global;

function setUpIgnoreYellowBox() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };  
}

export class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: null,
      loaded: false,
      data: null
    };
    this.onCompletion = this.onCompletion.bind(this);
    this.onFailed = this.onFailed.bind(this);
  }

  componentWillMount () {
    setUpIgnoreYellowBox();
  }

  componentDidMount () {
    this.fetchData();
  }

  fetchData () {
    this.props.fetchPosts(this.onCompletion, this.onFailed);
  }

  onCompletion (items) {
    this.setState({
      dataSource: items,
      loaded: true
    });
  }

  onFailed (error) {
    if (error != null) {
      Alert.alert('Oops!', error.message);
    }
    this.setState({
      dataSource: [],
      loaded: true
    });
  }

  render () {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <Container>
        <Content
          contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
          padder={false}>
          <Grid
            style={styles.list}
            renderItem={this.renderItem}
            renderSeparator={this.renderSeparator.bind(this)}            
            renderPlaceholder={this.renderPlaceholder}
            data={this.state.dataSource}
            itemsPerRow={2}
            itemHasChanged={(d1, d2) => d1 !== d2}
          // callback on reaching the end of the available data
          // onEndReached={() =>
          //   this.setState({
          //     data: [...this.state.data, ...dataSource],
          //   })
          // }
          />
        </Content>
      </Container>
    )
  }

  renderLoadingView () {
    return (
      <View style={styles.emptyContainer}>
        <Loader loading={true} />
      </View>
    );
  }

  renderPlaceholder (sectionID, rowID) {
    // TODO: create properly key
    var key = ''+sectionID+'-9'
    return (
      <View style={styles.item} key={key}>
        <Text>
        </Text>
      </View>
    )
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    // TODO: The same. Need key
    var key = ''+sectionID+'-'+rowID
    return (
      <View style={styles.separator} key={key} />
    )
  }            

  renderItem (item, sectionID, rowID) {
    var title = item.value.title;
    var body = item.value.body;
    var key = item.key;
    var url = item.url;
    return (
      <View style={styles.item} key={key}>
        <TouchableOpacity key={key} style={{flexDirection:'row'}} activeOpacity={0.5} onPress={() => {
          selectPostItem(item)        
        }}>
        <Body>
          <Thumbnail style={{ backgroundColor: '#eee', alignSelf: 'center' }} square large  source={{ cache:'force-cache', uri: url }} />
          <Text style={styles.postTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.postBody} numberOfLines={3}>
            {body}
          </Text>
        </Body>
        </TouchableOpacity>
      </View>
    ) 
  }
}

function selectPostItem(item) {
  Actions.PostPreview({ item });
}

export default connect(null, { login, fetchPosts })(Home)
